/**
 * Smart Add backend for the to-do list app.
 *
 * Setup:
 * 1) Install dependencies:
 *    npm install
 *
 * 2) Create a .env file in the project root:
 *    OPENAI_API_KEY=your_key_here
 *    OPENAI_MODEL=gpt-4o-mini
 *    PORT=3000
 *
 * 3) Run the server:
 *    node server.js
 */

const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const openaiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
const modelInputPricePer1M = Number(process.env.OPENAI_INPUT_PRICE_PER_1M) || 0.15;
const modelOutputPricePer1M = Number(process.env.OPENAI_OUTPUT_PRICE_PER_1M) || 0.6;
const smartAddBudgetUsd = Number(process.env.SMART_ADD_BUDGET_USD);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const TASK_PARSE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    text: { type: "string" },
    category: { type: "string" },
    priority: { type: "string" },
    dueDate: { type: "string" },
    dueTime: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 }
  },
  required: ["text", "category", "priority", "dueDate", "dueTime", "confidence"]
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/parse-task", async (req, res) => {
  const inputText = typeof req.body?.inputText === "string" ? req.body.inputText.trim() : "";
  const providedCategories = sanitizeProvidedCategories(req.body?.categories);

  if (!inputText) {
    return res.status(400).json({ error: "inputText is required." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY in .env." });
  }

  try {
    const now = new Date();
    const todayInNY = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(now);
    const categoryContext = providedCategories.length
      ? `Existing categories: ${providedCategories.join(", ")}. Prefer these when they match.`
      : "No existing categories were provided.";

    const completion = await openai.chat.completions.create({
      model: openaiModel,
      temperature: 0,
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that extracts task data from natural language. " +
            "Return only valid JSON that matches the provided schema. " +
            "Timezone is America/New_York. " +
            "Use today's date as " +
            `${todayInNY}. ` +
            `${categoryContext} ` +
            'Rules: text must be only the actionable task title, with no date/time/category words and no filler (e.g. "I need to", "remind me to"). ' +
            "Keep text concise (about 2-8 words) while preserving the real task meaning. " +
            'Avoid unnecessary generic leading verbs like "Complete", "Do", or "Handle" unless they are essential to meaning. ' +
            "Normalize capitalization to a clean task title style. " +
            "Infer a category from intent/keywords; choose an existing category when semantically close. " +
            'If unclear, use "General". ' +
            'priority must be exactly "high", "medium", or "low". ' +
            "Use high for urgent/critical/ASAP wording, low for optional/whenever/later wording, otherwise medium. " +
            'dueDate must be YYYY-MM-DD or ""; dueTime must be HH:MM (24-hour) or ""; ' +
            "confidence must be between 0 and 1."
        },
        {
          role: "user",
          content: inputText
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "parsed_task",
          strict: true,
          schema: TASK_PARSE_SCHEMA
        }
      }
    });

    const raw = completion.choices?.[0]?.message?.content;
    if (!raw) {
      return res.status(502).json({ error: "No parse result returned by AI." });
    }

    const parsed = JSON.parse(raw);
    const inputTokens = Number(completion.usage?.prompt_tokens) || 0;
    const outputTokens = Number(completion.usage?.completion_tokens) || 0;
    const totalTokens = Number(completion.usage?.total_tokens) || inputTokens + outputTokens;
    const estimatedCostUsd =
      (inputTokens / 1_000_000) * modelInputPricePer1M +
      (outputTokens / 1_000_000) * modelOutputPricePer1M;
    const cleanedText = cleanTaskText(parsed.text, inputText);
    const inferredCategory = chooseCategory(parsed.category, inputText, providedCategories);
    const inferredPriority = choosePriority(parsed.priority, inputText);
    const normalized = {
      text: cleanedText,
      category: inferredCategory,
      priority: inferredPriority,
      dueDate:
        typeof parsed.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(parsed.dueDate)
          ? parsed.dueDate
          : "",
      dueTime:
        typeof parsed.dueTime === "string" && /^\d{2}:\d{2}$/.test(parsed.dueTime)
          ? parsed.dueTime
          : "",
      confidence:
        typeof parsed.confidence === "number"
          ? Math.max(0, Math.min(1, parsed.confidence))
          : 0,
      usage: {
        inputTokens,
        outputTokens,
        totalTokens,
        estimatedCostUsd
      },
      budgetUsd: Number.isFinite(smartAddBudgetUsd) && smartAddBudgetUsd > 0 ? smartAddBudgetUsd : null
    };

    return res.json(normalized);
  } catch (error) {
    const status =
      error &&
      typeof error === "object" &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : null;
    const code =
      error &&
      typeof error === "object" &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : "";
    const detail =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
        ? error.message
        : "Failed to parse task text.";
    console.error("Smart Add parse error:", detail);

    if (status === 429 || code === "insufficient_quota") {
      return res.status(429).json({
        error:
          "Smart Add is unavailable: OpenAI quota/billing limit reached. Check your OpenAI plan, billing, and usage limits, then try again."
      });
    }

    return res.status(500).json({ error: detail });
  }
});

