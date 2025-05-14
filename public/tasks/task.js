document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("newTaskModal");
  const openBtn = document.querySelector(".new-task-btn");
  const closeBtn = document.getElementById("closeModal");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    // Close the modal if the user clicks outside of it
    // and not on the close button
    console.log(modal);
    if (e.target === modal) {
      console.log(e.target);
      modal.style.display = "none";
    }
  });
});
