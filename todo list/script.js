const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Save to Local Storage
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display Tasks
function renderTasks(){

    taskList.innerHTML="";

    let filtered = tasks;

    if(currentFilter==="active"){
        filtered = tasks.filter(task=>!task.completed);
    }

    if(currentFilter==="completed"){
        filtered = tasks.filter(task=>task.completed);
    }

    filtered.forEach(task=>{

        const li=document.createElement("li");

        li.dataset.id=task.id;

        li.innerHTML=`
        <span class="${task.completed ? 'completed':''}">
        ${task.text}
        </span>

        <div class="actions">
            <button class="complete">✔</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `;

        taskList.appendChild(li);

    });

}

// Add Task
addTaskBtn.addEventListener("click",()=>{

    const text=taskInput.value.trim();

    if(text==="") return;

    tasks.push({
        id:Date.now(),
        text:text,
        completed:false
    });

    saveTasks();

    renderTasks();

    taskInput.value="";

});

// Event Delegation
taskList.addEventListener("click",(e)=>{

    const li=e.target.closest("li");

    const id=Number(li.dataset.id);

    const task=tasks.find(t=>t.id===id);

    if(e.target.classList.contains("delete")){

        tasks=tasks.filter(t=>t.id!==id);

    }

    if(e.target.classList.contains("complete")){

        task.completed=!task.completed;

    }

    if(e.target.classList.contains("edit")){

        const newText=prompt("Edit Task",task.text);

        if(newText!==null && newText.trim()!==""){

            task.text=newText.trim();

        }

    }

    saveTasks();

    renderTasks();

});

// Filters
filters.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filters.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter=btn.dataset.filter;

        renderTasks();

    });

});

// Initial Load
renderTasks();