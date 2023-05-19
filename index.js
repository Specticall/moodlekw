const quizData = [
  {
    number: 1,
    question:
      "Sebuah peluru ditembakkan ke atas. Jika tinggi meter setelah detik dirumuskan dengan h(t) = 120t - 5t^2, maka tinggi maksimum yang dicapai peluru tersebut adalah meter. ",
    option1: "270",
    option2: "320",
    option3: "670",
    option4: "720",
    answer: 4,
  },
  {
    number: 2,
    question:
      "Suatu perusahaan memproduksi unit barang dengan biaya (4x^2 - 8x + 24) ribu rupiah untuk tiap unit. Jika barang tersebut terjual habis dengan harga Rp40.000,00 untuk tiap unit, maka keuntungan maksimum yang diperoleh perusahaan tersebut adalah",
    option1: "Rp.16.000,00",
    option2: "Rp.32.000,00",
    option3: "Rp.48.000,00",
    option4: "Rp.52.000,00",
    answer: 2,
  },
  {
    number: 3,
    question:
      "Selembar kertas HVS memiliki luas 54cm^2. Sukardi akan menggunakan kertas tersebut untuk mengetik surat undangan. Apabila margin (batas pengetikan) bagian atas dan bawah 1 cm, sedangkan margin sampingnya 1,5cm, maka panjang dan lebar kertas agar luas daerah pengetikannya maksimum adalah ",
    option1: "9x6",
    option2: "6x9",
    option3: "6x6",
    option4: "soalnya ez bgt ygy",
    answer: 1,
  },
  {
    number: 4,
    question:
      "Suatu persegi panjang dengan salah satu sisinya menempel pada sumbu-X ditempatkan dalam daerah yang dibatasi oleh garis y = 0, y= 3x , y = 30 - 2x dan Tentukan luas terbesar yang mungkin untuk persegi panjang tersebut.",
    option1: "67,5",
    option2: "68,5",
    option3: "67",
    option4: "68",
    answer: 1,
  },
  {
    number: 5,
    question:
      "Suatu lahan berbentuk persegi panjang dengan luas 432 m^2, jika seseorang ingin menempatkan truk berjumlah 25, tentukan umur Pak Doni!",
    option1: "-5 tahun",
    option2: "1 + 8.42 = 30 tahun",
    option3: "idk",
    option4: "ini jawaban yang benar",
    answer: 4,
  },
  {
    number: 6,
    question:
      "Sebuah perternakan mempunyai 6x^2 + 3x - 4 dinosaurus, jika 2 mati maka sebutkan sila ke-4 pancasila!",
    option1: "Ketuhanan Yang Maha Esa",
    option2: "Kemanusiaan yang adil dan beradab",
    option3: "Ini pertanyaan macem apa???",
    option4: "Tidak ada yang benar",
    answer: 4,
  },
];

const domQuestion = document.querySelector(
  ".question__main"
);
const domAnswer = document.querySelectorAll(
  ".question__answer"
);
let currentNumber = 1;
let pickedAnswer = 0;
const nextBtn = document.querySelector(
  ".navigation__button.next"
);
const backBtn = document.querySelector(
  ".navigation__button.back"
);
const numberIndicator = document.querySelector(
  ".question__number"
);
const progressBarBtn = document.querySelector(
  ".progress__container"
);
const progressBar = document.querySelector(
  ".progress__box"
);
const progressWrapper = document.querySelector(
  ".progress_box-wrapper"
);
const warningPopup = document.querySelector(
  ".warning__popup-container"
);
const warningBackBtn = document.querySelector(
  ".warning__back"
);
const submitBtn = document.querySelector(
  "a[href='result.html']"
);

// ======= Progress Bar ===========

/*
Node sekarang = node-current
Node sudah diisi = node-one
*/

quizData.forEach((current, index) => {
  const newElement = document.createElement("button");
  newElement.textContent = index + 1;
  newElement.setAttribute("class", "progress__node");
  progressWrapper.appendChild(newElement);
});

const numberNode = document.querySelectorAll(
  ".progress__node"
);

function resetNodeSelection() {
  numberNode.forEach((current) => {
    current.classList.remove("node-current");
  });
}

