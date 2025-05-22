export function setupTaskFiltering() {
  const searchInput = document.getElementById("searchInput");
  const priorityFilter = document.getElementById("priorityFilter");
  const taskCards = document.querySelectorAll(".task-card");

  function filterTasks() {
    const searchText = searchInput.value.toLowerCase();
    const selectedPriority = priorityFilter.value;

    taskCards.forEach((card) => {
      const title = card.querySelector("h3")?.innerText.toLowerCase();
      const desc = card.querySelector("p")?.innerText.toLowerCase();
      const cardPriority = card.classList.contains("low")
        ? "low"
        : card.classList.contains("medium")
        ? "medium"
        : "high";

      const matchesSearch =
        title.includes(searchText) || desc.includes(searchText);
      const matchesFilter =
        !selectedPriority || cardPriority === selectedPriority;

      card.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
  }

  searchInput.addEventListener("input", filterTasks);
  priorityFilter.addEventListener("change", filterTasks);
}
