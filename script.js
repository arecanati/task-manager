const taskInput = document.getElementById("task-input");
const appRoot = document.querySelector(".app");
const taskTagsInput = document.getElementById("task-tags");
const taskPriorityInput = document.getElementById("task-priority");
const tagOptions = document.getElementById("tag-options");
const taskDateInput = document.getElementById("task-date");
const taskTimeInput = document.getElementById("task-time");
const taskSubtaskInput = document.getElementById("task-subtask-input");
const addSubtaskBtn = document.getElementById("add-subtask-btn");
const taskSubtasksPreview = document.getElementById("task-subtasks-preview");
const toggleTaskAdvancedBtn = document.getElementById("toggle-task-advanced-btn");
const taskAdvancedPanel = document.getElementById("task-advanced-panel");
const toggleTaskSubtasksBtn = document.getElementById("toggle-task-subtasks-btn");
const taskSubtaskPanel = document.getElementById("task-subtask-panel");
const addTaskBtn = document.getElementById("add-task-btn");
const toggleTaskEntryBtn = document.getElementById("toggle-task-entry-btn");
const taskEntryPanel = document.getElementById("task-entry-panel");
const toggleSmartAddBtn = document.getElementById("toggle-smart-add-btn");
const smartAddPanel = document.getElementById("smart-add-panel");
const smartAddInput = document.getElementById("smart-add-input");
const smartAddBtn = document.getElementById("smart-add-btn");
const smartAddStatus = document.getElementById("smart-add-status");
const taskSearchInput = document.getElementById("task-search-input");
const sortSelect = document.getElementById("sort-select");
const categoryFilter = document.getElementById("category-filter");
const taskList = document.getElementById("task-list");
const completedTaskList = document.getElementById("completed-task-list");
const completedSection = document.getElementById("completed-section");
const showCompletedToggle = document.getElementById("show-completed-toggle");
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const remainingTasksEl = document.getElementById("remaining-tasks");
const completedDetailEl = document.getElementById("completed-detail");
const remainingDetailEl = document.getElementById("remaining-detail");
const completionPercentageEl = document.getElementById("completion-percentage");
const progressTodayBtn = document.getElementById("progress-today-btn");
const progressWeekBtn = document.getElementById("progress-week-btn");
const progressMonthBtn = document.getElementById("progress-month-btn");
const progressTitleEl = document.getElementById("progress-title");
const progressLabelEl = document.getElementById("progress-label");
const progressTrackEl = document.getElementById("progress-track");
const progressFillEl = document.getElementById("progress-fill");
const toggleDashboardBtn = document.getElementById("toggle-dashboard-btn");
const dashboardPanel = document.getElementById("dashboard-panel");
const themeSwitch = document.querySelector(".theme-switch");
const themeLightBtn = document.getElementById("theme-light-btn");
const themeDarkBtn = document.getElementById("theme-dark-btn");
const openCalendarBtn = document.getElementById("open-calendar-btn");
const calendarModalOverlay = document.getElementById("calendar-modal-overlay");
const calendarModal = document.getElementById("calendar-modal");
const closeCalendarBtn = document.getElementById("close-calendar-btn");
const calendarPrevBtn = document.getElementById("calendar-prev-btn");
const calendarTodayBtn = document.getElementById("calendar-today-btn");
const calendarNextBtn = document.getElementById("calendar-next-btn");
const calendarMonthLabel = document.getElementById("calendar-month-label");
const calendarGrid = document.getElementById("calendar-grid");
const calendarDayTitle = document.getElementById("calendar-day-title");
const toggleCalendarAddBtn = document.getElementById("toggle-calendar-add-btn");
const calendarAddPanel = document.getElementById("calendar-add-panel");
const calendarAddForm = document.getElementById("calendar-add-form");
const calendarAddContext = document.getElementById("calendar-add-context");
const calendarTaskInput = document.getElementById("calendar-task-input");
const calendarTaskTimeInput = document.getElementById("calendar-task-time");
const calendarTaskPriorityInput = document.getElementById("calendar-task-priority");
const calendarTaskTagsInput = document.getElementById("calendar-task-tags");
const calendarTaskSubtaskInput = document.getElementById("calendar-task-subtask-input");
const calendarAddSubtaskBtn = document.getElementById("calendar-add-subtask-btn");
const calendarTaskSubtasksPreview = document.getElementById("calendar-task-subtasks-preview");
const toggleCalendarAdvancedBtn = document.getElementById("toggle-calendar-advanced-btn");
const calendarAdvancedPanel = document.getElementById("calendar-advanced-panel");
const toggleCalendarSubtasksBtn = document.getElementById("toggle-calendar-subtasks-btn");
const calendarSubtaskPanel = document.getElementById("calendar-subtask-panel");
const calendarAddBtn = document.getElementById("calendar-add-btn");
const calendarDayTasks = document.getElementById("calendar-day-tasks");
const calendarNoDateTasks = document.getElementById("calendar-no-date-tasks");

const STORAGE_KEY = "todo_tasks";
const SMART_ADD_SPEND_STORAGE_KEY = "todo_smart_add_spend_usd";
const SORT_STORAGE_KEY = "todo_sort_mode";
const CATEGORY_FILTER_STORAGE_KEY = "todo_category_filter";
const SEARCH_QUERY_STORAGE_KEY = "todo_search_query";
const DASHBOARD_OPEN_STORAGE_KEY = "todo_dashboard_open";
const THEME_STORAGE_KEY = "todo_theme_mode";
const SHOW_COMPLETED_STORAGE_KEY = "todo_show_completed";
const COMPLETED_META_STORAGE_KEY = "todo_completed_meta";
const COMPLETED_RETENTION_MS = 24 * 60 * 60 * 1000;
const CATEGORY_PALETTES = [
  {
    light: {
      taskBg: "#f0f9ff",
      taskBorder: "#bae6fd",
      badgeBg: "#e0f2fe",
      badgeBorder: "#7dd3fc",
      badgeText: "#075985"
    },
    dark: {
      taskBg: "#2d2d30",
      taskBorder: "#4b4b4b",
      badgeBg: "#3a3a3a",
      badgeBorder: "#5a5a5a",
      badgeText: "#d4d4d4"
    }
  },
  {
    light: {
      taskBg: "#f0fdf4",
      taskBorder: "#bbf7d0",
      badgeBg: "#dcfce7",
      badgeBorder: "#86efac",
      badgeText: "#166534"
    },
    dark: {
      taskBg: "#253127",
      taskBorder: "#3f5c43",
      badgeBg: "#14532d",
      badgeBorder: "#4ade80",
      badgeText: "#dcfce7"
    }
  },
  {
    light: {
      taskBg: "#fff7ed",
      taskBorder: "#fed7aa",
      badgeBg: "#ffedd5",
      badgeBorder: "#fdba74",
      badgeText: "#9a3412"
    },
    dark: {
      taskBg: "#33261f",
      taskBorder: "#5d4332",
      badgeBg: "#7c2d12",
      badgeBorder: "#fb923c",
      badgeText: "#ffedd5"
    }
  },
  {
    light: {
      taskBg: "#fefce8",
      taskBorder: "#fde68a",
      badgeBg: "#fef9c3",
      badgeBorder: "#fcd34d",
      badgeText: "#854d0e"
    },
    dark: {
      taskBg: "#343121",
      taskBorder: "#5f5534",
      badgeBg: "#713f12",
      badgeBorder: "#facc15",
      badgeText: "#fef9c3"
    }
  },
  {
    light: {
      taskBg: "#fdf4ff",
      taskBorder: "#f5d0fe",
      badgeBg: "#fae8ff",
      badgeBorder: "#f0abfc",
      badgeText: "#86198f"
    },
    dark: {
      taskBg: "#342938",
      taskBorder: "#5f4963",
      badgeBg: "#5b2a66",
      badgeBorder: "#c084fc",
      badgeText: "#f3e8ff"
    }
  },
  {
    light: {
      taskBg: "#f5f3ff",
      taskBorder: "#ddd6fe",
      badgeBg: "#ede9fe",
      badgeBorder: "#c4b5fd",
      badgeText: "#5b21b6"
    },
    dark: {
      taskBg: "#352b2b",
      taskBorder: "#5f4848",
      badgeBg: "#6e3b3b",
      badgeBorder: "#fca5a5",
      badgeText: "#fee2e2"
    }
  }
];
let tasks = loadTasks();
let sortMode = loadSortMode();
let activeCategoryFilter = loadCategoryFilter();
let searchQuery = loadSearchQuery();
let isDashboardOpen = loadDashboardOpen();
let themeMode = loadThemeMode();
let editingTaskId = null;
let dragState = null;
let isTaskEntryOpen = false;
let isSmartAddOpen = false;
let smartAddSpendUsd = loadSmartAddSpendUsd();
let showCompleted = loadShowCompleted();
let completedMeta = loadCompletedMeta();
let progressRange = "today";
let isCalendarOpen = false;
let isCalendarAddOpen = false;
let isTaskAdvancedOpen = false;
let isCalendarAdvancedOpen = false;
let isTaskSubtasksOpen = false;
let isCalendarSubtasksOpen = false;
let calendarMonth = 0;
let calendarYear = 0;
let selectedCalendarDate = "";
let taskDraftSubtasks = [];
let calendarDraftSubtasks = [];

