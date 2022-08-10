function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

function createTextElement(name) {
  const text = document.createElement("p");
  text.textContent = name;
  return text;
}

function addElementToWebPage(element) {
  document.body.appendChild(element);
}

function setDraggableTrue(element) {
  element.setAttribute("draggable", "true");
}

function makeElementInline(element) {
  element.style.display = "inline";
}

function makePositionAbsolute(element) {
  element.style.position = "absolute";
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

function createCirclewithName(name) {
  const circle = createCircle();
  const text = createTextElement(name);
  makeElementInline(text);
  circle.appendChild(text);
  return circle;
}

function addDraggableCircle() {
  const circle = createCirclewithName("s1");
  makePositionAbsolute(circle);
  setDraggableTrue(circle);
  changeElementPositionOnDrag(circle);
  addElementToWebPage(circle);
}

const [btn] = document.getElementsByClassName("btn");

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// addElementToWebPage(createCirclewithName("s1"));
