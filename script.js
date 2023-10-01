const quote = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    author = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis,
    api_url = "https://api.quotable.io/random?maxLength=50,tags=technology,famous-quotes";
async function getquote(t) {
    const e = await fetch(t);
    var n = await e.json();
    quote.innerHTML = n.content, author.innerHTML = n.author
}

function speech() {
    if (!quoteBtn.classList.contains("loading")) {
        let t = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
        synth.speak(t), setInterval((() => {
            synth.speaking ? speechBtn.classList.add("active") : speechBtn.classList.remove("active")
        }), 10)
    }
}

function copy() {
    navigator.clipboard.writeText(quote.innerText)
}

function tweet() {
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + " - by " + author.innerHTML, "Tweet Window", "width=600,height=300")
}
getquote(api_url);
