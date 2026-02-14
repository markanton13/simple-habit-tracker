document.addEventListener("DOMContentLoaded", () => {

  const today = new Date().toISOString().split("T")[0];
  const addBtn = document.getElementById("addBtn");
  const habitInput = document.getElementById("habitInput");
  const habitList = document.getElementById("habitList");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const themeToggle = document.getElementById("themeToggle");

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  habits = habits.map(habit => ({
    streak: 0,
    lastCompleted: null,
    ...habit
  }));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark"));
    });
  }

  if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
  }

  function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  function resetDailyHabits() {
    habits.forEach(habit => {
      if (habit.lastCompleted !== today) {
        habit.completed = false;
      }
    });
    saveHabits();
  }

  function updateProgress() {
    if (habits.length === 0) {
      progressFill.style.width = "0%";
      progressText.textContent = "0% Completed";
      return;
    }

    const completed = habits.filter(h => h.completed).length;
    const percent = Math.round((completed / habits.length) * 100);

    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "% Completed";
  }

  function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = habit.text;

      if (habit.completed) {
        span.classList.add("completed");
      }

      const streakSpan = document.createElement("small");
      streakSpan.textContent = ` 🔥 ${habit.streak || 0}`;
      span.appendChild(streakSpan);

      span.addEventListener("click", () => {
        if (!habit.completed) {
          if (habit.lastCompleted === today) return;

          if (habit.lastCompleted) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yDate = yesterday.toISOString().split("T")[0];

            if (habit.lastCompleted === yDate) {
              habit.streak += 1;
            } else {
              habit.streak = 1;
            }
          } else {
            habit.streak = 1;
          }

          habit.lastCompleted = today;
        }

        habit.completed = !habit.completed;
        saveHabits();
        renderHabits();
      });

      span.addEventListener("dblclick", () => {
        const newText = prompt("Edit habit:", habit.text);
        if (newText) {
          habit.text = newText;
          saveHabits();
          renderHabits();
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", () => {
        habits.splice(index, 1);
        saveHabits();
        renderHabits();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      habitList.appendChild(li);
    });

    updateProgress();
  }

  function addHabit() {
  const habitText = habitInput.value.trim();
  if (habitText === "") return;

  habits.push({
    text: habitText,
    completed: false,
    streak: 0,
    lastCompleted: null
  });

  habitInput.value = "";
  habitInput.focus();
  saveHabits();
  renderHabits();
 }

 addBtn.addEventListener("click", addHabit);

 habitInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addHabit();
  }
 });

  resetDailyHabits();
  renderHabits();
});