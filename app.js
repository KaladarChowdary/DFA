function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

function addElementToWebPage(element) {
  document.body.appendChild(element);
}

function makePositionAbsolute(element) {
  element.style.position = "absolute";
}

function setDraggableTrue(element) {
  element.setAttribute("draggable", "true");
}

function setElementCoordinatesFromEvent(element, event) {
  element.style.left = event.pageX + "px";
  element.style.top = event.pageY + "px";
}

function changeElementPositionOnDrag(element) {
  element.ondrag = function (event) {
    setElementCoordinatesFromEvent(this, event);
  };

  element.ondragend = function (event) {
    setElementCoordinatesFromEvent(this, event);
  };

  element.ondrag = function (event) {
    setElementCoordinatesFromEvent(this, event);
  };
}

function addDraggableCircle() {
  const circle = createCircle();
  makePositionAbsolute(circle);
  setDraggableTrue(circle);
  changeElementPositionOnDrag(circle);
  addElementToWebPage(circle);
}

const [btn] = document.getElementsByClassName("btn");

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// CODE FOR CREATING LINE SEGMENT
function setElementPostionFromArray(element, postionArray) {
  const [x, y] = postionArray;
  element.style.x = x + "px";
  element.style.y = y + "px";
}

function makeArrayFrom2NumberedString(str) {
  const arr = [];
  for (const s of str.split(",")) {
    arr.push(Number(s.trim()));
  }
  return arr;
}

const [textBox] = document.getElementsByClassName("textbox");
// console.log(textBox);
const [point] = document.getElementsByClassName("point");
const [line] = document.getElementsByClassName("line");

point.addEventListener("click", function (event) {
  alert("line button is clicked");
});

line.addEventListener("click", function (event) {
  alert("line button is clicked");
});

console.log(makeArrayFrom2NumberedString("23, 23").join("---"));
