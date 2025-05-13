const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawBackground() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 400, 600);
}
//target
const targetRadius = 30;
const targetY = 50;
const targets = [
    { x: 50, color: "rgba(255, 99, 71, 1)", key: "a" },
    { x: 150, color: "rgba(30, 144, 255, 1)", key: "s" },
    { x: 250, color: "rgba(50, 205, 50, 1)", key: "d" },
    { x: 350, color: "rgba(255, 215, 0, 1)", key: "f" },
];
//drawtarget
function drawTargets() {
    targets.forEach((target) => {
        ctx.beginPath();
        ctx.arc(target.x, targetY, targetRadius, 0, Math.PI * 2);
        ctx.fillStyle = target.color;
        ctx.fill();
    });
}

const noteRadius = targetRadius;
let notes = [
    { x: 50, y: 550, color: "rgba(255, 99, 71, 1)", key: "a" },
    { x: 150, y: 500, color: "rgba(30, 144, 255, 1)", key: "s" },
    { x: 250, y: 450, color: "rgba(50, 205, 50, 1)", key: "d" },
    { x: 350, y: 400, color: "rgba(255, 215, 0, 1)", key: "f" },
];

let score = 0;

function drawNotes() {
    notes.forEach((note) => {
        ctx.beginPath();
        ctx.arc(note.x, note.y, noteRadius, 0, Math.PI * 2);
        ctx.fillStyle = note.color;
        ctx.fill();
    });
}

function updateNotes() {
    notes.forEach((note) => {
        note.y -= 2; // Move each note up
    });
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 10, 30);
}

let keyToX = {
    a: 50,
    s: 150,
    d: 250,
    f: 350,
};

document.addEventListener("keydown", (event) => {
    const keyPressed = event.key.toLowerCase();

    let xPosition = keyToX[keyPressed]; // Get x pos for the pressed key
    if (xPosition !== undefined) { //make sure its valid
        for (let i = 0; i < notes.length; i++) {
            let note = notes[i];

            // Check if the note matches the x-position and is near the target
            if (
                note.x === xPosition &&
                note.y <= targetY + targetRadius &&
                note.y >= targetY - targetRadius
            ) {
                console.log("Hit detected for note at x =", note.x);

                score++; // Increase score
                notes.splice(i, 1); // Remove the note
                break; // Stop after the first hit
            }
        }
    }
});

function animate() {
    ctx.clearRect(0, 0, 400, 600);

    drawBackground();
    drawTargets();
    drawNotes();
    drawScore();

    updateNotes();
    requestAnimationFrame(animate);
}

animate();