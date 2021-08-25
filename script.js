const tasksSectionElement = document.querySelector('.tasks')
const stateElement = document.getElementById('state')
const tasksEndpoint = 'http://localhost:3000/tasks'

let taskForm = document.forms['tasks-input']

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(taskForm); 
    const taskRaw = Object.fromEntries(formData.entries())
    getTasks()
        .then(tas)
    let task  = {
        id: genId(),
        ...taskRaw,
        done: false,
        dueDate: new Date(taskRaw.dueDate)
    }
    showAll()
    taskForm.reset()
})

function createTask(task) {
    const { title, description, done, dueDate } = task

    const singleTask = document.createElement('div')
    singleTask.classList.add('single-task')
    singleTask.append(
        createHeading(done, title),
        createDueDate(dueDate, done),
        createDescription(description),
        createDeleteBtn()
    )
    singleTask.id = task.id;

    tasksSectionElement.appendChild(singleTask)
    return singleTask
}

let createHeading = (done, titleText) => {
    let heading = document.createElement('div')
    heading.classList.add('task-title')
    heading.append(createCheckbox(done),createTitle(done, titleText))
    return heading
}

let createCheckbox = (done) => {
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = 'done'
    if (done) {
        checkbox.setAttribute('checked', true)
    }
    checkbox.onclick = changeStatus
    return checkbox
}

let createTitle = (done, titleText) => {
    let title = document.createElement('label')
    if (done) {
        title.classList.toggle('task-overdue')
    }
    title.innerHTML += titleText
    return title
}

let createDescription = (descriptionText) => {
    let description = document.createElement('p')
    description.classList.add('task-description')
    description.innerHTML = descriptionText

    return description
}

let createDueDate = (date, done) => {
    let dueDate = document.createElement('p')

    dueDate.innerHTML = new Date(date).toLocaleDateString('uk')

    let isOverdue = new Date(date) < new Date()
    if (isOverdue && !done) {
        dueDate.classList.add('task-due-date-overdue')
    }
    return dueDate
}

let createDeleteBtn = () => {
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.onclick = deleteTask
    return deleteBtn
}

function deleteTask() {
    let singleTask = this.parentNode
    getCurrentTask(singleTask)
        .then(currenTask => {
            fetchWrapper(`${tasksEndpoint}/${currenTask.id}`, 'DELETE', currenTask)
                .then(() => singleTask.remove())
        })
}

function changeStatus () {
    let singleTaskDiv = this.parentNode.parentNode
    getCurrentTask(singleTaskDiv)
        .then(currentTask => {
            fetchWrapper(`${tasksEndpoint}/${currentTask.id}`, 'PATCH', {done: !currentTask.done})
                .then(task => {
                    if (stateElement.innerText === 'All tasks') {
                        singleTaskDiv.parentNode.replaceChild(createTask(task), singleTaskDiv)                    
                    } else {
                        singleTaskDiv.remove()
                    } 
                })

        })
}

function showFinnishedTasks() {
    tasksSectionElement.replaceChildren()
    stateElement.innerHTML = 'Finnished tasks'
    getTasks()
        .then(tasks => {
            tasks.forEach(task => {
                if(task.done){
                    createTask(task)
                }
            })
        })
}

function showAll() {
    tasksSectionElement.replaceChildren()
    stateElement.innerHTML = 'All tasks'

    getTasks()
        .then(tasks => tasks.forEach(createTask))
}

function fetchWrapper(path, method, task){
    return fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(res => res.json())
}

function getTasks() {
    return fetch(tasksEndpoint)
        .then(res => res.json())
}
function getCurrentTask(singleTask) {
     return getTasks()
        .then(tasks => tasks.find(task => task.id === +singleTask.id))
}
showAll()



