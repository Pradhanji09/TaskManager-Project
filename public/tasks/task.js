import { setupTaskFiltering } from "./filter-search.js";

document.addEventListener("DOMContentLoaded", function () {
  setupTaskFiltering();
  const modal = document.getElementById("newTaskModal");
  const openBtn = document.querySelector(".new-task-btn");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("taskForm");

  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const dueInput = document.getElementById("dueDate");
  const priorityInput = document.getElementById("priority");
  const taskIdInput = document.getElementById("taskId");

  const modalTitle = document.getElementById("modalTitle");
  const submitBtn = document.getElementById("submitBtn");

  // Open New Task Modal
  openBtn.addEventListener("click", () => {
    form.reset();
    form.action = "/tasks";
    taskIdInput.value = "";
    modal.style.display = "flex";
    modalTitle.textContent = "New Task";
    submitBtn.textContent = "Add Task";
  });

  // Close Modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // Edit Task Handler
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const taskCard = button.closest(".task-card");
      const taskId = taskCard.dataset.id;
      const title = taskCard.querySelector("h3").textContent.trim();

      // Extract description (p without <strong>)
      const paragraphs = taskCard.querySelectorAll("p");
      let description = "";
      paragraphs.forEach((p) => {
        if (!p.querySelector("strong")) {
          description = p.textContent.trim();
        }
      });

      // Extract due date
      const dueText = taskCard
        .querySelector("p strong")
        ?.nextSibling?.textContent.trim();

      // Extract priority
      const priority = taskCard
        .querySelector("p:last-of-type")
        .textContent.split(":")[1]
        .trim()
        .toLowerCase();

      // Set form values
      form.action = `/tasks/edit/${taskId}`;
      titleInput.value = title;
      descInput.value = description;
      dueInput.value = dueText
        ? new Date(dueText).toISOString().split("T")[0]
        : "";
      priorityInput.value = priority;
      taskIdInput.value = taskId;

      modalTitle.textContent = "Edit Task";
      submitBtn.textContent = "Save Changes";
      modal.style.display = "flex";
    });
  });
});
