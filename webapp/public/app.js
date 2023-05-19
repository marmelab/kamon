document.querySelector("#toggleHighlight").addEventListener("click", (e) => {
  if (e.target.dataset.highlighted == "true") {
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.classList.remove("tile--allowed-move-false");
    });
    e.target.dataset.highlighted = false;
    return;
  }

  e.target.dataset.highlighted = true;
  document.querySelectorAll(".tile").forEach((tile) => {
    const allowed = tile.dataset.allowedMove;
    if (allowed == "false") {
      tile.classList.add("tile--allowed-move-false");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const eventSource = new EventSource("/sse_game_resfresh");
  eventSource.onmessage = (data) => {
    window.location.reload();
  };
});

document.querySelector("#help").addEventListener("submit", (e) => {
  e.preventDefault();
  const messageContainer = e.target.querySelector("div");

  messageContainer.innerText = "Computation...";
  fetch(e.target.action, {
    method: "post",
  })
    .then((r) => r.json())
    .then((tiles) => {
      if (tiles.lenght < 1) {
        messageContainer.text("No help available");
        setTimeout(() => {
          messageContainer.innerText = "";
        }, 3000);
      }
      tiles.forEach((tile) => {
        const el = document.querySelector(
          `.tile--${tile.symbol}.tile--${tile.color}`,
        );
        el.classList.add("tile--blink");
      });
    })
    .finally(() => {
      messageContainer.innerText = "";
    });
});
