const puzzleContainer = document.getElementById('puzzle');
const timerDisplay = document.getElementById('timer');
let startTime = Date.now();
let interval;

// Create 3x3 shuffled puzzle
const pieces = Array.from({ length: 9 }, (_, i) => i);
shuffle(pieces);

pieces.forEach((i) => {
  const piece = document.createElement('div');
  piece.draggable = true;
piece.style.backgroundImage = 'url("https://drive.google.com/file/d/1J9mZYzqQMPXTCnFlLcIcjRism34cu015/view?usp=drive_link")';
  
 // piece.style.backgroundImage = 'url("C:/Users/Asus/OneDrive/Pictures/nature/cheetha.jpg")';
  piece.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
  piece.dataset.index = i;
  puzzleContainer.appendChild(piece);
});

// Drag-and-drop
let dragged;
puzzleContainer.addEventListener('dragstart', (e) => { dragged = e.target; });
puzzleContainer.addEventListener('dragover', (e) => e.preventDefault());
puzzleContainer.addEventListener('drop', (e) => {
  if (e.target !== dragged) {
    let temp = dragged.style.backgroundPosition;
    let tempIndex = dragged.dataset.index;
    dragged.style.backgroundPosition = e.target.style.backgroundPosition;
    dragged.dataset.index = e.target.dataset.index;
    e.target.style.backgroundPosition = temp;
    e.target.dataset.index = tempIndex;
    checkPuzzle();
  }
});

// Timer
interval = setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsed}s`;
}, 1000);

function checkPuzzle() {
  const pieces = Array.from(puzzleContainer.children);
  const correct = pieces.every((piece, i) => Number(piece.dataset.index) === i);
  if (correct) {
    clearInterval(interval);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    setTimeout(() => {
      alert(`You solved the puzzle in ${totalTime} seconds!`);
      window.location.href = "login.html";
    }, 500);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
