var myFish = ["a0", "a1", "a2"];

var fieldWidth = 400;
var fieldHeight = 400;
var speed = 100;

var movementInterval;

var cnt = 0;

var snake = [];
var food;

//var Segment = function(id, top, left, size){
 function Segment(id, top, left, size){
    switch(arguments.length) {
            case 0: id = "#segment";
            case 1: top = 100;
            case 2: left = 100;
            case 3: size = 20;
    }
    
    this.containerId = id;
    this.top = top;
    this.left = left;
    this.size = size;
    this.horizontalStep = size;
    this.verticalStep = 0;
}

//alert("hello world");

Segment.prototype.addDiv = function() {
//    alert("append arg: " + this.containerId);
    $("#playField").append("<div id = \"" + this.containerId + "\"></div>");    
}

Segment.prototype.removeDiv = function() {
    $("#"+this.containerId).remove();
}

Segment.prototype.draw =  function() {
//    console.log(segment.left);
//    alert("in the draw function: " + this.containerId);
    $("#"+this.containerId).css({
        position: "absolute",
        top: this.top + "px",
        left: this.left + "px",
        width: this.size + "px",
        height: this.size + "px",
        border: "1px solid black"
    });
}

snake.push(new Segment("segment0", 100, 100-0*20, 20));
snake.push(new Segment("segment1", 100, 100-1*20, 20));
snake.push(new Segment("segment2", 100, 100-2*20, 20));

for(cnt = 0; cnt < snake.length; cnt++){
    curSegment = snake[cnt];
    curSegment.addDiv();
    curSegment.draw();
}

$(document).ready(function(){
    drawPlayField(fieldWidth, fieldHeight);
    
    movementInterval = setInterval(startMovement, speed);
//    var addElementInterval = setInterval(addElement, 5*speed);
}); //end document ready function


function checkClash(segment1, segment2){
    return (segment1.left == segment2.left && segment1.top == segment2.top);
}

function addElement(){
    var lasElNum = snake.length;
    snake.push(new Segment("segment" + lasElNum, snake[0].top, snake[0].left, snake[0].size));
    snake[lasElNum].addDiv();
    snake[lasElNum].draw();
}

function calcNewCoordinates(){
    var prevLeft, prevTop, curLeft, curTop, newLeft, newTop;
    for(cnt = 0; cnt < snake.length; cnt++){
        if(cnt == 0) {
            curLeft = snake[cnt].left;
            curTop = snake[cnt].top;
            
            newLeft = curLeft + snake[cnt].horizontalStep;
            newTop = curTop + snake[cnt].verticalStep;
            
            
            if(newLeft > fieldWidth - snake[cnt].size){
                newLeft = 0;
            } else if(newLeft < 0){
                newLeft = fieldWidth - snake[cnt].size;
            }
        
            if(newTop > fieldHeight - snake[cnt].size){
                newTop = 0;
            } else if(newTop < 0){
                newTop = fieldHeight - snake[cnt].size;
            }       
            snake[cnt].left = newLeft;
            snake[cnt].top = newTop;
            
        } else {
            prevLeft = curLeft;
            prevTop = curTop;
            
            curLeft = snake[cnt].left;
            curTop = snake[cnt].top;
            
            snake[cnt].left = prevLeft;
            snake[cnt].top = prevTop;
        }
    }
}


function addFood() {
    var clash = true;
    
//    regenerate food until it doesn't hit snake body
    while(clash) {
        clash = false;
        food = new Segment("food0", Math.round(Math.random()*19)*20, Math.round(Math.random()*19)*20, 20);
        for(cnt = 0; cnt < snake.length; cnt++){
            if(checkClash(food, snake[cnt])){
                clash = true;
            }
        }
    }
    
    food.addDiv();
    food.draw();    
}

function startMovement(){
    calcNewCoordinates();
    for(cnt = 0; cnt < snake.length; cnt++ ){
        snake[cnt].draw();
    }
    
//    check if the food is on the field
    if (!$('#food0').length){ /*no food is on the field - add new piece of food*/
        addFood();        
    }
    
    if(checkClash(food, snake[0])){
        food.removeDiv();
        addFood();
        addElement();
//        $("#tmp").text("food is still there");
    } else {
//        $("#tmp").text("food is still there");
    }
}


$(document).keydown(function(event){
//    left: 37, up: 38, right: 39, down: 40
    switch (event.which){
            case 37: //left
                snake[0].horizontalStep = -snake[0].size;
                snake[0].verticalStep = 0;
                break;
            case 38: //up
                snake[0].horizontalStep = 0;
                snake[0].verticalStep = -snake[0].size;
                break;
            case 39: //right
                snake[0].horizontalStep = snake[0].size;
                snake[0].verticalStep = 0;
                break;
            case 40: //down
                snake[0].horizontalStep = 0;
                snake[0].verticalStep = snake[0].size;
                break;
            case 32:  //spaceBar pressed
                if(movementInterval){
                    clearInterval(movementInterval);
                    movementInterval = false;
                } else {
                    movementInterval = setInterval(startMovement, speed);
                }
//                snake[0].horizontalStep = 0;
//                snake[0].verticalStep = 0;
                break;                
            default: 

//                console.log("initial array: ") + myFish.toString();
//                myFish.splice(0,0,"newElement1");
//                myFish.splice(myFish.length-1,1);
//                console.log(event.which);
    }
})



//<div id = "segment" style="position: relative; top: 50px; left: 50px; border: 1px solid black; width: 50px; height: 50px"></div>    

//function drawSnake(){
//    
//}

function drawPlayField(fieldWidth, fieldHeight){
    $("#playField").css({
        position: "relative",
        width: fieldWidth,
        height: fieldHeight,
        border: "1px solid black"
    });
} //end of drawPlayField function