sortSelect.value = sortMode;
categoryFilter.value = activeCategoryFilter;
taskSearchInput.value = searchQuery;
showCompletedToggle.checked = showCompleted;
setDashboardOpen(isDashboardOpen);
setTaskEntryOpen(isTaskEntryOpen);
setSmartAddOpen(isSmartAddOpen);
setTaskAdvancedOpen(false);
setCalendarAdvancedOpen(false);
setTaskSubtasksOpen(false);
setCalendarSubtasksOpen(false);
applyTheme(themeMode);
syncCompletedMeta();
purgeExpiredCompletedTasks();
initializeCalendarState();
renderDraftSubtasks("task");
renderDraftSubtasks("calendar");
renderTasks();

addTaskBtn.addEventListener("click", addTaskFromInput);
toggleTaskEntryBtn.addEventListener("click", () => {
  setTaskEntryOpen(!isTaskEntryOpen);
});
toggleSmartAddBtn.addEventListener("click", () => {
  setSmartAddOpen(!isSmartAddOpen);
});
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTaskFromInput();
  }
});
addSubtaskBtn.addEventListener("click", () => {
  addDraftSubtask("task");
});
toggleTaskAdvancedBtn.addEventListener("click", () => {
  setTaskAdvancedOpen(!isTaskAdvancedOpen);
});
toggleTaskSubtasksBtn.addEventListener("click", () => {
  setTaskSubtasksOpen(!isTaskSubtasksOpen);
});
taskSubtaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addDraftSubtask("task");
  }
});
smartAddBtn.addEventListener("click", smartAddTask);
smartAddInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    smartAddTask();
  }
});
sortSelect.addEventListener("change", () => {
  sortMode = sortSelect.value;
  saveSortMode();
  renderTasks();
});
categoryFilter.addEventListener("change", () => {
  activeCategoryFilter = categoryFilter.value;
  saveCategoryFilter();
  renderTasks();
});
taskSearchInput.addEventListener("input", () => {
  searchQuery = taskSearchInput.value;
  saveSearchQuery();
  renderTasks();
});
showCompletedToggle.addEventListener("change", () => {
  showCompleted = showCompletedToggle.checked;
  saveShowCompleted();
  renderTasks();
});
toggleDashboardBtn.addEventListener("click", () => {
  setDashboardOpen(!isDashboardOpen);
  saveDashboardOpen();
});
themeSwitch?.addEventListener("click", toggleThemeMode);
progressTodayBtn.addEventListener("click", () => setProgressRange("today"));
progressWeekBtn.addEventListener("click", () => setProgressRange("week"));
progressMonthBtn.addEventListener("click", () => setProgressRange("month"));
openCalendarBtn.addEventListener("click", openCalendarModal);
closeCalendarBtn.addEventListener("click", closeCalendarModal);
calendarModalOverlay.addEventListener("click", (event) => {
  if (event.target === calendarModalOverlay) {
    closeCalendarModal();
  }
});
calendarModal.addEventListener("click", (event) => {
  event.stopPropagation();
});
calendarPrevBtn.addEventListener("click", () => {
  moveCalendarMonth(-1);
});
calendarTodayBtn.addEventListener("click", goToTodayInCalendar);
calendarNextBtn.addEventListener("click", () => {
  moveCalendarMonth(1);
});
toggleCalendarAddBtn.addEventListener("click", () => {
  setCalendarAddOpen(!isCalendarAddOpen);
});
calendarAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTaskFromCalendarPanel();
});
calendarAddSubtaskBtn.addEventListener("click", () => {
  addDraftSubtask("calendar");
});
toggleCalendarAdvancedBtn.addEventListener("click", () => {
  if (toggleCalendarAdvancedBtn.disabled) {
    return;
  }
  setCalendarAdvancedOpen(!isCalendarAdvancedOpen);
});
toggleCalendarSubtasksBtn.addEventListener("click", () => {
  if (toggleCalendarSubtasksBtn.disabled) {
    return;
  }
  setCalendarSubtasksOpen(!isCalendarSubtasksOpen);
});
calendarTaskSubtaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addDraftSubtask("calendar");
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isCalendarOpen) {
    closeCalendarModal();
  }
});

function addTaskFromInput() {
  const text = taskInput.value.trim();

  if (!text) {
    return;
  }

  addTask({
    text,
    tags: taskTagsInput.value,
    priority: taskPriorityInput.value,
    dueDate: taskDateInput.value,
    dueTime: taskTimeInput.value,
    subtasks: taskDraftSubtasks
  });

  taskInput.value = "";
  taskTagsInput.value = "";
  taskPriorityInput.value = "";
  taskDateInput.value = "";
  taskTimeInput.value = "";
  taskSubtaskInput.value = "";
  taskDraftSubtasks = [];
  renderDraftSubtasks("task");
  setTaskAdvancedOpen(false);
  setTaskSubtasksOpen(false);
  taskInput.focus();
}

function addTaskFromCalendarPanel() {
  if (!selectedCalendarDate) {
    return;
  }

  const text = calendarTaskInput.value.trim();
  if (!text) {
    calendarTaskInput.focus();
    return;
  }

  const wasAdded = addTask({
    text,
    tags: calendarTaskTagsInput.value,
    priority: calendarTaskPriorityInput.value,
    dueDate: selectedCalendarDate,
    dueTime: calendarTaskTimeInput.value,
    subtasks: calendarDraftSubtasks
  });

  if (!wasAdded) {
    return;
  }

  calendarTaskInput.value = "";
  calendarTaskTimeInput.value = "";
  calendarTaskPriorityInput.value = "";
  calendarTaskTagsInput.value = "";
  calendarTaskSubtaskInput.value = "";
  calendarDraftSubtasks = [];
  renderDraftSubtasks("calendar");
  setCalendarAdvancedOpen(false);
  setCalendarSubtasksOpen(false);
  calendarTaskInput.focus();
}

function addDraftSubtask(mode) {
  const isCalendar = mode === "calendar";
  const input = isCalendar ? calendarTaskSubtaskInput : taskSubtaskInput;
  const text = normalizeDraftSubtaskText(input.value);
  if (!text) {
    return;
  }

  if (isCalendar) {
    calendarDraftSubtasks.push({ text, completed: false });
  } else {
    taskDraftSubtasks.push({ text, completed: false });
  }

  input.value = "";
  renderDraftSubtasks(mode);
  input.focus();
}

function removeDraftSubtask(mode, index) {
  if (mode === "calendar") {
    calendarDraftSubtasks = calendarDraftSubtasks.filter((_, currentIndex) => currentIndex !== index);
  } else {
    taskDraftSubtasks = taskDraftSubtasks.filter((_, currentIndex) => currentIndex !== index);
  }

  renderDraftSubtasks(mode);
}

function renderDraftSubtasks(mode) {
  const isCalendar = mode === "calendar";
  const list = isCalendar ? calendarDraftSubtasks : taskDraftSubtasks;
  const container = isCalendar ? calendarTaskSubtasksPreview : taskSubtasksPreview;
  container.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("li");
    empty.className = "subtask-draft-empty";
    empty.textContent = "No subtasks added yet.";
    container.appendChild(empty);
    return;
  }

  list.forEach((subtask, index) => {
    const item = document.createElement("li");
    item.className = "subtask-draft-item";

    const text = document.createElement("span");
    text.className = "subtask-draft-text";
    text.textContent = subtask.text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "subtask-draft-remove";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeDraftSubtask(mode, index));

    item.append(text, removeBtn);
    container.appendChild(item);
  });
}

function normalizeDraftSubtaskText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ");
}

function setTaskAdvancedOpen(value) {
  isTaskAdvancedOpen = Boolean(value);
  taskAdvancedPanel.hidden = !isTaskAdvancedOpen;
  taskAdvancedPanel.classList.toggle("is-collapsed", !isTaskAdvancedOpen);
  toggleTaskAdvancedBtn.textContent = isTaskAdvancedOpen
    ? "Hide Advanced"
    : "Advanced";
  toggleTaskAdvancedBtn.setAttribute("aria-expanded", String(isTaskAdvancedOpen));

  if (!isTaskAdvancedOpen) {
    setTaskSubtasksOpen(false);
  }
}

