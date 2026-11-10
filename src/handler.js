//HANDLES TASK MANAGEMENT
import {
  addTaskForm as taskForm,
  searchForm,
  popup,
  taskUL,
} from "./interaction";

export const taskStats = {
    completedElement: document.querySelector('header #completed'),
    totalElement: document.querySelector('header #total-tasks'),
}


let tasks = fetchTasks()
updateUI()



// Add Tasks to Array
function addTask() {

    const text = taskForm.querySelector("#taskInput").value.trim();
    if(!text || text.length <= 0) return;

    const task = {
        title: text,
        completed: false,
        dueDate: new Date()
    }

    tasks.push(task);
    saveTasks()
    updateUI()
    
   taskForm.querySelector("#taskInput").value = "";
}

// Listen for Submit and then Add task to Array
// taskForm.addEventListener("submit", () => {
//   if (!popup.classList.contains("hidden")) {
//     addTask();
//   }
// });

//Update the taskList UI from Array
function createTodoItem(task, index) {

  const title = task.title
  const li = document.createElement("li");


  if(task.completed){

    li.className = "task w-full will-change-transform px-4 py-2 border-b border-b-gray-200 text-[#27286e] hover:bg-gray-100/30 has-[input:checked]:text-gray-400 flex flex-row items-center justify-between rounded-2xl cursor-pointer group/delete-icon has-[:checked]:bg-gray-100 has-[:checked]:line-through transition-all duration-200"

  li.innerHTML = `<label
              for="task-${index + 1}"
              class="flex items-center group cursor-pointer"
            >
              <input
                type="checkbox"
                id="task-${index + 1}"
                class="peer sr-only cursor-pointer" checked
              />

              <!-- Custom CheckMark with SVG -->
              <div
                class="customCheckMark w-5 h-5 shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-2 peer-checked:bg-[#27286e] peer-checked:border-0 peer-checked:text-white peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-check preview-icon hidden group-has-[input:checked]:block"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <span
                class="taskText grow  font-bold hover:text- text-normal ml-3 select-none"
              >
            
              </span>
            </label>

            <!-- Delete Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash preview-icon ml-4 shrink-0 stroke-gray-300 hover:stroke-red-500 transition-colors duration-200 opacity-0 group-hover/delete-icon:opacity-100"
            >
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
         `;

         li.querySelector('.taskText').textContent = title

         const deleteIcon = li.querySelector('svg.lucide-trash')
         deleteIcon.addEventListener('click', () => {
             li.classList.add('swipe-out')
             li.addEventListener('transitionend', (event)=> {
                console.log(event)
                if(event.target === li && event.propertyName){
                    deleteTask(index)
                    taskStats.completedElement.textContent = `${taskUL.querySelectorAll('input:checked').length}`
                }
             })
            
         })
        
         return li

  }


  li.className = "task w-full will-change-transform px-4 py-2 border-b border-b-gray-200 text-[#27286e] hover:bg-gray-100/30 has-[input:checked]:text-gray-400 flex flex-row items-center justify-between rounded-2xl cursor-pointer group/delete-icon has-[:checked]:bg-gray-100 has-[:checked]:line-through transition-all duration-200"

  li.innerHTML = `<label
              for="task-${index + 1}"
              class="flex items-center group cursor-pointer"
            >
              <input
                type="checkbox"
                id="task-${index + 1}"
                class="peer sr-only cursor-pointer"
              />

              <!-- Custom CheckMark with SVG -->
              <div
                class="customCheckMark w-5 h-5 shrink-0 flex items-center justify-center rounded-full border-2 border-gray-300 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-2 peer-checked:bg-[#27286e] peer-checked:border-0 peer-checked:text-white peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-check preview-icon hidden group-has-[input:checked]:block"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <span
                class="taskText grow  font-bold hover:text- text-normal ml-3 select-none"
              >
            
              </span>
            </label>

            <!-- Delete Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash preview-icon ml-4 shrink-0 stroke-gray-300 hover:stroke-red-500 transition-colors duration-200 opacity-0 group-hover/delete-icon:opacity-100"
            >
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
         `;

         li.querySelector('.taskText').textContent = title

         const deleteIcon = li.querySelector('svg.lucide-trash')
         deleteIcon.addEventListener('click', () => {
             li.classList.add('swipe-out')
             li.addEventListener('transitionend', (event)=> {
                console.log(event)
                if(event.target === li && event.propertyName){
                    deleteTask(index)
                    taskStats.completedElement.textContent = `${taskUL.querySelectorAll('input:checked').length}`
                }
             })
            
         })
        
         return li
}


function updateUI(){
    document.querySelector('#taskList').innerHTML = "";
    Array.from(tasks).forEach( (task, index) => {
        const todoItem = createTodoItem(task, index)
        document.querySelector('#taskList').append(todoItem)
    })

    taskStats.totalElement.textContent = `${tasks.length}`
    taskStats.completedElement.textContent = `${tasks.filter( (task) => {
    return task.completed;
  }).length}`
    
}



function saveTasks(){
    const items = JSON.stringify(tasks)
    localStorage.setItem('tasks', items)
}



function fetchTasks(){
    try {
        const localTasks = JSON.parse(localStorage.getItem('tasks') || "[]")
        return Array.isArray(localTasks) ? localTasks : []
} catch {
        return []
    }
}


function deleteTask(itemIndex){
    tasks = tasks.filter( (_, index) => {
        return index !== itemIndex
    })
    saveTasks()
    updateUI()
}


function clearAll(){
    if(tasks.length === 0) return;
    if(!confirm('Do you want to delete all tasks?')) return;

    const items = taskUL.querySelectorAll('.task')
    const duration = 300
    const stagger = 300

    items.forEach((item, i) => {
        item.style.transition = `translate ${duration}ms ease-in ${i * stagger}ms, opacity ${duration}ms ease-in ${i * stagger}ms`
        item.classList.add("swipe-out")
        item.style.opacity = "0"
    })


    const totalTime = duration + (items.length - 1) * stagger


    setTimeout( () => {

        tasks = []
        saveTasks()
        updateUI()

    }, totalTime + 50)




   
}


export { addTask, clearAll, tasks, updateUI, saveTasks};
