const scoreData = JSON.parse(localStorage.getItem("data"));

const scoreDisplay = document.querySelector(
  ".score__display"
);
const problemAmount =
  scoreData.correct + scoreData.wrong + scoreData.empty;

const innerCircle = document.querySelector(
  ".score__inner__circle"
);
const finalScore = Math.round(
  (scoreData.correct / problemAmount) * 100
);
const dynamicScore = document.querySelector(
  ".score__info-dynamic"
);

let scoreStartValue = 0,
  speed = 20;

let progress = setInterval(() => {
  if (finalScore === 0) return;
  scoreStartValue++;
  if (scoreStartValue == finalScore)
    clearInterval(progress);
  // Tulisan nilai gede
  scoreDisplay.textContent = scoreStartValue;
  // Circle muter
  innerCircle.style.background = `conic-gradient(
    #6a3ee5 ${(scoreStartValue / 100) * 360}deg,
    rgb(239, 239, 239) 0deg
  )`;
}, speed);

const tryagainBtn = document.querySelector(
  ".try-again__button"
);

// Analisa

const correctDisplay = document.querySelector(
  ".analisa__result.correct"
);
const wrongDisplay = document.querySelector(
  ".analisa__result.wrong"
);
const emptyDisplay = document.querySelector(
  ".analisa__result.empty"
);

correctDisplay.textContent = `${Math.round(
  (scoreData.correct / problemAmount) * 100
)}%`;
wrongDisplay.textContent = `${Math.round(
  (scoreData.wrong / problemAmount) * 100
)}%`;
emptyDisplay.textContent = `${Math.round(
  (scoreData.empty / problemAmount) * 100
)}%`;

dynamicScore.textContent = `${scoreData.correct} dari ${problemAmount}`;

// tryagainBtn.addEventListener("click", () => {
//   window.open("index.html", "_blank");
// });