function setCalendarAdvancedOpen(value) {
  isCalendarAdvancedOpen = Boolean(value);
  calendarAdvancedPanel.hidden = !isCalendarAdvancedOpen;
  calendarAdvancedPanel.classList.toggle("is-collapsed", !isCalendarAdvancedOpen);
  toggleCalendarAdvancedBtn.textContent = isCalendarAdvancedOpen
    ? "Hide Advanced"
    : "Advanced";
  toggleCalendarAdvancedBtn.setAttribute("aria-expanded", String(isCalendarAdvancedOpen));

  if (!isCalendarAdvancedOpen) {
    setCalendarSubtasksOpen(false);
  }
}

function setTaskSubtasksOpen(value) {
  isTaskSubtasksOpen = Boolean(value);
  taskSubtaskPanel.hidden = !isTaskSubtasksOpen;
  taskSubtaskPanel.classList.toggle("is-collapsed", !isTaskSubtasksOpen);
  toggleTaskSubtasksBtn.textContent = isTaskSubtasksOpen
    ? "Hide Subtasks"
    : "Subtasks";
  toggleTaskSubtasksBtn.setAttribute("aria-expanded", String(isTaskSubtasksOpen));

  if (isTaskSubtasksOpen) {
    taskSubtaskInput.focus();
  }
}

function setCalendarSubtasksOpen(value) {
  isCalendarSubtasksOpen = Boolean(value);
  calendarSubtaskPanel.hidden = !isCalendarSubtasksOpen;
  calendarSubtaskPanel.classList.toggle("is-collapsed", !isCalendarSubtasksOpen);
  toggleCalendarSubtasksBtn.textContent = isCalendarSubtasksOpen
    ? "Hide Subtasks"
    : "Subtasks";
  toggleCalendarSubtasksBtn.setAttribute("aria-expanded", String(isCalendarSubtasksOpen));

  if (isCalendarSubtasksOpen && !calendarTaskSubtaskInput.disabled) {
    calendarTaskSubtaskInput.focus();
  }
}

function setCalendarAddOpen(value) {
  isCalendarAddOpen = Boolean(value);
  calendarAddPanel.hidden = !isCalendarAddOpen;
  calendarAddPanel.classList.toggle("is-collapsed", !isCalendarAddOpen);
  toggleCalendarAddBtn.textContent = isCalendarAddOpen
    ? "Hide Add Task for Date"
    : "Open Add Task for Date";
  toggleCalendarAddBtn.setAttribute("aria-expanded", String(isCalendarAddOpen));

  if (isCalendarAddOpen && selectedCalendarDate) {
    calendarTaskInput.focus();
  }
}

function addTask(values) {
  const text = values.text.trim();
  if (!text) {
    return false;
  }

  // Every task has a stable id so toggle/delete operations can target it safely.
  const task = {
    id: Date.now(),
    text,
    tags: sanitizeTags(values.tags, values.category || ""),
    category: "",
    priority: sanitizePriority(values.priority || ""),
    dueDate: sanitizeDueDate(values.dueDate || ""),
    dueTime: sanitizeDueTime(values.dueTime || ""),
    subtasks: sanitizeSubtasks(values.subtasks),
    order: getNextTaskOrder(),
    completed: false
  };
  task.category = getPrimaryCategory(task.tags, values.category || "");

  tasks.push(task);
  saveTasks();
  renderTasks();
  return true;
}

async function smartAddTask() {
  const inputText = smartAddInput.value.trim();
  if (!inputText || smartAddBtn.disabled) {
    return;
  }

  const knownCategories = [...new Set(tasks.map((task) => task.category))].filter(Boolean);

  smartAddBtn.disabled = true;
  smartAddStatus.textContent = "Parsing...";

  try {
    const response = await fetch("/api/parse-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputText,
        categories: knownCategories
      })
    });

    if (!response.ok) {
      let errorMessage = "Could not parse task. Please try again.";
      try {
        const errorPayload = await response.json();
        if (typeof errorPayload.error === "string" && errorPayload.error.trim()) {
          errorMessage = errorPayload.error;
        }
      } catch (error) {
        // Ignore JSON parse errors and keep the default message.
      }
      throw new Error(errorMessage);
    }

    const parsed = await response.json();
    const wasAdded = addTask({
      text: typeof parsed.text === "string" ? parsed.text : "",
      tags:
        Array.isArray(parsed.tags) && parsed.tags.length
          ? parsed.tags
          : typeof parsed.category === "string"
            ? parsed.category
            : "General",
      priority: typeof parsed.priority === "string" ? parsed.priority : "medium",
      dueDate: typeof parsed.dueDate === "string" ? parsed.dueDate : "",
      dueTime: typeof parsed.dueTime === "string" ? parsed.dueTime : ""
    });

    if (!wasAdded) {
      throw new Error("No task text detected. Try rephrasing.");
    }

    const confidence = Number(parsed.confidence);
    const usage = parsed && typeof parsed === "object" ? parsed.usage : null;
    const estimatedCostUsd =
      usage && typeof usage.estimatedCostUsd === "number" && usage.estimatedCostUsd >= 0
        ? usage.estimatedCostUsd
        : null;
    if (estimatedCostUsd !== null) {
      smartAddSpendUsd += estimatedCostUsd;
      saveSmartAddSpendUsd();
    }

    const budgetUsd =
      parsed && typeof parsed.budgetUsd === "number" && parsed.budgetUsd > 0
        ? parsed.budgetUsd
        : null;
    const remainingUsd =
      budgetUsd === null ? null : Math.max(0, budgetUsd - smartAddSpendUsd);

    const baseMessage = Number.isFinite(confidence)
      ? `Task added (confidence ${confidence.toFixed(2)}).`
      : "Task added.";
    const costMessage =
      estimatedCostUsd === null
        ? ""
        : ` Est. cost ${formatUsd(estimatedCostUsd)}. Total ${formatUsd(smartAddSpendUsd)}.`;
    const balanceMessage =
      remainingUsd === null ? "" : ` Remaining budget ${formatUsd(remainingUsd)}.`;
    smartAddStatus.textContent = `${baseMessage}${costMessage}${balanceMessage}`;
    smartAddInput.value = "";
  } catch (error) {
    const isNetworkError =
      error instanceof TypeError &&
      /fetch|network|load failed/i.test(error.message || "");
    if (isNetworkError) {
      smartAddStatus.textContent =
        "Smart Add API is unreachable. Run `npm start` and open http://localhost:3000.";
    } else {
      smartAddStatus.textContent =
        error instanceof Error ? error.message : "Could not parse task. Please try again.";
    }
  } finally {
    smartAddBtn.disabled = false;
    if (isSmartAddOpen) {
      smartAddInput.focus();
    }
  }
}

function renderTasks() {
  purgeExpiredCompletedTasks();

  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  refreshCategoryFilterOptions();
  refreshCategorySuggestions();
  updateDashboard(tasks);
  const categoryColorMap = buildCategoryColorMap(tasks);

  const categoryFiltered = getFilteredTasks(tasks, activeCategoryFilter);
  const filtered = getSearchFilteredTasks(categoryFiltered, searchQuery);
  const activeTasks = filtered.filter((task) => !task.completed);
  const completedTasks = filtered.filter((task) => task.completed);
  const visibleActiveTasks = getSortedTasks(activeTasks, sortMode);
  const visibleCompletedTasks = getSortedTasks(completedTasks, sortMode);

  if (!visibleActiveTasks.length) {
    const empty = document.createElement("li");
    empty.className = "task-item task-item-empty";
    empty.textContent = "No tasks in this list yet.";
    taskList.appendChild(empty);
  } else {
    renderTaskCollection(visibleActiveTasks, taskList, categoryColorMap, true);
  }

  const shouldShowCompletedSection = showCompleted;
  completedSection.hidden = !shouldShowCompletedSection;
  if (shouldShowCompletedSection) {
    if (visibleCompletedTasks.length) {
      renderTaskCollection(visibleCompletedTasks, completedTaskList, categoryColorMap, false);
    } else {
      const emptyCompleted = document.createElement("li");
      emptyCompleted.className = "task-item task-item-empty";
      emptyCompleted.textContent = "No completed tasks yet.";
      completedTaskList.appendChild(emptyCompleted);
    }
  }

  refreshCalendarView();
}

function renderTaskCollection(taskItems, container, categoryColorMap, allowDrag) {
  taskItems.forEach((task) => {
    const listItem = createTaskListItem(task, categoryColorMap, allowDrag);
    container.appendChild(listItem);
  });
}

