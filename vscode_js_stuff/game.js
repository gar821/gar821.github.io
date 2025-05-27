const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let currentState = "startScreen"; // Tracks the current state of the game
let songStartTime = null; // Tracks when the song starts
const noteStartDelay = 5500; // delay for notes to start 
const audio = new Audio('beethovenVirus.mp3'); // Load the music

// Event listener for when the song ends
audio.addEventListener("ended", () => {
    currentState = "youWin"; // Transition to You Win state when the song ends
});

function drawStartScreen() { // Start screen with:
    drawBackground();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.fillText("Rhythm Game", 400 / 2, 200); // Title

    ctx.font = "20px Arial";
    ctx.fillText("Click to Start", 400 / 2, 300); // Instructions

    ctx.font = "20px Arial";
    ctx.fillText("Press Keys D, F, J, K", 400 / 2, 500); // Instructions
}

function drawGameOverScreen() { // Game Over screen
    drawBackground();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", 400 / 2, 200); // Display "Game Over" message

    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 400 / 2, 280); // Display score
    ctx.fillText("Misses: " + misses, 400 / 2, 320); // Display misses
}

canvas.addEventListener("mousedown", () => {
    if (currentState === "startScreen") {
        currentState = "gameplay"; // Transition to gameplay
        startSong(); // Start the song
    }
});

// Function to start the song
function startSong() {
    songStartTime = Date.now(); // Record the actual start time of the song
    audio.play(); // Start the song immediately
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

        // Check for Game Over condition
        if (misses >= 300) {
            currentState = "gameOver"; // Transition to Game Over state
        }
    } else if (currentState === "youWin") {
        drawYouWinScreen(); // Draw You Win screen
    } else if (currentState === "gameOver") {
        drawGameOverScreen(); // Draw Game Over screen
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

        // Change color based on key press
        let color = keyDownState[target.key] ? target.color : "gray"; // Default to gray if not pressed
        ctx.fillStyle = color;
        ctx.fill();
    });
}

const noteRadius = targetRadius;
let notes = []; 

let score = 0;
let misses = 0;

