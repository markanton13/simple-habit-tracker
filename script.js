const addBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

addBtn.addEventListener("click", () => {
  const habitText = habitInput.value.trim();

  if (habitText === "") return;

  const li = document.createElement("li");
  li.textContent = habitText;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.addEventListener("click", () => {
    li.style.textDecoration = "line-through";
  });

  li.appendChild(doneBtn);
  habitList.appendChild(li);

  habitInput.value = "";
});