function createTaskListItem(task, categoryColorMap, allowDrag) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  listItem.dataset.id = String(task.id);
  applyCategoryColors(listItem, categoryColorMap[task.category]);

  const canDrag = allowDrag && sortMode === "manual" && editingTaskId === null;
  if (canDrag) {
    listItem.classList.add("draggable");
    listItem.addEventListener("pointerdown", (event) =>
      handlePointerDragStart(event, listItem, task.id)
    );
  }

  if (task.completed) {
    listItem.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark "${task.text}" as completed`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const taskMain = document.createElement("div");
  taskMain.className = "task-main";

  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = task.text;

  const metaSpan = document.createElement("span");
  metaSpan.className = "task-meta";

  const tagBadgesWrap = document.createElement("span");
  tagBadgesWrap.className = "task-tags-wrap";
  getTaskTags(task).forEach((tag) => {
    const tagBadge = document.createElement("span");
    tagBadge.className = "task-category-badge";
    tagBadge.textContent = tag;
    tagBadgesWrap.appendChild(tagBadge);
  });

  const priorityBadge = document.createElement("span");
  priorityBadge.className = `task-priority-badge priority-${task.priority}`;
  priorityBadge.textContent = `${formatPriorityLabel(task.priority)} Priority`;

  const subtaskProgress = document.createElement("span");
  subtaskProgress.className = "task-subtask-progress";
  subtaskProgress.textContent = formatSubtaskProgress(task.subtasks);

  const dueText = document.createElement("span");
  dueText.textContent = formatDueLabel(task.dueDate, task.dueTime);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "edit-btn";
  editButton.textContent = "Edit";
  editButton.setAttribute("aria-label", `Edit "${task.text}"`);
  editButton.addEventListener("click", () => startEditingTask(task.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  actions.append(editButton, deleteButton);

  if (editingTaskId === task.id) {
    const editForm = createTaskEditForm(task);
    taskMain.replaceChildren(editForm);
    checkbox.disabled = true;
    actions.replaceChildren();
  } else {
    metaSpan.append(tagBadgesWrap, priorityBadge, subtaskProgress, dueText);
    taskMain.append(textSpan, metaSpan, createSubtasksList(task));
  }

  listItem.append(checkbox, taskMain, actions);
  return listItem;
}

function createSubtasksList(task) {
  const subtasks = sanitizeSubtasks(task.subtasks);
  if (!subtasks.length) {
    return document.createDocumentFragment();
  }

  const list = document.createElement("ul");
  list.className = "subtask-list";

  subtasks.forEach((subtask, index) => {
    const item = document.createElement("li");
    item.className = "subtask-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(subtask.completed);
    checkbox.setAttribute("aria-label", `Mark subtask "${subtask.text}" as completed`);
    checkbox.addEventListener("change", () => toggleSubtask(task.id, index));

    const text = document.createElement("span");
    text.className = "subtask-text";
    text.textContent = subtask.text;
    if (subtask.completed) {
      text.classList.add("is-completed");
    }

    item.append(checkbox, text);
    list.appendChild(item);
  });

  return list;
}

function formatSubtaskProgress(subtasksValue) {
  const subtasks = sanitizeSubtasks(subtasksValue);
  if (!subtasks.length) {
    return "No subtasks";
  }

  const completedCount = subtasks.filter((subtask) => subtask.completed).length;
  return `${completedCount}/${subtasks.length} subtasks`;
}

function initializeCalendarState() {
  const now = new Date();
  calendarMonth = now.getMonth();
  calendarYear = now.getFullYear();
  selectedCalendarDate = formatDateParts(calendarYear, calendarMonth + 1, now.getDate());
}

function openCalendarModal() {
  isCalendarOpen = true;
  setCalendarAddOpen(false);
  setCalendarAdvancedOpen(false);
  setCalendarSubtasksOpen(false);
  calendarDraftSubtasks = [];
  calendarTaskSubtaskInput.value = "";
  renderDraftSubtasks("calendar");
  calendarModalOverlay.hidden = false;
  renderCalendar(calendarMonth, calendarYear);
  closeCalendarBtn.focus();
}

function closeCalendarModal() {
  isCalendarOpen = false;
  calendarModalOverlay.hidden = true;
  openCalendarBtn.focus();
}

function moveCalendarMonth(step) {
  const next = new Date(calendarYear, calendarMonth + step, 1);
  calendarYear = next.getFullYear();
  calendarMonth = next.getMonth();
  renderCalendar(calendarMonth, calendarYear);
}

function goToTodayInCalendar() {
  const now = new Date();
  calendarYear = now.getFullYear();
  calendarMonth = now.getMonth();
  selectedCalendarDate = formatDateParts(calendarYear, calendarMonth + 1, now.getDate());
  renderCalendar(calendarMonth, calendarYear);
}

function refreshCalendarView() {
  if (!isCalendarOpen) {
    return;
  }

  renderCalendar(calendarMonth, calendarYear);
}

function groupTasksByDate(taskItems) {
  return taskItems.reduce((acc, task) => {
    if (!task.dueDate) {
      return acc;
    }

    if (!acc[task.dueDate]) {
      acc[task.dueDate] = [];
    }
    acc[task.dueDate].push(task);
    return acc;
  }, {});
}

function getTasksForDate(dateString) {
  if (!dateString) {
    return [];
  }

  return getCalendarVisibleTasks()
    .filter((task) => task.dueDate === dateString)
    .sort((a, b) => {
      const aTime = a.dueTime || "99:99";
      const bTime = b.dueTime || "99:99";
      if (aTime === bTime) {
        return b.id - a.id;
      }
      return aTime.localeCompare(bTime);
    });
}

function renderCalendar(month, year) {
  calendarMonth = month;
  calendarYear = year;
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();
  const taskGroups = groupTasksByDate(getCalendarVisibleTasks());
  const todayKey = formatDateParts(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );

  calendarMonthLabel.textContent = firstDay.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric"
  });
  calendarGrid.innerHTML = "";

  for (let cellIndex = 0; cellIndex < 42; cellIndex += 1) {
    const dayNumber = cellIndex - startWeekday + 1;
    const inCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    const dayDate = inCurrentMonth
      ? formatDateParts(year, month + 1, dayNumber)
      : "";

    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-day-cell";
    if (!inCurrentMonth) {
      cell.classList.add("is-outside");
      cell.disabled = true;
    }

    if (dayDate && dayDate === todayKey) {
      cell.classList.add("is-today");
    }

    if (dayDate && dayDate === selectedCalendarDate) {
      cell.classList.add("is-selected");
    }

    const dayLabel = document.createElement("span");
    dayLabel.className = "calendar-day-number";
    dayLabel.textContent = inCurrentMonth ? String(dayNumber) : "";
    cell.appendChild(dayLabel);

    if (dayDate) {
      const dayTasks = (taskGroups[dayDate] || []).sort((a, b) => {
        const aTime = a.dueTime || "99:99";
        const bTime = b.dueTime || "99:99";
        return aTime.localeCompare(bTime);
      });

      const eventsWrap = document.createElement("div");
      eventsWrap.className = "calendar-day-events";

      dayTasks.slice(0, 3).forEach((task) => {
        const taskChip = document.createElement("span");
        taskChip.className = "calendar-day-task";
        taskChip.textContent = task.dueTime
          ? `${task.dueTime} ${task.text}`
          : task.text;
        taskChip.title = taskChip.textContent;
        if (task.completed) {
          taskChip.classList.add("is-completed");
        }
        if (isTaskOverdue(task)) {
          taskChip.classList.add("is-overdue");
        }
        eventsWrap.appendChild(taskChip);
      });

      const hiddenCount = dayTasks.length - 3;
      if (hiddenCount > 0) {
        const more = document.createElement("span");
        more.className = "calendar-day-task is-more";
        more.textContent = `+${hiddenCount} more`;
        eventsWrap.appendChild(more);
      }

      cell.appendChild(eventsWrap);

      cell.addEventListener("click", () => {
        selectedCalendarDate = dayDate;
        renderCalendar(calendarMonth, calendarYear);
      });
    }

    calendarGrid.appendChild(cell);
  }

  renderSelectedCalendarDateDetails();
  renderNoDueDateTasks();
}

function renderSelectedCalendarDateDetails() {
  updateCalendarAddFormState();

  if (!selectedCalendarDate) {
    calendarDayTitle.textContent = "Select a date";
    calendarDayTasks.innerHTML = "";
    return;
  }

  const selectedDate = new Date(`${selectedCalendarDate}T00:00`);
  calendarDayTitle.textContent = Number.isNaN(selectedDate.getTime())
    ? selectedCalendarDate
    : selectedDate.toLocaleDateString(undefined, { dateStyle: "full" });

  const dayItems = getTasksForDate(selectedCalendarDate);
  calendarDayTasks.innerHTML = "";

  if (!dayItems.length) {
    const empty = document.createElement("li");
    empty.className = "calendar-day-item";
    empty.textContent = "No tasks due on this day.";
    calendarDayTasks.appendChild(empty);
    return;
  }

  dayItems.forEach((task) => {
    const item = createCalendarTaskItem(task);
    calendarDayTasks.appendChild(item);
  });
}

function updateCalendarAddFormState() {
  const hasSelectedDate = Boolean(selectedCalendarDate);
  calendarTaskInput.disabled = !hasSelectedDate;
  calendarTaskTimeInput.disabled = !hasSelectedDate;
  calendarTaskPriorityInput.disabled = !hasSelectedDate;
  calendarTaskTagsInput.disabled = !hasSelectedDate;
  calendarTaskSubtaskInput.disabled = !hasSelectedDate;
  calendarAddSubtaskBtn.disabled = !hasSelectedDate;
  toggleCalendarAdvancedBtn.disabled = !hasSelectedDate;
  toggleCalendarSubtasksBtn.disabled = !hasSelectedDate;
  calendarAddBtn.disabled = !hasSelectedDate;

  if (!hasSelectedDate) {
    if (isCalendarAdvancedOpen) {
      setCalendarAdvancedOpen(false);
    } else if (isCalendarSubtasksOpen) {
      setCalendarSubtasksOpen(false);
    }
  }

  if (!hasSelectedDate) {
    calendarAddContext.textContent = "Pick a date to add tasks.";
    return;
  }

  const selectedDate = new Date(`${selectedCalendarDate}T00:00`);
  const dateLabel = Number.isNaN(selectedDate.getTime())
    ? selectedCalendarDate
    : selectedDate.toLocaleDateString(undefined, { dateStyle: "full" });
  calendarAddContext.textContent = `Add a task for ${dateLabel}.`;
}

function renderNoDueDateTasks() {
  const noDateItems = getCalendarVisibleTasks()
    .filter((task) => !task.dueDate)
    .sort((a, b) => b.id - a.id);
  calendarNoDateTasks.innerHTML = "";

  if (!noDateItems.length) {
    const empty = document.createElement("li");
    empty.className = "calendar-day-item";
    empty.textContent = "No tasks without due dates.";
    calendarNoDateTasks.appendChild(empty);
    return;
  }

  noDateItems.forEach((task) => {
    const item = createCalendarTaskItem(task);
    calendarNoDateTasks.appendChild(item);
  });
}

function getCalendarVisibleTasks() {
  return showCompleted ? tasks : tasks.filter((task) => !task.completed);
}

function createCalendarTaskItem(task) {
  const item = document.createElement("li");
  item.className = "calendar-day-item";
  if (task.completed) {
    item.classList.add("is-completed");
  }
  if (isTaskOverdue(task)) {
    item.classList.add("is-overdue");
  }

  const row = document.createElement("div");
  row.className = "calendar-day-row";

  const text = document.createElement("strong");
  text.textContent = task.text;

  const priority = document.createElement("span");
  priority.className = `task-priority-badge priority-${task.priority}`;
  priority.textContent = formatPriorityLabel(task.priority);

  const time = document.createElement("span");
  time.className = "calendar-day-time";
  time.textContent = task.dueTime ? task.dueTime : "";

  row.append(text, priority, time);

  const actions = document.createElement("div");
  actions.className = "calendar-day-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "calendar-mini-btn edit";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    startEditingTask(task.id);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "calendar-mini-btn delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });

  actions.append(editBtn, deleteBtn);
  item.append(row, actions);
  return item;
}

function formatDateParts(year, month, day) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isTaskOverdue(task) {
  if (!task.dueDate || task.completed) {
    return false;
  }

  const dueTimestamp = getDueTimestamp(task);
  if (dueTimestamp === null) {
    return false;
  }

  return dueTimestamp < Date.now();
}

function updateDashboard(taskItems) {
  const scopedTasks = getTasksForProgressRange(taskItems, progressRange);
  const total = scopedTasks.length;
  const completed = scopedTasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const scopedCompletedTitles = scopedTasks
    .filter((task) => task.completed)
    .map((task) => task.text.trim())
    .filter(Boolean);
  const scopedRemainingTitles = scopedTasks
    .filter((task) => !task.completed)
    .map((task) => task.text.trim())
    .filter(Boolean);
  const rangePercentage = percentage;
  const progressHue = Math.round((rangePercentage / 100) * 120);
  const progressColorStart = `hsl(${progressHue} 72% 42%)`;
  const progressColorEnd = `hsl(${progressHue} 78% 54%)`;
  const rangeLabel = getProgressRangeLabel(progressRange);

  totalTasksEl.textContent = String(total);
  completedTasksEl.textContent = String(completed);
  remainingTasksEl.textContent = String(remaining);
  completedDetailEl.textContent =
    scopedCompletedTitles.length === 0
      ? `${rangeLabel}: none`
      : `${rangeLabel}: ${scopedCompletedTitles.join(", ")}`;
  remainingDetailEl.textContent =
    scopedRemainingTitles.length === 0
      ? `${rangeLabel}: none`
      : `${rangeLabel}: ${scopedRemainingTitles.join(", ")}`;
  completionPercentageEl.textContent = `${percentage}%`;
  progressTitleEl.textContent = `${rangeLabel} Progress (${completed}/${total})`;
  progressLabelEl.textContent = `${rangePercentage}%`;
  progressFillEl.style.width = `${rangePercentage}%`;
  progressFillEl.style.background = `linear-gradient(90deg, ${progressColorStart}, ${progressColorEnd})`;
  progressTrackEl.setAttribute("aria-valuenow", String(rangePercentage));
  updateProgressRangeButtons();
}

function setProgressRange(nextRange) {
  if (!["today", "week", "month"].includes(nextRange)) {
    return;
  }

  progressRange = nextRange;
  updateDashboard(tasks);
}

function updateProgressRangeButtons() {
  const states = [
    [progressTodayBtn, "today"],
    [progressWeekBtn, "week"],
    [progressMonthBtn, "month"]
  ];

  states.forEach(([button, key]) => {
    const isActive = progressRange === key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getProgressRangeLabel(range) {
  if (range === "week") {
    return "This Week";
  }

  if (range === "month") {
    return "This Month";
  }

  return "Today";
}

function getTasksForProgressRange(taskItems, range) {
  const now = new Date();
  const todayKey = formatDateParts(now.getFullYear(), now.getMonth() + 1, now.getDate());

  if (range === "today") {
    return taskItems.filter((task) => task.dueDate === todayKey);
  }

  if (range === "week") {
    const weekStart = new Date(now);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return taskItems.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const dueDate = new Date(`${task.dueDate}T00:00`);
      if (Number.isNaN(dueDate.getTime())) {
        return false;
      }

      return dueDate >= weekStart && dueDate <= weekEnd;
    });
  }

  if (range === "month") {
    return taskItems.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      const dueDate = new Date(`${task.dueDate}T00:00`);
      if (Number.isNaN(dueDate.getTime())) {
        return false;
      }

      return (
        dueDate.getFullYear() === now.getFullYear() &&
        dueDate.getMonth() === now.getMonth()
      );
    });
  }

  return [];
}

function applyCategoryColors(taskElement, colors) {
  const safeColors = colors || CATEGORY_PALETTES[0][themeMode] || CATEGORY_PALETTES[0].light;
  taskElement.style.setProperty("--task-bg", safeColors.taskBg);
  taskElement.style.setProperty("--task-border", safeColors.taskBorder);
  taskElement.style.setProperty("--badge-bg", safeColors.badgeBg);
  taskElement.style.setProperty("--badge-border", safeColors.badgeBorder);
  taskElement.style.setProperty("--badge-text", safeColors.badgeText);
}

function clearDragState() {
  if (!dragState) {
    return;
  }

  if (dragState.rafId) {
    cancelAnimationFrame(dragState.rafId);
  }

  if (
    typeof dragState.sourceEl.releasePointerCapture === "function" &&
    dragState.pointerId !== null
  ) {
    try {
      dragState.sourceEl.releasePointerCapture(dragState.pointerId);
    } catch (error) {
      // Ignore release errors if pointer capture is already cleared.
    }
  }

  if (dragState.proxyEl && dragState.proxyEl.parentNode) {
    dragState.proxyEl.parentNode.removeChild(dragState.proxyEl);
  }

  if (dragState.placeholderEl && dragState.placeholderEl.parentNode) {
    dragState.placeholderEl.parentNode.removeChild(dragState.placeholderEl);
  }

  dragState.sourceEl.classList.remove("dragging-source");
  dragState = null;
  window.removeEventListener("pointermove", handlePointerDragMove);
  window.removeEventListener("pointerup", handlePointerDragEnd);
  window.removeEventListener("pointercancel", handlePointerDragEnd);
}

function buildCategoryColorMap(taskItems) {
  const categories = [...new Set(taskItems.map((task) => task.category))].sort((a, b) =>
    a.localeCompare(b)
  );
  const map = {};

  categories.forEach((category, index) => {
    const paletteGroup = CATEGORY_PALETTES[index % CATEGORY_PALETTES.length];
    map[category] = paletteGroup[themeMode] || paletteGroup.light;
  });

  return map;
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    const nextCompleted = !task.completed;
    if (nextCompleted) {
      completedMeta[String(taskId)] = Date.now();
    } else {
      delete completedMeta[String(taskId)];
    }

    const nextSubtasks = nextCompleted
      ? sanitizeSubtasks(task.subtasks).map((subtask) => ({ ...subtask, completed: true }))
      : sanitizeSubtasks(task.subtasks);

    return { ...task, completed: nextCompleted, subtasks: nextSubtasks };
  });

  saveCompletedMeta();
  saveTasks();
  renderTasks();
}

function toggleSubtask(taskId, subtaskIndex) {
  tasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    const subtasks = sanitizeSubtasks(task.subtasks).map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, completed: !subtask.completed } : subtask
    );

    return { ...task, subtasks };
  });

  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  if (editingTaskId === taskId) {
    editingTaskId = null;
  }

  tasks = tasks.filter((task) => task.id !== taskId);
  delete completedMeta[String(taskId)];
  saveCompletedMeta();
  saveTasks();
  renderTasks();
}

function startEditingTask(taskId) {
  clearDragState();
  editingTaskId = taskId;
  renderTasks();
}

function cancelEditingTask() {
  editingTaskId = null;
  renderTasks();
}

function saveTaskEdits(taskId, values) {
  const trimmedText = values.text.trim();

  if (!trimmedText) {
    return;
  }

  tasks = tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          text: trimmedText,
          tags: sanitizeTags(values.tags, task.category),
          category: getPrimaryCategory(sanitizeTags(values.tags, task.category), task.category),
          priority: sanitizePriority(values.priority),
          dueDate: values.dueDate,
          dueTime: values.dueTime,
          subtasks: sanitizeSubtasks(values.subtasks)
        }
      : task
  );

  editingTaskId = null;
  saveTasks();
  renderTasks();
}

function createTaskEditForm(task) {
  const form = document.createElement("form");
  form.className = "task-edit-form";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "task-edit-input task-edit-name";
  nameInput.value = task.text;
  nameInput.placeholder = "Task name";
  nameInput.required = true;

  const tagsInput = document.createElement("input");
  tagsInput.type = "text";
  tagsInput.setAttribute("list", "tag-options");
  tagsInput.className = "task-edit-input task-edit-tags";
  tagsInput.value = getTaskTags(task)[0] || "";
  tagsInput.placeholder = "Category";

  const priorityInput = document.createElement("select");
  priorityInput.className = "task-edit-input task-edit-priority";
  [
    ["high", "High priority"],
    ["medium", "Medium priority"],
    ["low", "Low priority"]
  ].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = task.priority === value;
    priorityInput.appendChild(option);
  });

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "task-edit-input task-edit-date";
  dateInput.value = task.dueDate;

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.className = "task-edit-input task-edit-time";
  timeInput.value = task.dueTime;

  let editDraftSubtasks = sanitizeSubtasks(task.subtasks).map((subtask) => ({
    text: subtask.text,
    completed: Boolean(subtask.completed)
  }));

  const subtasksBuilder = document.createElement("div");
  subtasksBuilder.className = "subtask-optional-wrap task-edit-subtask-builder";

  const subtasksRow = document.createElement("div");
  subtasksRow.className = "subtask-builder-row";

  const subtasksInput = document.createElement("input");
  subtasksInput.type = "text";
  subtasksInput.className = "task-edit-input";
  subtasksInput.placeholder = "Add a subtask...";

  const addSubtaskButton = document.createElement("button");
  addSubtaskButton.type = "button";
  addSubtaskButton.className = "task-edit-subtask-add-btn";
  addSubtaskButton.textContent = "Add Subtask";

  const subtasksPreview = document.createElement("ul");
  subtasksPreview.className = "subtask-draft-list";
  subtasksPreview.setAttribute("aria-live", "polite");

  const renderEditDraftSubtasks = () => {
    subtasksPreview.innerHTML = "";

    if (!editDraftSubtasks.length) {
      const empty = document.createElement("li");
      empty.className = "subtask-draft-empty";
      empty.textContent = "No subtasks added yet.";
      subtasksPreview.appendChild(empty);
      return;
    }

    editDraftSubtasks.forEach((subtask, index) => {
      const item = document.createElement("li");
      item.className = "subtask-draft-item";

      const text = document.createElement("span");
      text.className = "subtask-draft-text";
      text.textContent = subtask.text;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "subtask-draft-remove";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        editDraftSubtasks = editDraftSubtasks.filter((_, currentIndex) => currentIndex !== index);
        renderEditDraftSubtasks();
      });

      item.append(text, removeBtn);
      subtasksPreview.appendChild(item);
    });
  };

  const addEditDraftSubtask = () => {
    const text = normalizeDraftSubtaskText(subtasksInput.value);
    if (!text) {
      return;
    }

    editDraftSubtasks.push({ text, completed: false });
    subtasksInput.value = "";
    renderEditDraftSubtasks();
    subtasksInput.focus();
  };

  addSubtaskButton.addEventListener("click", addEditDraftSubtask);
  subtasksInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addEditDraftSubtask();
    }
  });

  subtasksRow.append(subtasksInput, addSubtaskButton);
  subtasksBuilder.append(subtasksRow, subtasksPreview);
  renderEditDraftSubtasks();

  const buttons = document.createElement("div");
  buttons.className = "task-edit-buttons";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "save-btn";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "cancel-btn";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", cancelEditingTask);

  buttons.append(saveButton, cancelButton);
  form.append(nameInput, tagsInput, priorityInput, dateInput, timeInput, subtasksBuilder, buttons);

  // Edit mode uses form submit so Enter saves all field changes consistently.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveTaskEdits(task.id, {
      text: nameInput.value,
      tags: tagsInput.value,
      priority: priorityInput.value,
      dueDate: dateInput.value,
      dueTime: timeInput.value,
      subtasks: mergeEditedSubtasks(
        task.subtasks,
        editDraftSubtasks.map((subtask) => subtask.text).join(", ")
      )
    });
  });

  return form;
}

function saveTasks() {
  // Persist current task state so refreshing the page keeps the list.
  writeStorage(STORAGE_KEY, JSON.stringify(tasks));
}

function saveSortMode() {
  writeStorage(SORT_STORAGE_KEY, sortMode);
}

function saveCategoryFilter() {
  writeStorage(CATEGORY_FILTER_STORAGE_KEY, activeCategoryFilter);
}

function saveSearchQuery() {
  writeStorage(SEARCH_QUERY_STORAGE_KEY, searchQuery);
}

function saveDashboardOpen() {
  writeStorage(DASHBOARD_OPEN_STORAGE_KEY, String(isDashboardOpen));
}

function saveThemeMode() {
  writeStorage(THEME_STORAGE_KEY, themeMode);
}

function saveShowCompleted() {
  writeStorage(SHOW_COMPLETED_STORAGE_KEY, String(showCompleted));
}

function saveCompletedMeta() {
  writeStorage(COMPLETED_META_STORAGE_KEY, JSON.stringify(completedMeta));
}

function loadSortMode() {
  const raw = readStorage(SORT_STORAGE_KEY);
  if (raw === "priority") {
    return "priority";
  }

  if (raw === "due-soon") {
    return "due-soon";
  }

  if (raw === "manual") {
    return "manual";
  }

  return "newest";
}

function loadCategoryFilter() {
  const raw = readStorage(CATEGORY_FILTER_STORAGE_KEY);
  return raw || "all";
}

function loadSearchQuery() {
  const raw = readStorage(SEARCH_QUERY_STORAGE_KEY);
  return typeof raw === "string" ? raw : "";
}

function loadDashboardOpen() {
  return readStorage(DASHBOARD_OPEN_STORAGE_KEY) === "true";
}

function loadThemeMode() {
  const raw = readStorage(THEME_STORAGE_KEY);
  return raw === "dark" ? "dark" : "light";
}

function loadShowCompleted() {
  return readStorage(SHOW_COMPLETED_STORAGE_KEY) === "true";
}

function loadCompletedMeta() {
  const raw = readStorage(COMPLETED_META_STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.entries(parsed).reduce((acc, [id, value]) => {
      const timestamp = Number(value);
      if (Number.isFinite(timestamp) && timestamp > 0) {
        acc[id] = timestamp;
      }
      return acc;
    }, {});
  } catch (error) {
    return {};
  }
}

function syncCompletedMeta() {
  const nextMeta = {};
  const now = Date.now();

  tasks.forEach((task) => {
    if (task.completed) {
      const existingTimestamp = completedMeta[String(task.id)];
      nextMeta[String(task.id)] =
        typeof existingTimestamp === "number" ? existingTimestamp : now;
    }
  });

  completedMeta = nextMeta;
  saveCompletedMeta();
}

function purgeExpiredCompletedTasks() {
  const now = Date.now();
  const expiredIds = new Set(
    tasks
      .filter((task) => {
        if (!task.completed) {
          return false;
        }
        const completedAt = completedMeta[String(task.id)];
        return typeof completedAt === "number" && now - completedAt >= COMPLETED_RETENTION_MS;
      })
      .map((task) => task.id)
  );

  if (!expiredIds.size) {
    return;
  }

  tasks = tasks.filter((task) => !expiredIds.has(task.id));
  Object.keys(completedMeta).forEach((id) => {
    if (expiredIds.has(Number(id))) {
      delete completedMeta[id];
    }
  });

  if (editingTaskId !== null && expiredIds.has(editingTaskId)) {
    editingTaskId = null;
  }

  saveCompletedMeta();
  saveTasks();
}

function setDashboardOpen(value) {
  isDashboardOpen = value;
  dashboardPanel.hidden = !isDashboardOpen;
  dashboardPanel.classList.toggle("is-collapsed", !isDashboardOpen);
  toggleDashboardBtn.textContent = isDashboardOpen
    ? "Hide Progress Dashboard"
    : "Show Progress Dashboard";
  toggleDashboardBtn.setAttribute("aria-expanded", String(isDashboardOpen));
}

function setSmartAddOpen(value) {
  isSmartAddOpen = Boolean(value);
  smartAddPanel.hidden = !isSmartAddOpen;
  smartAddPanel.classList.toggle("is-collapsed", !isSmartAddOpen);
  toggleSmartAddBtn.textContent = isSmartAddOpen
    ? "Hide Smart Add (Beta)"
    : "Open Smart Add (Beta)";
  toggleSmartAddBtn.setAttribute("aria-expanded", String(isSmartAddOpen));

  if (isSmartAddOpen) {
    smartAddInput.focus();
  }

  updateEntrySectionSpacing();
}

function setTaskEntryOpen(value) {
  isTaskEntryOpen = Boolean(value);
  taskEntryPanel.hidden = !isTaskEntryOpen;
  taskEntryPanel.classList.toggle("is-collapsed", !isTaskEntryOpen);
  toggleTaskEntryBtn.textContent = isTaskEntryOpen ? "Hide Add Task" : "Open Add Task";
  toggleTaskEntryBtn.setAttribute("aria-expanded", String(isTaskEntryOpen));

  if (isTaskEntryOpen) {
    taskInput.focus();
  } else {
    setTaskAdvancedOpen(false);
    setTaskSubtasksOpen(false);
  }

  updateEntrySectionSpacing();
}

function updateEntrySectionSpacing() {
  appRoot.classList.toggle("both-entry-open", isSmartAddOpen && isTaskEntryOpen);
}

function setThemeMode(nextTheme) {
  themeMode = nextTheme === "dark" ? "dark" : "light";
  applyTheme(themeMode);
  saveThemeMode();
  renderTasks();
}

function toggleThemeMode() {
  setThemeMode(themeMode === "dark" ? "light" : "dark");
}

function applyTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  themeLightBtn.classList.toggle("active", mode === "light");
  themeDarkBtn.classList.toggle("active", mode === "dark");
  themeLightBtn.setAttribute("aria-pressed", String(mode === "light"));
  themeDarkBtn.setAttribute("aria-pressed", String(mode === "dark"));
}

function normalizeCategory(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "General";
  }

  // Title-case category names for consistent list labels.
  return trimmed
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function normalizeTag(value) {
  const raw = typeof value === "string" ? value.trim().replace(/^#+/, "") : "";
  if (!raw) {
    return "";
  }

  return raw
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function sanitizeTags(value, legacyCategory) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  let chosenTag = "";

  source.forEach((item) => {
    if (chosenTag) {
      return;
    }

    const normalized = normalizeTag(item);
    if (!normalized) {
      return;
    }
    chosenTag = normalized;
  });

  if (!chosenTag) {
    const fallback = normalizeTag(typeof legacyCategory === "string" ? legacyCategory : "");
    if (fallback) {
      chosenTag = fallback;
    }
  }

  if (!chosenTag) {
    chosenTag = "General";
  }

  return [chosenTag];
}

function getTaskTags(task) {
  return sanitizeTags(task?.tags, task?.category || "");
}

function getPrimaryCategory(tags, fallbackCategory) {
  const normalizedTags = sanitizeTags(tags, fallbackCategory);
  return normalizedTags[0] || "General";
}

function parseSubtasksInput(value) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[,\n;|]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function sanitizeSubtasks(value) {
  if (typeof value === "string") {
    return parseSubtasksInput(value).map((text) => ({ text, completed: false }));
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        const text = item.trim();
        return text ? { text, completed: false } : null;
      }

      if (!item || typeof item !== "object") {
        return null;
      }

      const text = typeof item.text === "string" ? item.text.trim() : "";
      if (!text) {
        return null;
      }

      return { text, completed: Boolean(item.completed) };
    })
    .filter(Boolean)
    .slice(0, 30);
}

function mergeEditedSubtasks(existingSubtasks, editedValue) {
  const existing = sanitizeSubtasks(existingSubtasks);
  const completionByText = new Map(
    existing.map((subtask) => [subtask.text.toLowerCase(), Boolean(subtask.completed)])
  );

  return parseSubtasksInput(editedValue).map((text) => ({
    text,
    completed: completionByText.get(text.toLowerCase()) || false
  }));
}

function sanitizeDueDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
}

function sanitizeDueTime(value) {
  return /^\d{2}:\d{2}$/.test(value) ? value : "";
}

function sanitizePriority(value) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (!normalized) {
    return "medium";
  }

  if (
    [
      "high",
      "urgent",
      "very urgent",
      "critical",
      "asap",
      "immediately",
      "immediate",
      "top priority",
      "highest priority",
      "p1",
      "priority 1"
    ].includes(normalized)
  ) {
    return "high";
  }

  if (["medium", "normal", "standard", "moderate"].includes(normalized)) {
    return "medium";
  }

  if (["low", "later", "optional", "whenever", "not urgent", "backlog"].includes(normalized)) {
    return "low";
  }

  return "medium";
}

function formatPriorityLabel(priority) {
  if (priority === "high") {
    return "High";
  }

  if (priority === "low") {
    return "Low";
  }

  return "Medium";
}

function getPrioritySortRank(priority) {
  if (priority === "high") {
    return 0;
  }

  if (priority === "medium") {
    return 1;
  }

  return 2;
}

function getFilteredTasks(taskItems, categoryValue) {
  if (categoryValue === "all") {
    return taskItems;
  }

  return taskItems.filter((task) => getTaskTags(task).includes(categoryValue));
}

function getSearchFilteredTasks(taskItems, queryValue) {
  const normalized = typeof queryValue === "string" ? queryValue.trim().toLowerCase() : "";
  if (!normalized) {
    return taskItems;
  }

  const terms = normalized.split(/\s+/).filter(Boolean);
  if (!terms.length) {
    return taskItems;
  }

  return taskItems.filter((task) => {
    const searchable = buildTaskSearchText(task);
    return terms.every((term) => searchable.includes(term));
  });
}

function buildTaskSearchText(task) {
  const parts = [task.text || "", task.category || "", ...(Array.isArray(task.tags) ? task.tags : [])];
  const hashTags = extractHashTags(task.text || "");
  parts.push(...hashTags);
  return parts
    .map((value) => (typeof value === "string" ? value.trim().toLowerCase() : ""))
    .filter(Boolean)
    .join(" ");
}

function extractHashTags(text) {
  const source = typeof text === "string" ? text : "";
  if (!source) {
    return [];
  }

  const matches = [...source.matchAll(/#([a-z0-9_-]+)/gi)];
  if (!matches.length) {
    return [];
  }

  return matches.flatMap((match) => {
    const tag = match[1].toLowerCase();
    return [tag, `#${tag}`];
  });
}

