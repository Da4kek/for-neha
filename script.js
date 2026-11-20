const $ = (id) => document.getElementById(id);

function show(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo(0, 0);
}

// floating background hearts
const floaties = $("floaties");
const emojis = ["💖", "💗", "🌸", "✨", "💕"];
function spawnFloaty() {
  const el = document.createElement("span");
  el.className = "floaty";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = 14 + Math.random() * 22 + "px";
  const dur = 6 + Math.random() * 6;
  el.style.animationDuration = dur + "s";
  floaties.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
setInterval(spawnFloaty, 700);

function confetti() {
  const bits = ["🎉", "💖", "✨", "🌸", "🍌", "🍚"];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement("span");
    el.className = "confetti";
    el.textContent = bits[Math.floor(Math.random() * bits.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 16 + Math.random() * 20 + "px";
    const dur = 2.5 + Math.random() * 2.5;
    el.style.animationDuration = dur + "s";
    el.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 1) * 1000);
  }
}

function typeText(el, text, speed, done) {
  let i = 0;
  const t = setInterval(() => {
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(t);
      el.classList.add("done");
      done && done();
    }
  }, speed);
}

$("openBtn").addEventListener("click", () => {
  show("s-message");
  confetti();
  // after the apology sinks in, ask for consent
  setTimeout(() => {
    $("consent").hidden = false;
    typeText($("typed"), "Now I take consent, are you okay with it?", 55, () => {
      $("choices").hidden = false;
    });
  }, 2800);
});

document.querySelectorAll("[data-choice]").forEach((btn) => {
  btn.addEventListener("click", () => {
    $("treatTitle").textContent =
      btn.dataset.choice === "heck" ? "That's the spirit! 🔥" : "Yay! 🎉";
    show("s-treat");
    confetti();
  });
});