app.listen(port, () => {
  // Start both the static frontend and API from one server.
  console.log(`Server running at http://localhost:${port}`);
});

function sanitizeProvidedCategories(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set();
  const categories = [];
  for (const item of value) {
    if (typeof item !== "string") {
      continue;
    }
    const normalized = normalizeCategoryLabel(item);
    if (!normalized) {
      continue;
    }
    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    categories.push(normalized);
    if (categories.length >= 25) {
      break;
    }
  }

  return categories;
}

function normalizeCategoryLabel(value) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) {
    return "";
  }

  return trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function cleanTaskText(parsedText, inputText) {
  const source = typeof parsedText === "string" && parsedText.trim() ? parsedText : inputText;
  let text = source.trim();

  text = text.replace(/^["'`]+|["'`]+$/g, "");
  text = text.replace(
    /^(?:please\s+)?(?:remind me to|remember to|i need to|need to|can you|add(?: a)? task to|todo:?|to-do:?|task:)\s+/i,
    ""
  );
  text = text.replace(/\s+(?:due|by)\s+.+$/i, "");
  text = text.replace(/\s+at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?\b.*$/i, "");
  text = text.replace(
    /\s+(?:tomorrow|today|tonight|this\s+(?:morning|afternoon|evening|week|month)|next\s+(?:week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b.*$/i,
    ""
  );
  text = text.replace(/\s+on\s+\d{4}-\d{2}-\d{2}\b.*$/i, "");
  text = text.replace(/^to\s+/i, "");
  text = text.replace(/\s+/g, " ").trim();
  text = text.replace(/[.,;:\-]+$/g, "").trim();
  text = stripLeadingGenericVerb(text);
  text = clampTaskLength(text, 10);
  text = smartCapitalizeTask(text);

  return text || "Untitled Task";
}

function chooseCategory(parsedCategory, inputText, providedCategories) {
  const normalizedParsed = normalizeCategoryLabel(parsedCategory);
  const byExactMatch = findMatchingProvidedCategory(normalizedParsed, providedCategories);
  if (byExactMatch) {
    return byExactMatch;
  }

  const inferred = inferCategoryFromKeywords(inputText);
  const inferredProvided = findMatchingProvidedCategory(inferred, providedCategories);
  if (inferredProvided) {
    return inferredProvided;
  }

  if (normalizedParsed && normalizedParsed.toLowerCase() !== "general") {
    return normalizedParsed;
  }

  return inferred || "General";
}

function choosePriority(parsedPriority, inputText) {
  const normalizedParsed = normalizePriorityValue(parsedPriority);
  if (normalizedParsed) {
    return normalizedParsed;
  }

  const inferred = inferPriorityFromKeywords(inputText);
  if (inferred) {
    return inferred;
  }

  return "medium";
}

function normalizePriorityValue(value) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!normalized) {
    return "";
  }

  if (["high", "urgent", "very urgent", "critical", "asap", "immediately", "immediate"].includes(normalized)) {
    return "high";
  }

  if (["medium", "normal", "standard", "moderate"].includes(normalized)) {
    return "medium";
  }

  if (["low", "later", "optional", "whenever", "not urgent"].includes(normalized)) {
    return "low";
  }

  return "";
}

function findMatchingProvidedCategory(value, providedCategories) {
  const normalized = normalizeCategoryLabel(value);
  if (!normalized || !providedCategories.length) {
    return "";
  }

  const exact = providedCategories.find((category) => category.toLowerCase() === normalized.toLowerCase());
  if (exact) {
    return exact;
  }

  const contains = providedCategories.find((category) => {
    const categoryLower = category.toLowerCase();
    const normalizedLower = normalized.toLowerCase();
    return categoryLower.includes(normalizedLower) || normalizedLower.includes(categoryLower);
  });
  return contains || "";
}

function inferCategoryFromKeywords(inputText) {
  const source = (typeof inputText === "string" ? inputText : "").toLowerCase();
  if (!source) {
    return "";
  }

  if (/\b(pay|invoice|bill|budget|bank|tax|subscription)\b/.test(source)) {
    return "Finance";
  }
  if (/\b(meeting|client|project|report|deploy|code|bug|ticket|email)\b/.test(source)) {
    return "Work";
  }
  if (/\b(doctor|dentist|workout|gym|medicine|medication|health)\b/.test(source)) {
    return "Health";
  }
  if (/\b(grocery|groceries|clean|laundry|cook|kitchen|house|home)\b/.test(source)) {
    return "Home";
  }
  if (/\b(study|homework|class|exam|read chapter|assignment)\b/.test(source)) {
    return "School";
  }
  if (/\b(flight|hotel|trip|travel|passport)\b/.test(source)) {
    return "Travel";
  }
  if (/\b(call|text|birthday|family|friend)\b/.test(source)) {
    return "Personal";
  }

  return "";
}

function inferPriorityFromKeywords(inputText) {
  const source = (typeof inputText === "string" ? inputText : "").toLowerCase();
  if (!source) {
    return "";
  }

  if (
    /\b(very urgent|urgent|asap|immediately|right away|critical|top priority|highest priority|priority 1|p1)\b/.test(
      source
    )
  ) {
    return "high";
  }

  if (/\b(low priority|not urgent|optional|whenever|someday|later|backlog|nice to have)\b/.test(source)) {
    return "low";
  }

  if (/\b(medium priority|normal priority|standard priority|moderate)\b/.test(source)) {
    return "medium";
  }

  return "";
}

function countWords(value) {
  if (typeof value !== "string" || !value.trim()) {
    return 0;
  }
  return value.trim().split(/\s+/).length;
}

function stripLeadingGenericVerb(value) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    return "";
  }

  const stripped = text.replace(/^(?:complete|finish|do|handle|start)\s+/i, "").trim();
  if (stripped && countWords(stripped) >= 2) {
    return stripped;
  }

  return text;
}

function clampTaskLength(value, maxWords) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    return "";
  }

  const words = text.split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }

  return words.slice(0, maxWords).join(" ");
}

function smartCapitalizeTask(value) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    return "";
  }

  const smallWords = new Set(["a", "an", "and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to", "with"]);
  const tokens = text.split(/\s+/);
  return tokens
    .map((token, index) => {
      if (/^[A-Z0-9]{2,}$/.test(token) || /\d/.test(token)) {
        return token;
      }

      const cleaned = token.toLowerCase();
      if (index > 0 && smallWords.has(cleaned)) {
        return cleaned;
      }

      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    })
    .join(" ");
}
