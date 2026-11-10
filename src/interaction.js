//UI INTERACTIONS GO HERE

import { addTask, clearAll, taskStats, tasks as tasksData, updateUI, saveTasks} from "./handler";

const clearAllBtn = document.querySelector("button.clear-all")
const addTaskBtn = document.querySelector("#addTaskBtn");
const popup = document.querySelector("#popup");
const tasks = document.querySelectorAll(".task");
const addTaskForm = document.querySelector("#addTaskForm");
const searchForm = document.querySelector("#searchForm");
// const deleteBtns = document.querySelectorAll("svg.lucide-trash");
const taskUL = document.querySelector("ul#taskList");

// console.log(checkboxes)



//Hide and Show AddTask Section
addTaskBtn.addEventListener("click", () => {
  popup.classList.toggle("hidden");
  addTaskBtn.classList.toggle("rotate-45");
  addTaskForm.querySelector("#taskInput").value = "";
  addTaskForm.querySelector("#taskInput").focus();
});



//Show AddTask Section onSpaceKey
document.addEventListener("keyup", (event) => {
 // Escape works everywhere, even inside inputs
  if (!popup.classList.contains("hidden") && event.key === "Escape") {
    popup.classList.add("hidden");
    addTaskBtn.classList.remove("rotate-45");
    addTaskForm.querySelector("#taskInput").value = "";
    addTaskForm.querySelector("#taskInput").blur();
    return;
  }

  // Space shortcut should not fire while typing
  if (event.target.matches("input, textarea")) return;



  if (popup.classList.contains("hidden") && event.key === " ") {
    popup.classList.remove("hidden");
    addTaskBtn.classList.add("rotate-45");
    addTaskForm.querySelector("#taskInput").focus();
  }
  
});



//Hide the AddTask Section if other elements are clicked
document.addEventListener("click", (event) => {
  if (
    !popup.classList.contains("hidden") &&
    !popup.contains(event.target) &&
    !addTaskBtn.contains(event.target)
  ) {
    popup.classList.add("hidden");
    addTaskBtn.classList.toggle("rotate-45");
  }
});



taskUL.addEventListener('click', (event) => {
    const trash = event.target.closest(".lucide-trash")
    const li = event.target.closest("li.task")

    if(!li) return
    if(trash)return

    if(event.target.closest('label')) return;

    const checkbox = li.querySelector('input[type="checkbox"]')
    checkbox.checked = !checkbox.checked
    checkbox.dispatchEvent(new Event('change', {bubbles: true}))

})

clearAllBtn.addEventListener('click', clearAll)




// taskUL.addEventListener('change', (event) => {
//     if(event.target.matches('input[type="checkbox"]')) return;
//     const li = event.target.closest('li.task')
//     li.classList.toggle('bg-gray-100', event.target.checked)
//     li.classList.toggle('line-through', event.target.checked)
// })




// Prevent Defualt Submit on all input fields and forms
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});





taskUL.addEventListener('change', (event) => {

  const task = event.target.closest('input[type=checkbox')
   const taskID = Number(task.id.split("-")[1]) - 1

  if(task.checked){

   tasksData[taskID].completed = true;
    
  } else {
    tasksData[taskID].completed = false;
  }

  saveTasks()
  updateUI()

})

export { addTaskForm, searchForm, popup, taskUL  };
