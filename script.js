const addBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
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

    span.addEventListener("click", () => {
      habits[index].completed = !habits[index].completed;
      saveHabits();
      renderHabits();
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

addBtn.addEventListener("click", () => {
  const habitText = habitInput.value.trim();
  if (habitText === "") return;

  habits.push({
    text: habitText,
    completed: false
  });

  habitInput.value = "";
  saveHabits();
  renderHabits();
});

renderHabits();