numberNode.forEach((current, index) => {
  current.addEventListener("click", () => {
    resetNodeSelection();
    current.classList.add("node-current");
    currentNumber = index + 1;
    updatePage(index + 1);
    if (currentNumber === quizData.length) {
      if (
        nextBtn.querySelector("p").textContent === "Submit"
      ) {
        if (checkCompletion()) {
          canSubmit();
        }
      }
      if (currentNumber === quizData.length) {
        lastNumberReached();
      }
    } else {
      nextBtn.querySelector("p").textContent = "Next";
      nextBtn.querySelector("p").href = "";
      nextBtn
        .querySelector(".submit-wrapper")
        .removeAttribute("href");
    }
  });
});

// ======= Number Navigation ==========

function nextPage() {
  if (
    currentNumber === quizData.length &&
    !checkCompletion()
  ) {
    warningToggle();
  }
  if (currentNumber < quizData.length) currentNumber += 1;
  updatePage(currentNumber);
  updateNode(currentNumber - 1);
  if (nextBtn.querySelector("p").textContent === "Submit") {
    if (checkCompletion()) {
      canSubmit();
    }
  }
  if (currentNumber === quizData.length) {
    checkScore();
    lastNumberReached();
  }
}

function backPage() {
  if (currentNumber > 1) currentNumber -= 1;
  updatePage(currentNumber);
  updateNode(currentNumber - 1);
  if (currentNumber < quizData.length) {
    nextBtn.querySelector("p").textContent = "Next";
    nextBtn.querySelector("p").href = "";
    nextBtn
      .querySelector(".submit-wrapper")
      .removeAttribute("href");
  }
}

function updatePage(current) {
  resetPickedAnswerDisplay();
  let currentArray = current - 1;
  domQuestion.textContent = quizData[currentArray].question;
  for (let i = 0; i < domAnswer.length; i++) {
    domAnswer[i].textContent =
      quizData[currentArray][`option${i + 1}`];
  }
  numberIndicator.textContent = `${current}/${quizData.length}`;

  //  Munculin lagi opsi yang uda dipilih
  if (quizData[currentArray].picked)
    domAnswer[
      quizData[currentArray].picked - 1
    ].classList.toggle("answer__picked");
}

function updateNode(current) {
  resetNodeSelection();
  numberNode[current].classList.add("node-current");
}

updatePage(currentNumber);
nextBtn.addEventListener("click", nextPage);
backBtn.addEventListener("click", backPage);

// ====== Answer Selecting ========

domAnswer.forEach((current, index) => {
  current.addEventListener("click", () => {
    resetPickedAnswerDisplay();
    current.classList.toggle("answer__picked");
    quizData[currentNumber - 1].picked = index + 1;
    numberNode[currentNumber - 1].classList.add(
      "node-done"
    );
  });
});

function resetPickedAnswerDisplay() {
  domAnswer.forEach((current) => {
    current.classList.remove("answer__picked");
  });
}

// ======= Progress Bar Toggle ========

progressBarBtn.addEventListener("click", () => {
  if (!progressBar.classList.contains("progress__show")) {
    progressBar.classList.add("progress__show");
    progressBar.style.height =
      progressBar.scrollHeight + "px";
  } else {
    progressBar.classList.remove("progress__show");
    progressBar.style.height = 0 + "px";
  }
});

// =========== Submission ========

function checkCompletion() {
  let done = Array.from(numberNode).every((current) => {
    return current.classList.contains("node-done");
  });
  return done;
}

function lastNumberReached() {
  nextBtn.querySelector("p").textContent = "Submit";
}

function canSubmit() {
  nextBtn
    .querySelector(".submit-wrapper")
    .setAttribute("href", "result.html");
}

// ======= Warning Popup ============

function warningToggle() {
  warningPopup.classList.toggle("warning__show");
}

warningBackBtn.addEventListener("click", warningToggle);

// ========= Check Score ==============
let dataTransfer;

submitBtn.addEventListener("click", checkScore);

function checkScore() {
  let correct = 0,
    wrong = 0,
    empty = 0,
    scoredata = {
      correct: 0,
      empty: 0,
      wrong: 0,
    };
  quizData.forEach((current, index) => {
    if (current.answer === current.picked) {
      // console.log(`${index + 1} is correct`);
      scoredata.correct += 1;
    } else if (!current.picked) {
      // console.log(`${index + 1} is empty`);
      scoredata.empty += 1;
    } else if (current.answer !== current.picked) {
      // console.log(`${index + 1} is wrong`);
      scoredata.wrong += 1;
    }
  });
  localStorage.setItem("data", JSON.stringify(scoredata));
}
