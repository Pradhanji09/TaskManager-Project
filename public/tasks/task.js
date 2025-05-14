// Sample task creation animation
document.querySelector('.new-task-btn').addEventListener('click', () => {
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('div');
    newTask.className = 'task-item';
    newTask.innerHTML = `
        <div class="task-content">
            <input type="checkbox">
            <span>New Task</span>
        </div>
        <div class="task-controls">
            <button class="edit-btn">✎</button>
            <button class="delete-btn">×</button>
        </div>
    `;
    
    taskList.prepend(newTask);
    newTask.style.animation = 'taskAppear 0.4s ease';
});

// Add hover animations
document.addEventListener('mouseover', (e) => {
    if(e.target.closest('.task-item')) {
        e.target.closest('.task-item').style.transform = 'translateY(-3px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if(e.target.closest('.task-item')) {
        e.target.closest('.task-item').style.transform = 'translateY(0)';
    }
});