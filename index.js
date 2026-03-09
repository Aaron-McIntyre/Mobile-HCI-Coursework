const radialMenu = document.getElementById("radialMenu");
const statusText = document.getElementById("status");

let startX;
let startY;
let active = false;
let holdTimer;

document.addEventListener("pointerdown", (event) => {
  event.preventDefault();

  startX = event.clientX;
  startY = event.clientY;

  holdTimer = setTimeout(() => {
    active = true;

    radialMenu.classList.remove("hidden");

    radialMenu.style.left = startX - 110 + "px";
    radialMenu.style.top = startY - 110 + "px";
  }, 500);
});

document.addEventListener("pointermove", (event) => {
  if (!active) return;

  const xDifference = event.clientX - startX;
  const yDifference = event.clientY - startY;

  const distance = Math.sqrt(
    xDifference * xDifference + yDifference * yDifference
  );

  if (distance < 25) return;

  const angle = Math.atan2(yDifference, xDifference) * (180 / Math.PI);

  clearHighlight();

  if (angle > -30 && angle < 30) highlight("right");
  else if (angle >= 30 && angle < 120) highlight("down");
  else if (angle <= -30 && angle > -120) highlight("up");
  else if (angle >= 120 || angle <= -120) highlight("left");

  if (angle > -60 && angle < -10) highlight("upright");
  if (angle > 100 && angle < 160) highlight("downleft");
});

document.addEventListener("pointerup", (event) => {
  clearTimeout(holdTimer);

  if (!active) return;

  const xDifference = event.clientX - startX;
  const yDifference = event.clientY - startY;

  const angle = Math.atan2(yDifference, xDifference) * (180 / Math.PI);

  let action = "";

  if (angle > -30 && angle < 30) action = "Skipping Song";
  else if (angle >= 30 && angle < 120) action = "Pausing Song";
  else if (angle <= -30 && angle > -120) action = "Resuming Song";
  else if (angle >= 120 || angle <= -120) action = "Playing Previous Song";

  if (angle > -60 && angle < -10) action = "Increasing Volume";
  if (angle > 100 && angle < 160) action = "Decreasing Volume";

  statusText.innerText = action;

  radialMenu.classList.add("hidden");
  active = false;

  clearHighlight();
});

function highlight(dir) {
  const element = document.querySelector("." + dir);

  if (element) element.classList.add("active");
}

function clearHighlight() {
  document.querySelectorAll(".item").forEach((index) => {
    index.classList.remove("active");
  });
}

