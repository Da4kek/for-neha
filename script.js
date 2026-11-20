const $ = (id) => document.getElementById(id);

function show(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo(0, 0);
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
      btn.dataset.choice === "heck" ? "That's the spirit!" : "Yay!";
    show("s-treat");
    });
});
