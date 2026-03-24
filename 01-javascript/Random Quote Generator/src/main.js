import "./style.css";

const quotes = [
  `"Today I step on grass; later I shall step on mountains and rivers!". 
  <br>- Fang Yuan`,
  `"Humans are like isolated islands, floating in the sea of fate.
Human encounters are like the collision of these lonely islands, and once they touch, there would be an effect. Sometimes, the islands would stick together, in the name of ‘interest’, ‘kinship’, ‘friendship’, ‘love’ and ‘hate’. But eventually, they would separate, walking towards the path of destruction.
This is the truth behind life.” 
<br>― Gu Zhen Re, Reverend Insanity`,
  `“Humans only live for a hundred years, it is as unreal as a dream that ends in an instant. What is the point of a person living in this world? No more than just being on a journey, and witnessing interesting things. Although I do not want to die, I do not fear death. I am already on my right path, I will strive to have no regrets even if I die. The only thing lacking in this world is a medicine for regret.” 
 <br> - Fang Yuan`,
  `"Not wanting to be trampled on, there are two ways. One is to become strong, strong until no one dares to step on you. Another is to turn into dog shit, something no one would want to step on". 
  <br>- Fang Yuan`,
  `"This was the harshness of reality, and also the beauty of fate. In this world, everyone is a main character, but everyone is also a side character". <br>- Fang Yuan`,
  `"Life and death is nature’s law. All living beings are equal, and everyone has their right to survive and be killed. There might be royalty and lower beings, but in face of death, a person’s death is no different from a pig’s, what’s the difference? They’re both dead". 
  <br>-Fang yuan`,
  `"People don’t avoid effort because they’re weak; they avoid it because they see no meaning in it." 
  <br>- Oreki Houtarou`,
  `"If something can be solved without effort, then effort is just inefficiency." <br>- Oreki Houtarou`,
  `"Success is often just the result of choosing the least troublesome path consistently." 
  <br>- Oreki Houtarou`,
  `"Luck favors those who don’t rely on it." 
  <br>- Oreki Houtarou`,
  `"Not every problem deserves your energy." 
  <br>- Oreki Houtarou`,

  `"Hard work alone doesn’t guarantee anything; it just increases your odds." 
  <br>- Hikigaya Hachiman`,
  `"People call it fate when they don’t want to admit they made a choice." 
  <br>- Hikigaya Hachiman`,
  `"Failure hurts less when you expect it." 
  <br>- Hikigaya Hachiman`,
  `"The world doesn’t reward sincerity; it rewards results." 
  <br>- Hikigaya Hachiman`,
  `"Loneliness teaches truths that comfort never will." 
  <br>- Hikigaya Hachiman`,

  `"Equality is an illusion; outcomes are what truly matter." 
  <br>- Ayanokoji Kiyotaka`,
  `"Winning doesn’t require strength—only control." 
  <br>- Ayanokoji Kiyotaka`,
  `"Emotions are tools; whether they control you or serve you is your choice."
   <br>- Ayanokoji Kiyotaka`,
  `"People reveal their value only under pressure." 
  <br>- Ayanokoji Kiyotaka`,
  `"Success is simply the accumulation of calculated decisions." 
  <br>- Ayanokoji Kiyotaka`,

  `"Dreams are only meaningful when backed by action." 
  <br>- Lelouch Lamperouge`,
  `"The weak rely on miracles; the strong create them." 
  <br>- Lelouch Lamperouge`,
  `"Sacrifice is the currency of change." 
  <br>- Lelouch Lamperouge`,
  `"Power is not given; it is taken." 

  <br>- Lelouch Lamperouge`,
  `"A plan without risk is just wishful thinking." 
  <br>- Lelouch Lamperouge`,

  `"A lie can be more useful than the truth." 

  <br>- Light Yagami`,
  `"Justice is defined by those who prevail." 
  <br>- Light Yagami`,
  `"Fear is a stronger motivator than hope." 
  <br>- Light Yagami`,
  `"Perfection is achieved through elimination, not addition." 
  <br>- Light Yagami`,
  `"Control the narrative, and you control reality." 
  <br>- Light Yagami`,

  `"Strength is not about winning every time; it’s about standing up again." 
  <br>- Guts`,
  `"Struggle is proof that you’re still moving forward." 
  <br>- Guts`,
  `"Pain shapes purpose." 
  <br>- Guts`,
  `"Survival itself is a form of victory." 
  <br>- Guts`,
  `"The path you choose matters more than where it leads." 
  <br>- Guts`,

  `"People only change when they’re forced to face themselves." 
  <br>- Shinji Ikari`,
  `"Running away solves nothing, but staying can hurt more." 
  <br>- Shinji Ikari`,
  `"Fear is natural; letting it decide everything is not." 
  <br>- Shinji Ikari`,
  `"Understanding yourself is the hardest battle." 
  <br>- Shinji Ikari`,
  `"Connection always comes with risk." 
  <br>- Shinji Ikari`,

  `"True strength is staying calm when everything falls apart." 
  <br>- Itachi Uchiha`,
  `"Knowledge without action is meaningless." 
  <br>- Itachi Uchiha`,
  `"Peace often requires unseen sacrifices." 
  <br>- Itachi Uchiha`,
  `"People see only what they’re prepared to understand." 
  <br>- Itachi Uchiha`,
  `"Wisdom begins where ego ends." 
  <br>- Itachi Uchiha`,

  `"Talent means nothing without discipline." 
  <br>- Satoru Gojo`,
  `"Limits exist only if you accept them." 
  <br>- Satoru Gojo`,
  `"Confidence without skill is arrogance." 
  <br>- Satoru Gojo`,
  `"The strongest don’t fear failure—they expect it." 
  <br>- Satoru Gojo`,
  `"Growth begins where comfort ends." 
  <br>- Satoru Gojo`,
];

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");
const el = document.getElementById("quoteText");
const container = document.querySelector(".snap-y");

let history = [];
let currentIndex = -1;
let isAnimating = false;

const ANIMATION_TIME = 400;

// ---------------- CORE LOGIC ----------------

function getRandomQuote() {
  if (history.length === quotes.length) {
    history = [];
    currentIndex = -1;
  }

  const used = new Set(history);
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (used.has(quotes[randomIndex]));

  return quotes[randomIndex];
}

function render(quote) {
  if (!quote) return;
  el.innerHTML = quote;
}

// ---------------- NAVIGATION ----------------

function nextQuote() {
  const quote = getRandomQuote();
  history.push(quote);
  currentIndex++;

  scrollDown();

  setTimeout(() => {
    render(quote);
  }, ANIMATION_TIME / 2);
}

function prevQuote() {
  if (currentIndex <= 0) return;

  currentIndex--;

  scrollUp();

  setTimeout(() => {
    render(history[currentIndex]);
  }, ANIMATION_TIME / 2);
}

// ---------------- SCROLL ----------------

function scrollDown() {
  container.scrollBy({
    top: container.clientHeight,
    behavior: "smooth",
  });
}

function scrollUp() {
  container.scrollBy({
    top: -container.clientHeight,
    behavior: "smooth",
  });
}

// ---------------- INPUT CONTROL ----------------

upBtn.onclick = () => {
  if (isAnimating) return;

  isAnimating = true;
  nextQuote();

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_TIME);
};

downBtn.onclick = () => {
  if (isAnimating) return;

  isAnimating = true;
  prevQuote();

  setTimeout(() => {
    isAnimating = false;
  }, ANIMATION_TIME);
};
// nextQuote();
