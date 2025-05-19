document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("newTaskModal");
  const openBtn = document.querySelector(".new-task-btn");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("taskForm");

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const dueInput = document.getElementById("dueDate");
  const priorityInput = document.getElementById("priority");
  const taskIdInput = document.getElementById("taskId");
  taskId;
  const modalTitle = document.getElementById("modalTitle");
  const submitBtn = document.getElementById("submitBtn");

  // Handle New Task button
  openBtn.addEventListener("click", () => {
    form.reset();
    form.action = "/tasks";
    taskIdInput.value = "";
    modal.style.display = "flex";
    modalTitle.textContent = "New Task";
  });

  // Handle modal close
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    // Close the modal if the user clicks outside of it
    // and not on the close button
    if (e.target === modal) {
      console.log(e.target);
      modal.style.display = "none";
    }
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const taskCard = button.closest(".task-card"); // for finding closet task-card class

      const taskId = taskCard.dataset.id; // Getting current task's ID

      const title = taskCard.querySelector("h3").textContent.trim(); //Getting title text
      const description =
        taskCard.querySelector("p:not(:has(strong))")?.textContent.trim() || ""; // Description in a <p> without <strong> elements

      const dueText = taskCard
        .querySelector("p strong")
        ?.nextSibling?.textContent.trim();

      // Text content Due date after a <strong> label
      const priority = taskCard
        .querySelector("p:last-of-type")
        .textContent.split(":")[1]
        .trim()
        .toLowerCase(); // Priority in the last <p> element

      // Set form data
      form.action = `/tasks/edit/${taskId}`;
      titleInput.value = title;
      descInput.value = description;
      dueInput.value = dueText
        ? new Date(dueText).toISOString().split("T")[0]
        : "";
      console.log(new Date(dueText).toISOString().split("T")[0]);

      priorityInput.value = priority;
      taskIdInput.value = taskId;

      submitBtn.textContent = "Save Changes";
      modalTitle.textContent = "Edit Task"; // <-- Change title here

      modal.style.display = "flex";
    });
  });
});
