const quote = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  author = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

const api_url =
  "https://api.quotable.io/random?maxLength=50,tags=technology,famous-quotes";

async function getquote(url) {
  const response = await fetch(url);
  var data = await response.json();
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
}

getquote(api_url);

function speech() {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(
      `${quote.innerText} by ${author.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
}

function copy() {
  navigator.clipboard.writeText(quote.innerText);
}

function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      quote.innerHTML +
      " - by " +
      author.innerHTML,
    "Tweet Window",
    "width=600,height=300"
  );
}
