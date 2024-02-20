// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼 클릭
// 만약 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 up!!
// Rest버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다. (버튼 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

// 호출
let randomNum = 0;
let goButton = document.getElementById('go-button')
let userInput = document.getElementById('user-input')
let textContext = document.getElementById('text-context')
let resetButton = document.getElementById('reset-button')
let chance = document.getElementById('chance-area')
let chances = 5;
let gameOver = false
let history = []

// 이벤트 리스너
resetButton.addEventListener('click', reset)
goButton.addEventListener('click', go)
userInput.addEventListener('focus', function(){value=""})

function randomMath(){
    randomNum = Math.floor(Math.random() * 100) + 1;
    // random 번호출력
    console.log("정답", randomNum);
}
randomMath();

function go(){
    let userValue = userInput.value

    if(userValue < 0 || userValue > 100){
        textContext.textContent = '1에서부터 100사이의 숫자만 입력해주세요'
        return
    }

    if(history.includes(userValue)){
        textContext.textContent = '이미 사용한 번호입니다.'
        return
    }

    chances -- ;
    chance.textContent = `남은기회:${chances}번`
    
    console.log("chances", chances);

    // 사용자가 입력한 번호 출력
    if(userValue < randomNum){
        textContext.textContent = 'UP!!!'
    }else if(userValue > randomNum){
        textContext.textContent = 'DOWN!!!'
    }else{
        textContext.textContent = '정답입니다!!!'
    }

    history.push(userValue)
    
    if(chances < 1){
        gameOver = true
    }

    if(gameOver == true){
        goButton.disabled = true;
    }
}


function reset(){
    userInput.value = "";
    goButton.disabled = false;
    randomMath()
    textContext.textContent = "결과값이 여기 나옵니다."
}






