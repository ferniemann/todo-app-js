const text = document.querySelector("#text-field")
const btnAdd = document.querySelector("#btn-add")
const btnAll = document.querySelector("#btn-filter-all")
const btnDone = document.querySelector("#btn-filter-done")
const btnOpen = document.querySelector("#btn-filter-open")
const tasksList = document.querySelector("#tasks-list")
let tasks = []

btnAdd.disabled = true

function isChecked() {
    for (let i = 0; i< tasks.length; i++) {
        const id = tasks[i].id
        const checkbox = document.getElementById(id+"-item")
        const done = tasks[i].done
    
        if (done === true) {
            checkbox.setAttribute("checked", "checked")
        } else checkbox.removeAttribute("checked", "checked")
    }
}

text.addEventListener("input", function() {
    if (text.value.trim().replace(/ /g, "").length < 5) {
        btnAdd.disabled = true
    } else {
        btnAdd.disabled = false
    }
})

console.log(tasks);

btnAdd.addEventListener("click", function(e){
    e.preventDefault()

    tasksList.innerHTML = ""

    let textValue = text.value.trim().replace(/ +/g, " ")
    const id = textValue.trim().replace(/ /g, "-").toLowerCase()
    const taskItem = {
        id: id,
        title: textValue,
        done: false
    }

    tasks.push(taskItem)

    createTaskList()
    isChecked()

    text.value = ""
    btnAdd.disabled = true
    btnAll.classList.add("clicked")
    btnOpen.classList.remove("clicked")
    btnDone.classList.remove("clicked")
})

function createTaskList() {
    for (let i = 0; i < tasks.length; i++) {
        const title = tasks[i].title
        const id = title.trim().replace(/ /g, "-").toLowerCase()
        const newLi = document.createElement("li")
        newLi.setAttribute("id", id)
        tasksList.appendChild(newLi)

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", id+"-item")
        newLi.appendChild(checkbox)

        const label = document.createElement("label")
        label.setAttribute("for", id+"-item")
        const textContent = document.createTextNode(title)
        label.append(textContent)
        newLi.appendChild(label)
    }
}

tasksList.addEventListener("change", function(e) {
    const checked = e.target.checked
    const id = e.target.parentNode.id
    const checkbox = document.getElementById(id+"-item")
    tasks.find(x => x.id === id).done = checked

    if (tasks.find(x => x.id === id).done === true) {
        checkbox.setAttribute("checked", "checked")
    } else {
        checkbox.removeAttribute("checked", "checked")
    }
})

function filterDone() {
    btnAll.classList.remove("clicked")
    btnOpen.classList.remove("clicked")
    btnDone.classList.add("clicked")

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        title = task.title
        id = title.replace(/ /g, "-").toLowerCase()
        listElement = document.getElementById(id)
        listElement.hidden = false
        
        if (task.done === false) {
        listElement.hidden = true
        }
    }
}

function filterAll() {
    btnAll.classList.add("clicked")
    btnOpen.classList.remove("clicked")
    btnDone.classList.remove("clicked")

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        title = task.title
        id = title.replace(/ /g, "-").toLowerCase()
        listElement = document.getElementById(id)
        listElement.hidden = false
    }
}

function filterOpen() {
    btnAll.classList.remove("clicked")
    btnOpen.classList.add("clicked")
    btnDone.classList.remove("clicked")

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        title = task.title
        id = title.replace(/ /g, "-").toLowerCase()
        listElement = document.getElementById(id)
        listElement.hidden = false
        
        if (task.done === true) {
        listElement.hidden = true
        }
    }
}

btnAll.addEventListener("click", filterAll)
btnDone.addEventListener("click", filterDone)
btnOpen.addEventListener("click", filterOpen)