const addBtn = document.getElementById("addBtn");
const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

addBtn.addEventListener("click", () => {
  const habitText = habitInput.value.trim();
  if (habitText === "") return;

  const li = document.createElement("li");
  li.textContent = habitText;

  // DONE BUTTON
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";

  doneBtn.addEventListener("click", () => {
    li.style.textDecoration = "line-through";
  });

  // DELETE BUTTON
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  habitList.appendChild(li);

  habitInput.value = "";
});