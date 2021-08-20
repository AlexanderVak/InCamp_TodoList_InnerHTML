const tasks = [{
    id:1,
    title: 'First Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '2021-07-30'
}, {
    id:2,
    title: 'Second Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: false,
    dueDate: '2021-07-30'
}, {
    id:3,
    title: 'Third Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '2021-07-30'
}, {
    id:4,
    title: 'Fourth Task',
    description: '',
    done: false,
    dueDate: '2021-07-30'
}]

const tasksSectionElement = document.querySelector('.tasks')
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

let createTitle = (done, titleText) => {

    let title = document.createElement('label')
    if (done) {
        title.classList.toggle('task-overdue')
    }

    title.innerHTML += titleText
    return title
}

function deleteTask() {
    let singleTask = this.parentNode
    let currentTaskId = tasks.findIndex(task => task.id === +singleTask.id)
    tasks.splice(currentTaskId, 1)
    singleTask.remove()    
}

let createDeleteBtn = () => {
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.onclick = deleteTask
    return deleteBtn
}
function changeStatus () {
    let singleTaskDiv = this.parentNode.parentNode
    // console.log(taskTitleDiv)
    // console.log(singleTaskDiv.parentNode);
    let currentTask = tasks.find(task => task.id === +singleTaskDiv.id)
    currentTask.done = !currentTask.done
    singleTaskDiv.parentNode.replaceChild(createTask(currentTask), singleTaskDiv)
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

let createDescription = (descriptionText) => {
    let description = document.createElement('p')
    description.classList.add('task-description')
    description.innerHTML = descriptionText

    return description
}

let createDueDate = (date, done) => {
    let dueDate = document.createElement('p')
    dueDate.innerHTML = date

    let isOverdue = new Date(date) < new Date()
    if (isOverdue && !done) {
        dueDate.classList.add('task-due-date-overdue')
    }
    return dueDate
}

tasks.forEach(createTask)
