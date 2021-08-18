let tasks = [{
    title: 'First Task',
    description: '',
    done: false,
    dueDate: ''
}, {
    title: 'Second Task',
    description: '',
    done: false,
    dueDate: ''
}, {
    title: 'Third Task',
    description: '',
    done: false,
    dueDate: ''
}, {
    title: 'Fourth Task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis, nulla ac posuere ullamcorper, lectus metus commodo libero, id pulvinar est turpis non mi.',
    done: false,
    dueDate: '2021-08-30'
}]

const titleElement = document.querySelector('.task-title');
const descriptionElement = document.querySelector('.task-description');
const doneElement = document.querySelector('.task-done')
const dueDateElement = document.querySelector('.task-due-date')

function showTasks(task){
    const {title, description, done, dueDate} = task
    console.log(title);
    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    doneElement.innerHTML = showCheckbox() ;
    dueDateElement.innerHTML = dueDate;
}
function showCheckbox(done) {
    let checked = `<input type="checkbox" id="tasks-checkbox-done" name="done" checked>
    <label for="done">Done</label>`
    let notChecked = `<input type="checkbox" id="tasks-checkbox-done" name="done">
    <label for="done">Done</label>`
    return done ? checked : notChecked 
}

tasks.forEach(showTasks)
