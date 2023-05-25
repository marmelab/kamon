document.addEventListener("DOMContentLoaded", () => {
  const eventSource = new EventSource("/sse_game_resfresh");
  eventSource.onmessage = (data) => {
    window.location.reload();
  };
});

document.querySelector("#toggleHighlight")?.addEventListener("click", (e) => {
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

document.querySelector("#help")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageContainer = e.target.querySelector("div");
  const level = e.target.querySelector("[name=level]");

  messageContainer.innerText = "Computation...";
  fetch(e.target.action, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      level: level.value,
    }),
  })
    .then((r) => r.json())
    .then((response) => {
      const { missingTilesForPath, missingTilesForBlocked } = response;
      if (missingTilesForPath.length < 1 && missingTilesForBlocked.length < 1) {
        messageContainer.innerText = "No help available";
        return;
      }

      missingTilesForPath.forEach((tile) => {
        const hexagon = document.querySelector(
          `.tile--${tile.symbol}.tile--${tile.color}`,
        );
        if (hexagon) {
          hexagon.style.color = tile.pathColor;
          hexagon.classList.add("tile--blink");
        }
      });

      missingTilesForBlocked.forEach((tile) => {
        const hexagon = document.querySelector(
          `.tile--${tile.symbol}.tile--${tile.color}`,
        );
        if (hexagon) hexagon.classList.add("tile--blink--blocked");
      });

      messageContainer.innerText = "";
    })
    .finally(() => {
      setTimeout(() => {
        messageContainer.innerText = "";
      }, 3000);
    });
});
