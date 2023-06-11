// CLIENT SIDE

// Function for retrieving tasks from the web service
async function getTasks() {
    const response = await fetch("/tasks");
    const tasks = await response.json();
    return tasks;
}

// Function for adding a new task using the web service
async function addTask(name, dueDate, category) {
    const response = await fetch("/tasks", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,dueDate,category})
    });
    const newTask = await response.json();
    return newTask
}

// Function for updating an existing task using the web service
async function updateTask(id, name, dueDate, category) {
    const response = await fetch(`/tasks/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,dueDate,category})
    });
    const updatedTask = await response.json();
    return updatedTask
}

// Function for deleting an existing task using the web service
async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`,{
        method:"DELETE"
    });
    return response.ok
}

// Function for displaying tasks on the HTML page
async function displayTasks() {
    const tasks = await getTasks();
    const taskListElement = document.querySelector("#task-list");
    const taskTemplate = document.querySelector("#task-template");
    taskListElement.innerHTML = "";
    for (const task of tasks) {
        const taskElement = taskTemplate.content.cloneNode(true);
        taskElement.querySelector(".task-name").textContent = task.name;
        taskElement.querySelector(".due-date").textContent = task.dueDate;
        taskElement.querySelector(".category").textContent = task.category;
        taskElement.querySelector(".edit-button").dataset.taskId = task.id;
        taskElement.querySelector(".delete-button").dataset.taskId = task.id;
        taskListElement.appendChild(taskElement);
    }
}


// Function for handling the submit event of the add-task form
function handleAddTaskFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements["new-task"].value;
    const dueDate = form.elements["due-date"].value;
    const category = form.elements["category"].value;
    addTask(name, dueDate, category)
        .then(() => displayTasks())
        .catch(error => console.error(error));
}

// Function for handling the click event of the edit buttons
function handleEditButtonClick(taskId) {
    
    
    const taskElement = document.querySelector(`.edit-button[data-task-id="${taskId}"]`).closest(".task-item");
    
    if (taskElement) {
        const viewTaskElement = taskElement.querySelector(".view-task");
        const editTaskForm = taskElement.querySelector(".edit-task-form");
        
        viewTaskElement.hidden = true;
        editTaskForm.hidden = false;
        
        // added code to populate edit-task form with current values
        editTaskForm.elements["edit-task-name"].value = viewTaskElement.querySelector(".task-name").textContent;
        editTaskForm.elements["edit-due-date"].value = viewTaskElement.querySelector(".due-date").textContent;
        editTaskForm.elements["edit-category"].value = viewTaskElement.querySelector(".category").textContent;
    }
}


// Function for handling the submit event of the edit-task forms
function handleEditTaskFormSubmit(taskId, form) {
    
    const name = form.elements["edit-task-name"].value;
    const dueDate = form.elements["edit-due-date"].value;
    const category = form.elements["edit-category"].value;
    
    updateTask(taskId, name, dueDate, category)
        .then(() => displayTasks())
        .catch(error => console.error(error));
}


// Function for handling the click event of the cancel buttons
function handleCancelButtonClick(taskId) {

    const taskElement = document.querySelector(`.edit-button[data-task-id="${taskId}"]`).closest(".task-item");

    const viewTaskElement = taskElement.querySelector(".view-task");
    const editTaskForm = taskElement.querySelector(".edit-task-form");
    viewTaskElement.hidden = false;
    editTaskForm.hidden = true;
}


// Function for handling the click event of the delete buttons
function handleDeleteButtonClick(taskId) {
    deleteTask(taskId)
        .then(() => displayTasks())
        .catch(error => console.error(error));
}


// Add event listeners when the page loads
window.addEventListener("load", () => {
    // Display tasks when the page loads
    displayTasks();

    // Add event listener for the submit event of the add-task form
    const addTaskForm = document.querySelector("#add-task-form");
    addTaskForm.addEventListener("submit", handleAddTaskFormSubmit);

    // Add event listeners for the click event of the edit, delete, and cancel buttons
    // and the submit event of the edit-task forms
    // using event delegation
    const taskListElement = document.querySelector("#task-list");
    taskListElement.addEventListener("click", event => {
        const editButton = event.target.closest(".edit-button");
        if (editButton) {
            const taskId = parseInt(editButton.dataset.taskId);
            handleEditButtonClick(taskId);
        }
        const deleteButton = event.target.closest(".delete-button");
        if (deleteButton) {
            const taskId = parseInt(deleteButton.dataset.taskId);
            handleDeleteButtonClick(taskId);
        }
        const cancelButton = event.target.closest(".cancel-button");
        if (cancelButton) {
            const taskId = parseInt(cancelButton.closest(".task-item").querySelector(".edit-button").dataset.taskId);
            handleCancelButtonClick(taskId);
        }
    });
    taskListElement.addEventListener("submit", event => {
        if (event.target.matches(".edit-task-form")) {
            const taskId = parseInt(event.target.closest(".task-item").querySelector(".edit-button").dataset.taskId);
            handleEditTaskFormSubmit(taskId, event.target);
            event.preventDefault();
        }
    });
});
