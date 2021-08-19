let tasks = [{
    title: 'First Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '30/08/2020'
}, {
    title: 'Second Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: false,
    dueDate: '30/08/2020'
}, {
    title: 'Third Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: true,
    dueDate: '30/08/2020'
}, {
    title: 'Fourth Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: false,
    dueDate: '30/08/2020'
}]

const tasksSectionElement = document.querySelector('.tasks')


function showTasks(task){
    const {title, description, done, dueDate} = task

    console.log(title);

    let titleElement = `<h2 class="task-title">${title}</h2>`;
    let doneElement = `<div class="task-done"> ${showCheckbox(done)}</div>`;
    let descriptionElement = `<p class="task-description">${description}</p>`;
    let dueDateElement = `<p class="task-due-date">Planned for ${dueDate}</p>`;

    let singleTask = `<div class="single-task">
        ${titleElement}
        ${doneElement}
        ${descriptionElement}
        ${dueDateElement}
    </div>`

    tasksSectionElement.innerHTML += singleTask
}
function showCheckbox(done) {
    let checked = `<input type="checkbox" id="tasks-checkbox-done" name="done" checked>
    <label for="done">Done</label>`
    let notChecked = `<input type="checkbox" id="tasks-checkbox-done" name="done">
    <label for="done">Done</label>`
    return done ? checked : notChecked 
}

tasks.forEach(showTasks)