function refreshCategoryFilterOptions() {
  const existing = activeCategoryFilter;
  const categories = [...new Set(tasks.flatMap((task) => getTaskTags(task)))].sort((a, b) =>
    a.localeCompare(b)
  );

  categoryFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All categories";
  categoryFilter.appendChild(allOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // If a saved filter no longer exists, fall back to showing all tasks.
  const hasSelectedCategory =
    existing === "all" || categories.includes(existing);
  activeCategoryFilter = hasSelectedCategory ? existing : "all";
  categoryFilter.value = activeCategoryFilter;
}

function refreshCategorySuggestions() {
  const categories = [...new Set(tasks.flatMap((task) => getTaskTags(task)))].sort((a, b) =>
    a.localeCompare(b)
  );

  tagOptions.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    tagOptions.appendChild(option);
  });
}

function getSortedTasks(taskItems, currentSortMode) {
  const clone = [...taskItems];

  if (currentSortMode === "manual") {
    return clone.sort((a, b) => a.order - b.order);
  }

  if (currentSortMode === "due-soon") {
    return clone.sort((a, b) => {
      const aTimestamp = getDueTimestamp(a);
      const bTimestamp = getDueTimestamp(b);

      if (aTimestamp === null && bTimestamp === null) {
        return b.id - a.id;
      }

      // Keep tasks without due dates at the bottom.
      if (aTimestamp === null) {
        return 1;
      }

      if (bTimestamp === null) {
        return -1;
      }

      if (aTimestamp === bTimestamp) {
        return b.id - a.id;
      }

      return aTimestamp - bTimestamp;
    });
  }

  if (currentSortMode === "priority") {
    return clone.sort((a, b) => {
      const byPriority = getPrioritySortRank(a.priority) - getPrioritySortRank(b.priority);
      if (byPriority !== 0) {
        return byPriority;
      }

      const aTimestamp = getDueTimestamp(a);
      const bTimestamp = getDueTimestamp(b);
      if (aTimestamp !== null && bTimestamp !== null && aTimestamp !== bTimestamp) {
        return aTimestamp - bTimestamp;
      }
      if (aTimestamp !== null && bTimestamp === null) {
        return -1;
      }
      if (aTimestamp === null && bTimestamp !== null) {
        return 1;
      }
      return b.id - a.id;
    });
  }

  return clone.sort((a, b) => b.id - a.id);
}

