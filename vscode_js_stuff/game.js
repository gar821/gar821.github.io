const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let currentState = "startScreen"; // tracks the current state of the game
let songStartTime = null; // Track when the song starts
const audio = new Audio('beethovenVirus.mp3'); // Load the music

// Event listener for when the song ends
audio.addEventListener("ended", () => {
    currentState = "youWin"; // Transition to u win state when the song ends
});

function drawStartScreen() { // Start screen with:
    drawBackground();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.fillText("Rhythm Game", 400 / 2, 200); // title,

    ctx.font = "20px Arial";
    ctx.fillText("Click to Start", 400 / 2, 300); // and instructions

    ctx.font = "20px Arial";
    ctx.fillText("Press Keys D, F, J, K", 400 / 2, 500); // instructions
}

canvas.addEventListener("mousedown", () => {
    if (currentState === "startScreen") {
        currentState = "gameplay"; // Transition to gameplay
        startSong(); // Start the song
    }
});

// Function to start the song
function startSong() {
    songStartTime = Date.now(); // Record the start time of the song
    audio.play(); // Play the music
}

// Draw game based on the current state
function animate() {
    ctx.clearRect(0, 0, 400, 600);

    if (currentState === "startScreen") {
        drawStartScreen();
    } else if (currentState === "gameplay") {
        drawBackground();
        drawTargets();
        drawNotes();
        drawScore();
        drawMisses();
        updateNotes();
    } else if (currentState === "youWin") {
        drawYouWinScreen(); // Draw You Win screen
    }

    requestAnimationFrame(animate);
}

function drawBackground() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 400, 600);
}

// Target
const targetRadius = 30;
const targetY = 50;
const targets = [
    { x: 50, color: "rgba(255, 99, 71, 1)", key: "d" },
    { x: 150, color: "rgba(30, 144, 255, 1)", key: "f" },
    { x: 250, color: "rgba(50, 205, 50, 1)", key: "j" },
    { x: 350, color: "rgba(255, 215, 0, 1)", key: "k" },
];

// Track currently pressed keys
let keyDownState = {};

// Draw targets
function drawTargets() {
    targets.forEach((target) => {
        ctx.beginPath();
        ctx.arc(target.x, targetY, targetRadius, 0, Math.PI * 2);

        // Change color dynamically based on key press
        let color = keyDownState[target.key] ? target.color : "gray"; // Default to gray if not pressed
        ctx.fillStyle = color;
        ctx.fill();
    });
}

const noteRadius = targetRadius;
let notes = [
    { x: 50, y: 550, color: "rgba(255, 99, 71, 1)", key: "d" },
    { x: 150, y: 500, color: "rgba(30, 144, 255, 1)", key: "f" },
    { x: 250, y: 450, color: "rgba(50, 205, 50, 1)", key: "j" },
    { x: 350, y: 400, color: "rgba(255, 215, 0, 1)", key: "k" },
];

let score = 0;
let misses = 0;

function drawNotes() {
    notes.forEach((note) => {
        ctx.beginPath();
        ctx.arc(note.x, note.y, noteRadius, 0, Math.PI * 2);
        ctx.fillStyle = note.color;
        ctx.fill();
    });
}

function updateNotes() {
    notes = notes.filter((note) => {
        if (note.y < 0 - noteRadius) { // Check if note goes above the top,
            misses++;
            return false; // Remove missed note
        }
        note.y -= 6; // Move the note up
        return true; // Keep the note if it's not missed
    });
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 50, 30);
}

function drawMisses() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Misses: " + misses, 350, 30); // Display misses at the top right
}

function drawYouWinScreen() { // You Win screen
    drawBackground();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.fillText("You Win!", 400 / 2, 200); // Display "You Win" message

    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 400 / 2, 280); // Display score
    ctx.fillText("Misses: " + misses, 400 / 2, 320); // Display misses
    ctx.fillText("Thank you for playing!", 400 / 2, 400); // End message
}

let keyToX = {
    d: 50,
    f: 150,
    j: 250,
    k: 350,
};

document.addEventListener("keydown", (event) => {
    const keyPressed = event.key.toLowerCase();
    keyDownState[keyPressed] = true; // Mark key as pressed

    let xPosition = keyToX[keyPressed]; // Get x pos for the pressed key
    if (xPosition !== undefined) { // Make sure it's valid
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

document.addEventListener("keyup", (event) => {
    const keyReleased = event.key.toLowerCase();
    keyDownState[keyReleased] = false; // Mark key as released
});

animate();