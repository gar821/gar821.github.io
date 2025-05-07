const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawBackground(){
    ctx.fillStyle= "Gray";
    ctx.fillRect(0,0,400,600);
}
drawBackground();

const targetRadius=30;
const targetY=50;
const targets = [
    { x: 50, color: 'rgba(255, 99, 71, 1)' }, // bright red
    { x: 150, color: 'rgba(30, 144, 255, 1)' }, // bright blue
    { x: 250, color: 'rgba(50, 205, 50, 1)' }, // bright green
    { x: 350, color: 'rgba(255, 215, 0, 1)' }  // bright yellow
];