function getDueTimestamp(task) {
  if (!task.dueDate) {
    return null;
  }

  const value = `${task.dueDate}T${task.dueTime || "23:59"}`;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}

function formatDueLabel(dueDate, dueTime) {
  if (!dueDate && !dueTime) {
    return "No due date";
  }

  if (dueDate && dueTime) {
    const dateObj = new Date(`${dueDate}T${dueTime}`);

    if (!Number.isNaN(dateObj.getTime())) {
      return `Due ${dateObj.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      })}`;
    }
  }

  if (dueDate) {
    const dateObj = new Date(`${dueDate}T00:00`);

    if (!Number.isNaN(dateObj.getTime())) {
      return `Due ${dateObj.toLocaleDateString(undefined, {
        dateStyle: "medium"
      })}`;
    }
  }

  return `Due at ${dueTime}`;
}

function loadTasks() {
  const raw = readStorage(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    // Validate storage shape before trusting data from localStorage.
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === "number" &&
          typeof item.text === "string" &&
          typeof item.completed === "boolean"
      )
      .map((item) => ({
        ...item,
        tags: sanitizeTags(item.tags, typeof item.category === "string" ? item.category : "General"),
        category: "",
        priority: sanitizePriority(typeof item.priority === "string" ? item.priority : "medium"),
        dueDate: typeof item.dueDate === "string" ? item.dueDate : "",
        dueTime: typeof item.dueTime === "string" ? item.dueTime : "",
        subtasks: sanitizeSubtasks(item.subtasks),
        order: typeof item.order === "number" ? item.order : Number.MAX_SAFE_INTEGER
      }))
      .map((item) => ({
        ...item,
        category: getPrimaryCategory(item.tags, item.category)
      }))
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({
        ...item,
        order: index
      }));
  } catch (error) {
    return [];
  }
}

