let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')

window.addEventListener('keydown', event => {
    moveSound.play()
    if(event.keyCode == 38 || event.keyCode == 87) direction.x = 0, direction.y = -1
    if(event.keyCode == 40 || event.keyCode == 83) direction.x = 0, direction.y = 1
    if(event.keyCode == 37 || event.keyCode == 65) direction.x = -1, direction.y = 0
    if(event.keyCode == 39 || event.keyCode == 68) direction.x = 1, direction.y = 0 
})

setInterval(game, 100)

//Sound
const foodSound = new Audio('sound/foodSound.mp3')
const moveSound = new Audio('sound/moveSound.mp3')
const music = new Audio('sound/startMusic.mp3')


let snake = []
let positionX = 0
let positionY = 0
let foodX = 5
let foodY = 5
let direction = {x:0, y:0}
let grid = 32
let tailLength = 1

function game() {
    contextBackground()
    updateFoodPosition()
    updateTail()
    music.play()
}

function contextBackground() {
    context.fillStyle = "#14181b"
    context.fillRect(0,0, canvas.width, canvas.height)
}

function drawFood() {
    context.fillStyle = "white"
    context.fillRect(foodX * grid, foodY * grid, grid-1, grid-1)
}

function updateFoodPosition() {
    drawFood()
    if(positionX == foodX && positionY == foodY) {
        tailLength++
        foodSound.play()
        foodX = Math.floor(Math.random()*16)
        foodY =  Math.floor(Math.random()*16)
    }
}

function drawSnake() {
    snake.push({x:positionX, y:positionY})
    context.fillStyle = "blue"
    for(let i = 0; i < snake.length; i++) {
        context.fillRect(snake[i].x *grid, snake[i].y * grid, grid-1, grid-1)
    }
}

function updateSnakePosition() {
    drawSnake()
    positionX += direction.x
    positionY += direction.y

    console.log(positionX)
    if(positionX < 0 || positionX > 15) positionX = 0
    if(positionY < 0 || positionY > 15 ) positionY = 0
}

function updateTail() {
    updateSnakePosition()
    while(snake.length > tailLength) {
        snake.shift()
    }
}












