const text = document.querySelector("#text-field")
const btnAdd = document.querySelector("#btn-add")
const btnAll = document.querySelector("#btn-filter-all")
const btnDone = document.querySelector("#btn-filter-done")
const btnOpen = document.querySelector("#btn-filter-open")
const tasksList = document.querySelector("#tasks-list")
const tasks = []

btnAdd.disabled = true

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

    tasksList.classList.add("tasks")

    let textValue = text.value.trim().replace(/ +/g, " ")
    const id = textValue.trim().replace(/ /g, "-").toLowerCase()
    const taskItem = {
        id: id,
        title: textValue,
        done: false
    }

    tasks.push(taskItem)

    console.log(tasks);

    const newLi = document.createElement("li")
    newLi.taskObj = taskItem
    console.log(newLi.taskObj);
    newLi.setAttribute("id", id)
    tasksList.appendChild(newLi)

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("id", id+"-item")
    newLi.appendChild(checkbox)

    const label = document.createElement("label")
    label.setAttribute("for", id+"-item")
    const textNode = document.createTextNode(textValue)
    label.append(textNode)
    newLi.appendChild(label)

    text.value = ""
    btnAdd.disabled = true
})

tasksList.addEventListener("change", function(e) {
    const checked = e.target.checked
    const id = e.target.parentNode.id
    tasks.find(x => x.id === id).done = checked
})

function filterDone() {
    for (let i = 0; i < tasksList.children.length; i++) {
        const taskObj = tasksList.children[i].taskObj
        if (taskObj.done === false) {
            tasksList.children[i].hidden = true
        } else {
            tasksList.children[i].hidden = false
        }
    }
}

function filterAll() {
    for (let i = 0; i < tasksList.children.length; i++) {
        const taskObj = tasksList.children[i].taskObj
        if (tasksList.children[i].hidden === true) {
            tasksList.children[i].hidden = false
        }
    }
}

function filterOpen() {
    for (let i = 0; i < tasksList.children.length; i++) {
        const taskObj = tasksList.children[i].taskObj
        if (taskObj.done === false) {
            tasksList.children[i].hidden = false
        } else {
            tasksList.children[i].hidden = true
        }
    }
}

btnAll.addEventListener("click", filterAll)
btnDone.addEventListener("click", filterDone)
btnOpen.addEventListener("click", filterOpen)