function getNextTaskOrder() {
  if (!tasks.length) {
    return 0;
  }

  return Math.max(...tasks.map((task) => task.order)) + 1;
}

function handlePointerDragStart(event, listItem, taskId) {
  if (event.button !== 0 || dragState || editingTaskId !== null) {
    return;
  }

  if (isInteractiveTarget(event.target)) {
    return;
  }

  event.preventDefault();
  const rect = listItem.getBoundingClientRect();

  const placeholderEl = document.createElement("li");
  placeholderEl.className = "task-item task-placeholder";
  placeholderEl.style.height = `${rect.height}px`;

  const proxyEl = listItem.cloneNode(true);
  proxyEl.className = `${proxyEl.className} drag-proxy`;
  proxyEl.style.width = `${rect.width}px`;
  proxyEl.style.left = "0";
  proxyEl.style.top = "0";

  listItem.after(placeholderEl);
  listItem.classList.add("dragging-source");
  document.body.appendChild(proxyEl);

  dragState = {
    taskId,
    sourceEl: listItem,
    placeholderEl,
    proxyEl,
    pointerId: event.pointerId ?? null,
    pointerOffsetX: event.clientX - rect.left,
    pointerOffsetY: event.clientY - rect.top,
    latestClientX: event.clientX,
    latestClientY: event.clientY,
    rafId: 0
  };

  if (typeof listItem.setPointerCapture === "function" && dragState.pointerId !== null) {
    try {
      listItem.setPointerCapture(dragState.pointerId);
    } catch (error) {
      // Ignore capture errors and keep using window listeners as fallback.
    }
  }

  requestDragProxyRender();
  window.addEventListener("pointermove", handlePointerDragMove);
  window.addEventListener("pointerup", handlePointerDragEnd);
  window.addEventListener("pointercancel", handlePointerDragEnd);
}

