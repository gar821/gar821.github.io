const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawBackground(){
    ctx.fillStyle= "Gray";
    ctx.fillRect(0,0,400,600);
}

const targetRadius=30;
const targetY=50;
const targets = [
    { x: 50, color: 'rgba(255, 99, 71, 1)' }, // bright red
    { x: 150, color: 'rgba(30, 144, 255, 1)' }, // bright blue
    { x: 250, color: 'rgba(50, 205, 50, 1)' }, // bright green
    { x: 350, color: 'rgba(255, 215, 0, 1)' }  // bright yellow
];
function drawTargets(){
    targets.forEach(target => {
      ctx.beginPath();
      ctx.arc(target.x,targetY,targetRadius,0,Math.PI*2); // circle
      ctx.fillStyle = target.color; //color
      ctx.fill();
    });
}

const noteRadius = targetRadius; //matching
let notes = [
    { x: 50, y:550, color: 'rgba(255, 99, 71, 1)' }, //  red note
    { x: 150, y:500, color: 'rgba(30, 144, 255, 1)' }, //  blue note
    { x: 250, y:450, color: 'rgba(50, 205, 50, 1)' }, //  green note
    { x: 350, y:400, color: 'rgba(255, 215, 0, 1)' }  //  yellow note
];
function drawNotes() {
    notes.forEach(note=>{
        ctx.beginPath();
        ctx.arc(note.x,note.y,noteRadius,0,Math.PI*2); //circle
        ctx.fillStyle = note.color;
        ctx.fill();
    });
}

function updateNotes(){
    notes.forEach(note=>{
        note.y -=2; //move each note up by 2 px
    });
}

function animate(){ // every 1/60 sec
    ctx.clearRect(0,0,400,600);

    drawBackground();
    drawTargets();
    drawNotes();

    updateNotes();
    requestAnimationFrame(animate);
}
animate();