// Chart for the music (key and time in milliseconds)
const chart = [
   { key: "k", time: 0 },
   { key: "j", time: 356 },
   { key: "k", time: 498 },
   { key: "f", time: 693 },
   { key: "f", time: 851 },
   { key: "k", time: 1059 },
   { key: "d", time: 1232 },
   { key: "d", time: 1394 },
   { key: "j", time: 1599 },
   { key: "f", time: 1774 },
   { key: "f", time: 1939 },
   { key: "k", time: 2166 },
   { key: "d", time: 2368 },
   { key: "d", time: 2531 },
   { key: "k", time: 2724 },
   { key: "f", time: 2899 },
   { key: "j", time: 3058 },
   { key: "j", time: 3252 },
   { key: "d", time: 3413 },
   { key: "f", time: 3609 },
   { key: "f", time: 3792 },
   { key: "k", time: 3992 },
   { key: "f", time: 4144 },
   { key: "f", time: 4340 },
   { key: "j", time: 4493 },
   { key: "f", time: 4659 },
   { key: "d", time: 4830 },
   { key: "k", time: 4981 },
   { key: "j", time: 5145 },
   { key: "d", time: 5267 },
   { key: "f", time: 5441 },
   { key: "j", time: 5576 },
   { key: "d", time: 5775 },
   { key: "f", time: 5791 },
   { key: "k", time: 5926 },
   { key: "j", time: 6449 },
   { key: "d", time: 6668 },
   { key: "f", time: 7163 },
   { key: "d", time: 7346 },
   { key: "d", time: 7849 },
   { key: "d", time: 7930 },
   { key: "d", time: 8015 },
   { key: "d", time: 8100 },
   { key: "f", time: 8297 },
   { key: "j", time: 8365 },
   { key: "k", time: 8451 },
   { key: "j", time: 8542 },
   { key: "f", time: 8631 },
   { key: "d", time: 8734 },
   { key: "f", time: 8858 },
   { key: "k", time: 9243 },
   { key: "k", time: 9591 },
   { key: "k", time: 9974 },
   { key: "k", time: 10340 },
   { key: "k", time: 10840 },
   { key: "k", time: 10923 },
   { key: "k", time: 11010 },
   { key: "k", time: 11090 },
   { key: "k", time: 11175 },
   { key: "k", time: 11399 },
   { key: "j", time: 11585 },
   { key: "f", time: 11791 },
   { key: "f", time: 12294 },
   { key: "f", time: 12380 },
   { key: "f", time: 12465 },
   { key: "f", time: 12545 },
   { key: "j", time: 12565 },
   { key: "j", time: 12940 },
   { key: "f", time: 13099 },
   { key: "j", time: 13291 },
   { key: "j", time: 13790 },
   { key: "j", time: 13873 },
   { key: "j", time: 13961 },
   { key: "k", time: 14000 },
   { key: "f", time: 14413 },
   { key: "j", time: 14544 },
   { key: "d", time: 14733 },
   { key: "d", time: 15233 },
   { key: "d", time: 15315 },
   { key: "f", time: 15367 },
   { key: "j", time: 15490 },
   { key: "j", time: 15990 },
   { key: "k", time: 16044 },
   { key: "d", time: 16174 },
   { key: "d", time: 16676 },
   { key: "d", time: 16758 },
   { key: "d", time: 16846 },
   { key: "d", time: 16927 },
   { key: "f", time: 17129 },
   { key: "j", time: 17285 },
   { key: "k", time: 17459 },
   { key: "d", time: 17676 },
   { key: "d", time: 18176 },
   { key: "d", time: 18259 },
   { key: "f", time: 18310 },
   { key: "d", time: 18476 },
   { key: "d", time: 18975 },
   { key: "j", time: 19008 },
   { key: "f", time: 19162 },
   { key: "f", time: 19663 },
   { key: "f", time: 19745 },
   { key: "f", time: 19830 },
   { key: "f", time: 19913 },
   { key: "f", time: 19997 },
   { key: "j", time: 20043 },
   { key: "k", time: 20225 },
   { key: "j", time: 20292 },
   { key: "f", time: 20358 },
   { key: "d", time: 20408 },
   { key: "j", time: 20540 },
   { key: "k", time: 20675 },
   { key: "k", time: 21077 },
   { key: "k", time: 21475 },
   { key: "k", time: 21840 },
   { key: "k", time: 22196 },
   { key: "k", time: 22696 },
   { key: "k", time: 22780 },
   { key: "k", time: 22863 },
   { key: "k", time: 22947 },
   { key: "k", time: 23033 },
   { key: "k", time: 23116 },
   { key: "k", time: 23201 },
   { key: "j", time: 23257 },
   { key: "f", time: 23410 },
   { key: "d", time: 23630 },
   { key: "d", time: 24132 },
   { key: "d", time: 24214 },
   { key: "d", time: 24310 },
   { key: "j", time: 24361 },
   { key: "d", time: 24730 },
   { key: "f", time: 24911 },
   { key: "j", time: 25099 },
   { key: "j", time: 25601 },
   { key: "j", time: 25682 },
   { key: "j", time: 25772 },
   { key: "f", time: 25830 },
   { key: "j", time: 26210 },
   { key: "f", time: 26407 },
   { key: "k", time: 26587 },
   { key: "k", time: 27089 },
   { key: "j", time: 27156 },
   { key: "d", time: 27390 },
   { key: "d", time: 27884 },
   { key: "f", time: 27940 },
   { key: "k", time: 28113 },
   { key: "k", time: 28616 },
   { key: "k", time: 28696 },
   { key: "k", time: 28789 },
   { key: "k", time: 28866 },
   { key: "d", time: 28965 },
   { key: "f", time: 29174 },
   { key: "d", time: 29337 },
   { key: "k", time: 29508 },
   { key: "d", time: 29676 },
   { key: "f", time: 29890 },
   { key: "j", time: 30061 },
   { key: "k", time: 30233 },
   { key: "f", time: 30427 },
   { key: "j", time: 30595 },
   { key: "f", time: 30758 },
   { key: "d", time: 30951 },
   { key: "j", time: 31151 },
   { key: "f", time: 31308 },
   { key: "k", time: 31522 },
   { key: "f", time: 31671 },
   { key: "j", time: 31866 },
   { key: "d", time: 32043 },
   { key: "j", time: 32243 },
   { key: "k", time: 32408 },
   { key: "d", time: 32608 },
   { key: "f", time: 32776 },
   { key: "d", time: 32967 },
   { key: "j", time: 33176 },
   { key: "k", time: 33325 },
   { key: "j", time: 33510 },
   { key: "f", time: 33726 },
   { key: "d", time: 33923 },
   { key: "f", time: 34125 },
   { key: "k", time: 34316 },
   { key: "j", time: 34508 },
   { key: "f", time: 34639 },
   { key: "j", time: 34808 },
   { key: "k", time: 34958 },
   { key: "j", time: 35159 },
   { key: "d", time: 35367 },
   { key: "j", time: 35559 },
   { key: "f", time: 35766 },
   { key: "k", time: 35908 },
   { key: "j", time: 36111 },
   { key: "k", time: 36281 },
   { key: "d", time: 36540 },
   { key: "f", time: 36696 },
   { key: "d", time: 36868 },
   { key: "f", time: 37059 },
   { key: "j", time: 37200 },
   { key: "d", time: 37362 },
   { key: "f", time: 37540 },
   { key: "j", time: 37790 },
   { key: "k", time: 37939 },
   { key: "j", time: 38125 },
   { key: "d", time: 38368 },
   { key: "f", time: 38593 },
   { key: "j", time: 38792 },
   { key: "k", time: 38909 },
   { key: "f", time: 39174 },
   { key: "j", time: 39357 },
   { key: "k", time: 39482 },
   { key: "j", time: 39659 },
   { key: "f", time: 39909 },
   { key: "k", time: 40093 },
   { key: "j", time: 40259 },
   { key: "f", time: 40398 },
   { key: "d", time: 40566 },
   { key: "j", time: 40742 },
   { key: "d", time: 40957 },
   { key: "k", time: 41058 },
   { key: "d", time: 41226 },
   { key: "f", time: 41358 },
   { key: "j", time: 41459 },
   { key: "d", time: 41878 },
   { key: "f", time: 42024 },
   { key: "j", time: 42163 },
   { key: "f", time: 42362 },
   { key: "j", time: 42513 },
   { key: "f", time: 42725 },
   { key: "d", time: 42856 },
   { key: "f", time: 42939 },
   { key: "d", time: 43108 },
   { key: "f", time: 43178 },
   { key: "d", time: 43396 },
   { key: "f", time: 43501 },
   { key: "j", time: 43773 },
   { key: "k", time: 43841 },
   { key: "j", time: 43975 },
   { key: "k", time: 44081 },
   { key: "j", time: 44201 },
   { key: "k", time: 44290 },
   { key: "d", time: 44427 },
   { key: "d", time: 44927 },
   { key: "d", time: 45016 },
   { key: "k", time: 45096 },
   { key: "j", time: 45261 },
   { key: "f", time: 45460 },
   { key: "d", time: 45657 },
   { key: "j", time: 45881 },
   { key: "k", time: 45982 },
   { key: "j", time: 46097 },
   { key: "j", time: 46263 },
   { key: "f", time: 46344 },
   { key: "d", time: 46409 },
   { key: "f", time: 46558 },
   { key: "j", time: 46598 },
   { key: "k", time: 46675 },
   { key: "j", time: 46827 },
   { key: "f", time: 46955 },
   { key: "d", time: 47021 },
   { key: "j", time: 47213 },
   { key: "f", time: 47309 },
   { key: "k", time: 47863 },
   { key: "j", time: 48030 },
   { key: "d", time: 48211 },
   { key: "k", time: 48391 },
   { key: "j", time: 48555 },
   { key: "f", time: 48699 },
   { key: "d", time: 48798 },
   { key: "j", time: 48990 },
   { key: "f", time: 49276 },
   { key: "d", time: 49498 },
   { key: "k", time: 49708 },
   { key: "f", time: 49900 },
   { key: "k", time: 50060 },
   { key: "j", time: 50342 },
   { key: "d", time: 50840 },
   { key: "f", time: 50894 },
   { key: "d", time: 51049 },
   { key: "k", time: 51175 },
   { key: "f", time: 51409 },
   { key: "k", time: 51583 },
   { key: "d", time: 51750 },
   { key: "f", time: 51834 },
   { key: "j", time: 51916 },
   { key: "k", time: 52027 },
   { key: "j", time: 52133 },
   { key: "f", time: 52259 },
   { key: "d", time: 52334 },
   { key: "f", time: 52457 },
   { key: "j", time: 52561 },
   { key: "k", time: 52657 },
   { key: "j", time: 52774 },
   { key: "f", time: 52882 },
   { key: "d", time: 52979 },
   { key: "f", time: 53082 },
   { key: "j", time: 53178 },
   { key: "k", time: 53264 },
   { key: "j", time: 53390 },
   { key: "f", time: 53413 },
   { key: "k", time: 53620 },
   { key: "f", time: 53646 },
   { key: "k", time: 53827 },
   { key: "f", time: 53830 },
   { key: "f", time: 54026 },
   { key: "k", time: 54055 },
   { key: "d", time: 54074 },
   { key: "k", time: 54243 },
   { key: "d", time: 54275 },
   { key: "k", time: 54433 },
   { key: "d", time: 54466 },
   { key: "k", time: 54618 },
   { key: "f", time: 54741 },
   { key: "d", time: 54816 },
   { key: "k", time: 54858 },
   { key: "d", time: 55848 },
   { key: "j", time: 55984 },
   { key: "d", time: 56055 },
   { key: "j", time: 56191 },
   { key: "d", time: 56262 },
   { key: "f", time: 56442 },
   { key: "k", time: 56458 },
   { key: "k", time: 56662 },
   { key: "f", time: 56751 },
   { key: "k", time: 56873 },
   { key: "f", time: 57010 },
   { key: "j", time: 57089 },
   { key: "j", time: 57274 },
   { key: "f", time: 57425 },
   { key: "k", time: 57565 },
   { key: "f", time: 57608 },
   { key: "k", time: 57762 },
   { key: "d", time: 57807 },
   { key: "f", time: 57957 },
   { key: "k", time: 58076 },
   { key: "j", time: 58146 },
   { key: "f", time: 58251 },
   { key: "d", time: 58325 },
   { key: "j", time: 58415 },
   { key: "k", time: 58525 },
   { key: "j", time: 58629 },
   { key: "f", time: 58728 },
   { key: "d", time: 58813 },
   { key: "j", time: 58933 },
   { key: "d", time: 59083 },
   { key: "j", time: 59159 },
   { key: "d", time: 59308 },
   { key: "j", time: 59391 },
   { key: "d", time: 59513 },
   { key: "j", time: 59612 },
   { key: "d", time: 59726 },
   { key: "j", time: 59827 },
   { key: "d", time: 59949 },
   { key: "j", time: 60051 },
   { key: "j", time: 60259 },
   { key: "d", time: 60380 },
   { key: "j", time: 60449 },
   { key: "d", time: 60577 },
   { key: "j", time: 60626 },
   { key: "k", time: 60840 },
   { key: "f", time: 60859 },
   { key: "k", time: 61042 },
   { key: "f", time: 61126 },
   { key: "k", time: 61242 },
   { key: "f", time: 61355 },
   { key: "k", time: 61442 },
   { key: "f", time: 61575 },
   { key: "k", time: 61644 },
   { key: "f", time: 61790 },
   { key: "k", time: 61841 },
   { key: "f", time: 61993 },
   { key: "k", time: 62092 },
   { key: "j", time: 62175 },
   { key: "f", time: 62266 },
   { key: "d", time: 62374 },
   { key: "k", time: 62490 },
   { key: "j", time: 62580 },
   { key: "f", time: 62709 },
   { key: "d", time: 62760 },
   { key: "k", time: 62849 },
   { key: "j", time: 62924 },
   { key: "f", time: 63025 },
   { key: "d", time: 63122 },
   { key: "f", time: 63211 },
   { key: "j", time: 63288 },
   { key: "k", time: 63365 },
   { key: "d", time: 63525 },
   { key: "f", time: 63584 },
   { key: "j", time: 63684 },
   { key: "k", time: 63758 },
   { key: "d", time: 63868 },
   { key: "f", time: 63908 },
   { key: "j", time: 64026 },
   { key: "f", time: 64127 },
   { key: "j", time: 64193 },
   { key: "f", time: 64265 },
   { key: "f", time: 65078 },
   { key: "d", time: 65089 },
   { key: "j", time: 65091 },
   { key: "k", time: 65091 },
   { key: "f", time: 65450 },
   { key: "d", time: 65458 },
   { key: "j", time: 65461 },
   { key: "k", time: 65465 },
   { key: "j", time: 65858 },
   { key: "d", time: 65874 },
   { key: "f", time: 65877 },
   { key: "k", time: 65878 },
   { key: "d", time: 66191 },
   { key: "f", time: 66194 },
   { key: "j", time: 66195 },
   { key: "k", time: 66200 },
   { key: "f", time: 66560 },
   { key: "d", time: 66564 },
   { key: "j", time: 66567 },
   { key: "k", time: 66575 },
   { key: "f", time: 67194 },
   { key: "j", time: 67306 },
   { key: "j", time: 67808 },
   { key: "k", time: 67830 },
   { key: "f", time: 68018 },
   { key: "f", time: 68523 },
   { key: "f", time: 68601 },
   { key: "f", time: 68691 },
   { key: "k", time: 68942 },
   { key: "j", time: 69029 },
   { key: "f", time: 69141 },
   { key: "d", time: 69240 },
   { key: "j", time: 69361 },
   { key: "f", time: 69462 },
   { key: "d", time: 69580 },
   { key: "d", time: 69973 },
   { key: "d", time: 70325 },
   { key: "d", time: 70691 },
   { key: "d", time: 71050 },
   { key: "d", time: 71548 },
   { key: "d", time: 71631 },
   { key: "d", time: 71725 },
   { key: "d", time: 71800 },
   { key: "f", time: 72173 },
   { key: "j", time: 72299 },
   { key: "k", time: 72502 },
   { key: "k", time: 72999 },
   { key: "k", time: 73084 },
   { key: "k", time: 73166 },
   { key: "j", time: 73240 },
   { key: "k", time: 73593 },
   { key: "f", time: 73775 },
   { key: "j", time: 73945 },
   { key: "j", time: 74446 },
   { key: "j", time: 74528 },
   { key: "j", time: 74617 },
   { key: "f", time: 74709 },
   { key: "d", time: 75077 },
   { key: "f", time: 75291 },
   { key: "j", time: 75479 },
   { key: "j", time: 75976 },
   { key: "k", time: 76012 },
   { key: "f", time: 76209 },
   { key: "j", time: 76733 },
   { key: "d", time: 76959 },
   { key: "d", time: 77461 },
   { key: "d", time: 77542 },
   { key: "d", time: 77635 },
   { key: "d", time: 77944 },
   { key: "f", time: 78174 },
   { key: "j", time: 78347 },
   { key: "k", time: 79043 },
   { key: "f", time: 79242 },
   { key: "j", time: 79726 },
   { key: "d", time: 79942 },
   { key: "k", time: 80916 },
   { key: "j", time: 80995 },
   { key: "f", time: 81076 },
   { key: "d", time: 81159 },
   { key: "k", time: 81399 },
   { key: "k", time: 81826 },
   { key: "k", time: 82211 },
   { key: "k", time: 82642 },
   { key: "k", time: 82990 },
   { key: "k", time: 83491 },
   { key: "k", time: 83575 },
   { key: "k", time: 83660 },
   { key: "k", time: 83822 },
   { key: "d", time: 83966 },
   { key: "f", time: 84175 },
   { key: "k", time: 84346 },
   { key: "k", time: 84844 },
   { key: "k", time: 84926 },
   { key: "k", time: 85025 },
   { key: "d", time: 85135 },
   { key: "d", time: 85492 },
   { key: "f", time: 85661 },
   { key: "j", time: 85859 },
   { key: "j", time: 86359 },
   { key: "j", time: 86441 },
   { key: "j", time: 86531 },
   { key: "d", time: 86607 },
   { key: "j", time: 86956 },
   { key: "k", time: 87147 },
   { key: "j", time: 87329 },
   { key: "j", time: 87832 },
   { key: "k", time: 87889 },
   { key: "f", time: 88106 },
   { key: "f", time: 88607 },
   { key: "j", time: 88638 },
   { key: "d", time: 88843 },
   { key: "d", time: 89343 },
   { key: "d", time: 89426 },
   { key: "d", time: 89521 },
   { key: "f", time: 89906 },
   { key: "j", time: 90075 },
   { key: "k", time: 90290 },
   { key: "k", time: 90792 },
   { key: "k", time: 90875 },
   { key: "k", time: 90966 },
   { key: "d", time: 91067 },
   { key: "j", time: 91440 },
   { key: "f", time: 91653 },
   { key: "j", time: 91777 },
   { key: "j", time: 92279 },
   { key: "j", time: 92361 },
   { key: "j", time: 92450 },
   { key: "f", time: 92540 },
   { key: "d", time: 92934 },
   { key: "f", time: 93123 },
   { key: "j", time: 93241 },
   { key: "j", time: 93743 },
   { key: "k", time: 93814 },
   { key: "f", time: 93991 },
   { key: "f", time: 94493 },
   { key: "j", time: 94560 },
   { key: "d", time: 94760 },
   { key: "d", time: 95262 },
   { key: "d", time: 95344 },
   { key: "d", time: 95438 },
   { key: "d", time: 95512 },
   { key: "d", time: 95596 },
   { key: "d", time: 95679 },
   { key: "d", time: 95761 },
   { key: "d", time: 95848 },
   { key: "d", time: 95930 },
   { key: "d", time: 96224 },
   { key: "j", time: 96227 },
   { key: "f", time: 96228 },
   { key: "k", time: 96228 }
];


function drawNotes() {
    notes.forEach((note) => {
        ctx.beginPath();
        ctx.arc(note.x, note.y, noteRadius, 0, Math.PI * 2);
        ctx.fillStyle = note.color;
        ctx.fill();
    });
}

function updateNotes() {
    const currentTime = Date.now() - songStartTime; // Elapsed time since the song started

    // Only spawn notes after the delay
    if (currentTime < noteStartDelay) return;

    // Add notes from the chart when their time matches
    chart.forEach((note, index) => {
        if (note.time <= currentTime - noteStartDelay) { // Adjust note timing with the delay
            const xPosition = keyToX[note.key];
            const color = targets.find((target) => target.key === note.key)?.color || "gray"; // Get the color for the key
            notes.push({ x: xPosition, y: 600, color: color, key: note.key }); // Spawn the note with the correct color
            chart.splice(index, 1); // Remove the note from the chart once added
        }
    });

    // Move notes upwards and remove off-screen notes
    notes = notes.filter((note) => {
        if (note.y < 0 - noteRadius) { // Check if note goes above the top
            misses++;
            return false; // Remove missed note
        }
        note.y -= 12; // Move the note upwards
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