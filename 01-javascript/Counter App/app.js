const counterText = document.querySelector("#CounterText");
const incButton = document.querySelector("#inc-btn");
const decButton = document.querySelector("#dec-btn");
const resetBtn = document.querySelector("#reset-btn");
const msgText = document.querySelector("#msg");
const fullScreenBtn = document.querySelector("#fullScreenBtn");
function makeCounter() {
  let count = 0;
  return {
    increment: function () {
      ++count;
      return count;
    },
    decrement: function () {
      if (count <= 0) {
        msgText.style.visibility = "visible";
        count = 0;
        setTimeout(() => {
          msgText.style.visibility = "hidden";
        }, 5000);
        return count;
      }
      --count;
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    },
    value: () => {
      return count;
    },
  };
}

const counter = makeCounter();
incButton.addEventListener("click", () => {
  counterText.textContent = counter.increment();
});

fullScreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreenBtn.textContent = "Exit Fullscreen";
  } else {
    document.exitFullscreen();
    fullScreenBtn.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-fullscreen"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"
                  /></svg
                >`;
  }
});

decButton.addEventListener("click", () => {
  counterText.textContent = counter.decrement();
});

resetBtn.addEventListener("click", () => {
  counterText.textContent = counter.reset();
});
