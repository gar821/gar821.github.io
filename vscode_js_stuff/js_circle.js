const canvas= document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


function drawCircle(x,y){
ctx.fillStyle="red";
ctx.beginPath();
ctx.arc(x,y,25,0,2*Math.PI);
ctx.fill();
}

drawCircle(4,200)
drawCircle(99,20)
drawCircle(382,176)
drawCircle(189,389)