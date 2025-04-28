const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let y = 0;
let dx = 5;
let dy = 1;

//we'll represent the player as an object
const player = {
    //variables use key:value pair syntax
    x:200,
    y:200,
    color:'green',
    speed:3
}

//this is also an object.
//we access values from this kind of object like this:
//keys['arrowup']
//every time a key is pressed or released, we'll update this object
//if a key is currently being pressed, that key will be set to true
//when released, false
const keys = {};

function drawPlayer(){
    //to access a variable from the player object
    //we uset his syntax:
    //player.x
    ctx.fillStyle = player.color
    ctx.beginPath();
    ctx.arc(
        player.x,player.y,
        20,0,2*Math.PI
    )
    ctx.fill();
}

function movePlayer(){
    if(keys['ArrowDown']){
        player.y += player.speed;
    }
    if(keys['ArrowUp']){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft']){
        player.x -= player.speed;
    }
    if(keys['ArrowRight']){
        player.x += player.speed;
    }
}


//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function animate() {
    drawRect(x,y);
    drawPlayer();
    movePlayer();

    // TODO: Add some code here 
    //  that will change the rectangle's position
x=x+dx;
y=y+dy

if(x > 350){
    dx=dx*-1;
}
if(x<0){
    dx=dx*-1
}
if(y>450){
    dy=dy*-1
}
if(y<0){
    dy=dy*-1
}
    requestAnimationFrame(animate);
}

/*
* Handle Keyboard
    To handle an event, we need two things:
        - event handler - does things because of the event
        - event listener - notices when an event happens
            , and calls the handler
*/

function handleKeyPress(e){
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);

//this is a shorthand way to 
//define & use a function at the same time. 
//We call this an "arrow function"
document.addEventListener('keyup', (e) =>{
    keys[e.key] = false;
});


//call our function
animate();