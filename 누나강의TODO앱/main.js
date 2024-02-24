// 유저는 할일을 추가할 수 있다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete버튼을 누르면 할일이 삭제된다
// click버튼을 누르면 할일이 끝나면서 밑줄이간다.
// 1. click 버튼을 클릭하는 순간 true => false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

// 과제 1. 슬라이드 따라가게 만들기
// 과제 2. 진행중, 끝남탭, 삭제 바로되게 = ok~

let taskInput = document.getElementById('task-input')
let addButton = document.getElementById('add-button')
let taskList = []
let filterList = []
let tabs = document.querySelectorAll('.task-tabs div')
let mode = 'all'
let list = [] 

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener('click', function(event){
        filter(event)        
    })
}


addButton.addEventListener("click", addTask)

function addTask(){

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    render()
    console.log(taskList)
}

function render(){

    // 1. 내가 선택한 탭에 따라서
    if(mode === "all"){
    // all -> taskList
        list = taskList
    }else if(mode === "ongoing" || mode === "done"){
    // ongoing, done -> filterList
        list = filterList
    }
    console.log(list)
    // 2. 리스트를 달리보여준다.
    
    let resultHTML = "";
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                                <div class="task-done">${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')">Click</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`
        }else if(list[i].isComplete == false){
            resultHTML += `<div class="task">
                                <div>${list[i].taskContent}</div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')">Click</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`
        }
    }
    
    document.getElementById('task-board').innerHTML = resultHTML
}

function toggleComplete(id){    // id 버튼 누른후 실행되기때문에 onclick에서받아온것
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    render()
    console.log(taskList)    
}

function deleteTask(id){
    // all, 삭제
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            list.splice(i, 1)
            break;
        }
    }
    render()
    console.log(taskList)
}
// 전체, 진행중, 끝남 이벤트
function filter(event){
    mode = event.target.id
    filterList = []
    
    if(mode === "all"){
        //전체 아이템
        render()
    }else if(mode === "ongoing"){
        //진행중 아이템
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
        console.log("진행중", filterList)
    }else if(mode === "done"){
        //끝난 아이템
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

// 랜덤 id
function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

document.getElementsByClassName