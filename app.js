function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

function addElementToWebPage(element) {
  console.log(element);
  document.body.appendChild(element);
}

addElementToWebPage(createCircle());

const [btn] = document.getElementsByClassName("btn");

btn.addEventListener("click", function (evt) {
  console.log("Button is clicked");
});