function handlePointerDragMove(event) {
  if (!dragState) {
    return;
  }

  dragState.latestClientX = event.clientX;
  dragState.latestClientY = event.clientY;
  requestDragProxyRender();

  const hovered = document.elementFromPoint(event.clientX, event.clientY);
  const targetItem = hovered?.closest(".task-item[data-id]");

  if (!targetItem || targetItem === dragState.sourceEl) {
    return;
  }

  const targetRect = targetItem.getBoundingClientRect();
  const insertAfter = event.clientY > targetRect.top + targetRect.height / 2;

  if (insertAfter) {
    targetItem.after(dragState.placeholderEl);
  } else {
    targetItem.before(dragState.placeholderEl);
  }
}

function handlePointerDragEnd() {
  if (!dragState) {
    return;
  }

  const draggedId = dragState.taskId;
  const orderedVisibleIds = getOrderedVisibleIdsFromDrop(draggedId, dragState.placeholderEl);
  clearDragState();
  applyVisibleTaskOrder(orderedVisibleIds);
}

function moveDragProxy(clientX, clientY) {
  if (!dragState) {
    return;
  }

  const x = clientX - dragState.pointerOffsetX;
  const y = clientY - dragState.pointerOffsetY;
  dragState.proxyEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(1deg)`;
}

function requestDragProxyRender() {
  if (!dragState || dragState.rafId) {
    return;
  }

  dragState.rafId = requestAnimationFrame(() => {
    if (!dragState) {
      return;
    }

    dragState.rafId = 0;
    moveDragProxy(dragState.latestClientX, dragState.latestClientY);
  });
}

function getOrderedVisibleIdsFromDrop(draggedId, placeholderEl) {
  const currentVisibleIds = getSortedTasks(
    getSearchFilteredTasks(getFilteredTasks(tasks, activeCategoryFilter), searchQuery).filter(
      (task) => !task.completed
    ),
    "manual"
  ).map((task) => task.id);
  const visibleWithoutDragged = currentVisibleIds.filter((id) => id !== draggedId);
  let insertionIndex = 0;

  const children = [...taskList.children];
  for (const child of children) {
    if (child === placeholderEl) {
      break;
    }

    if (child.matches(".task-item[data-id]")) {
      const childId = Number(child.dataset.id);
      if (childId !== draggedId) {
        insertionIndex += 1;
      }
    }
  }

  const reordered = [...visibleWithoutDragged];
  reordered.splice(insertionIndex, 0, draggedId);
  return reordered;
}

function applyVisibleTaskOrder(reorderedVisibleIds) {
  if (!reorderedVisibleIds.length) {
    return;
  }

  const visibleSet = new Set(reorderedVisibleIds);
  const allOrderedIds = [...tasks]
    .sort((a, b) => a.order - b.order)
    .map((task) => task.id);

  let pointer = 0;
  const nextAllIds = allOrderedIds.map((id) => {
    if (!visibleSet.has(id)) {
      return id;
    }

    const nextId = reorderedVisibleIds[pointer];
    pointer += 1;
    return nextId;
  });

  const byId = new Map(tasks.map((task) => [task.id, task]));
  tasks = nextAllIds.map((id, index) => ({
    ...byId.get(id),
    order: index
  }));

  saveTasks();
  renderTasks();
}

function isInteractiveTarget(target) {
  return Boolean(
    target.closest("button, input, select, textarea, label, a, .task-edit-form")
  );
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage write failures so the UI keeps functioning in-memory.
  }
}

function loadSmartAddSpendUsd() {
  const raw = readStorage(SMART_ADD_SPEND_STORAGE_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function saveSmartAddSpendUsd() {
  writeStorage(SMART_ADD_SPEND_STORAGE_KEY, String(smartAddSpendUsd));
}

function formatUsd(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  if (amount >= 1) {
    return `$${amount.toFixed(2)}`;
  }

  if (amount >= 0.01) {
    return `$${amount.toFixed(3)}`;
  }

  return `$${amount.toFixed(4)}`;
}
