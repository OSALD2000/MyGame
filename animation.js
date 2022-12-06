const gameBoard = document.querySelector("#Mycan")
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const gameBG = "lightgreen";
const snakeColor = "red";
const snakeBorder = "black";
const foodColor = "orange";
const unitSize = 25;
let running = false;
let xGeschwindigkeit = unitSize;
let yGeschwindigkeit = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x :unitSize*4, y:0},
    {x :unitSize*3, y:0},
    {x :unitSize*2, y:0},
    {x :unitSize, y:0},
    {x :0, y:0}
];
let divOne = document.getElementById("btz1");
let divTwo = document.getElementById("btz2");
let imgOne = document.createElement("img");
let imgTow = document.createElement("img");

window.addEventListener("keydown", changeRichtung);
resetBtn.addEventListener("click", restGame);
gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    creatFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(() =>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            gameOver();
            nextTick();
        }, 100)
    } else {
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = gameBG;
    ctx.fillRect(0,0, gameWidth, gameHeight);
};
function creatFood(){
    function randomFood(min, max){
        const randNum = Math.round((((Math.random())* (max-min)+min)/unitSize))*unitSize
        return randNum;
    }
    foodX = randomFood(0, gameWidth-unitSize);
    foodY = randomFood(0, gameWidth-unitSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
    const head = {  x : snake[0].x + xGeschwindigkeit,
                    y : snake[0].y + yGeschwindigkeit};
        snake.unshift(head);

        // if food is eaten
        if(snake[0].x == foodX && snake[0].y == foodY){
            score+=1;
            scoreText.textContent=score;
            creatFood();
        }else {
            snake.pop();
        }

};
s
function drawSnake(){
    imgOne.src="Btyzk.jpg";
    ctx.fillStyle= snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.drawImage(imgOne,snakePart.x, snakePart.y , unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y , unitSize, unitSize)
    })

};

function changeRichtung(event){
    const keyPressed  = event.keyCode;
    const LINKS = 65;
    const RICHTS = 68;
    const UP = 87;
    const DOWN = 83;

    const goingUP= (yGeschwindigkeit == -unitSize);
    const goingDOWN= (yGeschwindigkeit == unitSize);
    const goingLINKS= (xGeschwindigkeit == -unitSize);
    const goingRICHTS= (xGeschwindigkeit == unitSize);

    switch(true){
        case( keyPressed == LINKS && !goingRICHTS):
        xGeschwindigkeit=-unitSize;
        yGeschwindigkeit=0;
        break;

        case( keyPressed == RICHTS && !goingLINKS):
        xGeschwindigkeit=unitSize;
        yGeschwindigkeit=0;
        break;

        case( keyPressed == UP && !goingDOWN):
        yGeschwindigkeit=-unitSize;
        xGeschwindigkeit=0;
        break;

        case( keyPressed == DOWN && !goingUP):
        yGeschwindigkeit=unitSize;
        xGeschwindigkeit=0;
        break;
    }
};

function gameOver(){

    switch(true){
        case (snake[0].x < 0):
            running=false
            break;

        case (snake[0].x >= gameWidth):
            running=false
            break;

        case (snake[0].y < 0):
            running=false
            break;

        case (snake[0].y >= gameHeight):
            running=false
            break;
    }

    for(let i = 1; i< snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running=false;
        }
    }

};

function displayGameOver(){
    ctx.font ="50px MV";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
    btyzak();
    running=false;
};

function restGame(){
    imgOne.width=0;
    imgTow.height=0;

    score=0;
    xGeschwindigkeit=unitSize;
    yGeschwindigkeit=0;
     snake = [
        {x :unitSize*4, y:0},
        {x :unitSize*3, y:0},
        {x :unitSize*2, y:0},
        {x :unitSize, y:0},
        {x :0, y:0}
    ];
    gameStart();
};

function btyzak(){
    imgOne.src="Btyzk.jpg";
    imgOne.width=500;
    imgOne.height=500;
    imgTow.src="Btyzk.jpg";
    imgTow.width=500;
    imgTow.height=500;
    divOne.appendChild(imgOne);
    divTwo.appendChild(imgTow);
    btzSou();
};

function btzSou(){
    let audioBT = document.getElementById("bt");
    audioBT.play();
}
