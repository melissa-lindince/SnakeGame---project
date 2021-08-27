let direction = {x:0, y:0}
let speed = 5
let lasPaintTime = 0
let snakePosition = [{x:10, y:10}]
let foodPosition = {x:8, y:8}


function main(time) {
    window.requestAnimationFrame(main)

    if((time - lasPaintTime)/1500 < 1 / speed) {
        return 
    }
    lasPaintTime = time
    updateSnakeLength()
   
}

function drawSnakeAndTail() {
    board.innerHTML = "";
    snakePosition.forEach((event, index)=>{
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = event.y
        snakeElement.style.gridColumnStart = event.x

        if(index === 0) {
            snakeElement.classList.add('snake')
        }else{
            snakeElement.classList.add('tail')
        }
        
        board.appendChild(snakeElement)
    });
    drawFood()
}

function drawFood() {
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = foodPosition.y
    foodElement.style.gridColumnStart = foodPosition.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

function movingTheSnake() {
    

    snakePosition[0].x += direction.x
    snakePosition[0].y += direction.y

}

function updateSnakeLength() {
    restartGame()

    if(snakePosition[0].y === foodPosition.y && snakePosition[0].x === foodPosition.x) {
        snakePosition.unshift({x:snakePosition[0].x + direction.x, y:snakePosition[0].y + direction.y})
        
        updateFoodPosition()
    }
    movingTheSnake()

}

function updateFoodPosition() {
    
    foodPosition = {
    x:Math.floor(14 + (2)*Math.random()), 
    y:Math.floor(14 + (2)*Math.random())}
}

function collision(tail) {
    // If bump into yourself
    for(let i = 1; i < snakePosition.length; i++) {
        if(tail[i].x === tail[0].x && tail[i].y === tail[0].y){
        return true
        }
    }
    //if hit the wall
    if(tail[0].x >= 18 || tail[0].x <= 0 || tail[0].y >= 18 || tail[0].y <= 0) {
        return true
    }
    return false
}

function restartGame() {
    if(collision(snakePosition)) {
        direction = {x:0, y:0}
        alert("Game Over")
        snakePosition = [{x:10,y:10}]
        score = 0
    }
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', event => {
    direction = {x: 0, y: 1}

    if(event.keyCode == 38 || event.keyCode == 87) {
        direction.x = 0
        direction.y = -1
    }else if(event.keyCode == 40 || event.keyCode == 83) {
        direction.x = 0
        direction.y = 1
    }else if(event.keyCode == 37 || event.keyCode == 65) {
        direction.x = -1
        direction.y = 0
    }else if(event.keyCode == 39 || event.keyCode == 68) {
        direction.x = 1
        direction.y = 0
    }
})
