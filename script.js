let tasks = [{
    title: 'First Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '2021-07-30'
}, {
    title: 'Second Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: false,
    dueDate: '2021-07-30'
}, {
    title: 'Third Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '2021-07-30'
}, {
    title: 'Fourth Task',
    description: '',
    done: false,
    dueDate: '2021-07-30'
}]

const tasksSectionElement = document.querySelector('.tasks')


function showTasks(task){
    const {title, description, done, dueDate} = task

    console.log(title);

    let descriptionElement = `<p class="task-description">${description}</p>`;
    let dueDateElement = `<span class="task-due-date">${dueDate}</span>`;
    let doneElement = `<label><input type="checkbox" name="done" ${done ? 'checked' : ''}>${title}</label>`

    let singleTask = `<div class="single-task">
        <div class="task-title">${doneElement}</div>
        ${dueDateElement}
        ${descriptionElement}
    </div>`
    hasMissedTask(dueDate)

    tasksSectionElement.innerHTML += singleTask
}
function hasMissedTask (dueDate){
    console.log(new Date(dueDate));
    let isOverdue = new Date(dueDate) < new Date()
     if (isOverdue) {
        return `<span class="task-due-date-overdue">${dueDate}</span>`
    } else {
        return `<span class="task-due-date">${dueDate}</span>`
    }
}

tasks.forEach(showTasks)
