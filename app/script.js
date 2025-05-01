const html = document.querySelector("html");
const focusBt = document.querySelector(".app__card-button--foco");
const shortBt = document.querySelector(".app__card-button--curto");
const longBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const focusMusicInput = document.querySelector("#alternar-musica");
const startOrPauseBt = document.querySelector("#start-pause span");
const startOrPauseBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const screenTime = document.querySelector("#timer");

const music = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const audioTimeFineshed = new Audio("./sons/beep.mp3");

let elapsedTimeInSecond = 5;
let intervalId = null;

music.loop = true;

focusMusicInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

focusBt.addEventListener("click", () => {
  elapsedTimeInSecond = 1500;
  changeContext("foco");
  focusBt.classList.add("active");
});

shortBt.addEventListener("click", () => {
  elapsedTimeInSecond = 300;
  changeContext("descanso-curto");
  shortBt.classList.add("active");
});

longBt.addEventListener("click", () => {
  elapsedTimeInSecond = 900;
  changeContext("descanso-longo");
  longBt.classList.add("active");
});

function changeContext(contexto) {
  showTime();
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/assets/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `
              Otimize sua produtividade,<br>
                  <strong class="app__title-strong">mergulhe no que importa.</strong>
              `;
      break;
    case "descanso-curto":
      title.innerHTML = `
              Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
              `;
      break;
    case "descanso-longo":
      title.innerHTML = `
              Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
              `;
    default:
      break;
  }
}

const countdown = () => {
  if (elapsedTimeInSecond <= 0) {
    audioTimeFineshed.play();
    showPopup(
      "Tempo finalizado!",
      "Você deu o seu melhor, agora aproveite um merecido descanso."
    );
    const activeFocus = html.getAttribute("data-contexto") == "foco";
    if (activeFocus) {
      const event = new CustomEvent("FocusFinished");
      document.dispatchEvent(event);
    }
    reset();
    return;
  }
  elapsedTimeInSecond -= 1;
  showTime();
};

startPauseBt.addEventListener("click", startOrPause);

function startOrPause() {
  if (intervalId) {
    audioPause.play();
    reset();
    return;
  }
  audioPlay.play();
  intervalId = setInterval(countdown, 1000);
  startOrPauseBt.textContent = "Pausar";
  startOrPauseBtIcone.setAttribute("src", `/assets/pause.png`);
}

function reset() {
  clearInterval(intervalId);
  startOrPauseBt.textContent = "Começar";
  startOrPauseBtIcone.setAttribute("src", `/assets/play_arrow.png`);
  intervalId = null;
}

function showTime() {
  const time = new Date(elapsedTimeInSecond * 1000);
  const formattedTime = time.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  screenTime.innerHTML = `${formattedTime}`;
}

showTime();
