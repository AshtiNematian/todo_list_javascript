let TaskID = 0
function UnloadStorage() {
    let TaskList = document.getElementById("TaskList");
    localStorage.setItem("TaskCount", 0)
}

function LoadStorage() {
    let TaskList = document.getElementById("TaskList")
    let TaskCount = localStorage.getItem("TaskCount")
    if (TaskCount != 0) {
        for(let i = 0; i < TaskCount; i++) {
            let CTask = localStorage.getItem("Task"+i)
            let TaskList = document.getElementById("TaskList");
            let AddTask = "<tr id=\""+i+"\" class=\"TaskInform\"><td>"+CTask+"</td><td><button class=\"btn btn-close btn-outline-warning\" onclick=\"RemoveTask()\"/></td></tr>";
            TaskID+=1
            TaskList.innerHTML += AddTask;
        }
    }
    //TaskList.innerHTML = localStorage.getItem("LatestData")
}

function InsertTask() {
    let CurrentCount = eval(localStorage.getItem("TaskCount") == ""?0:localStorage.getItem("TaskCount"))
    for (let EmptyTask = 0 ; EmptyTask <= CurrentCount; EmptyTask++)
        if (localStorage.getItem("Task"+EmptyTask) == "")
            TaskID++
    let NewTask = document.getElementById("NewTaskInput");
    if (NewTask.value == "")
        alert("لطفا نام تسک را وارد کنید.")
    else {
        let TaskList = document.getElementById("TaskList");
        let AddTask = "<tr id=\""+TaskID+"\" class=\"TaskInform\"><td>"+NewTask.value+"</td><td><button class=\"btn btn-close btn-outline-warning\" onclick=\"RemoveTask()\"/></td></tr>";
        TaskID+=1
        TaskList.innerHTML += AddTask;
        localStorage.setItem("TaskCount", (CurrentCount + 1))
        localStorage.setItem("Task"+((CurrentCount==null)?0:CurrentCount), NewTask.value)
        NewTask.value = ""
    }
}

function RemoveTask() {
    let CurrentCount = eval(localStorage.getItem("TaskCount") == ""?0:localStorage.getItem("TaskCount"))
    let CloserTarget = event.target || event.srcElement
    let CloseIt = CloserTarget.parentElement.parentElement
    for (let i = (eval(CloseIt.id) + 1); i < eval(CurrentCount); i++)
        localStorage.setItem(("Task" + eval(i-1)), localStorage.getItem("Task" + i))
    localStorage.removeItem("Task"+(eval(localStorage.getItem("TaskCount"))-1))
    let MustRemove = document.getElementById(CloseIt.id).remove()

    localStorage.setItem("TaskCount", (CurrentCount - 1))

    //TaskList.innerHTML.replace(CloseIt.outerHTML, "")
    //UnloadStorage()
}

function ClearAll() {
    // let AllTask = document.getElementsByClassName("TaskInform")
    // for (let i = 0; i <= AllTask.length; i++)
    //     AllTask[i].remove()
    setTimeout(()=> {
        let TaskList = document.getElementById("TaskList")
        TaskList.innerHTML = ""
    }, 1000)
    localStorage.clear()

}