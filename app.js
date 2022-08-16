//Actual html elements first

const [textBox] = document.getElementsByClassName("textbox");
const [point] = document.getElementsByClassName("point");
const [line] = document.getElementsByClassName("line");
const [btn] = document.getElementsByClassName("btn");

function addElementToWebPage(element) {
  document.body.appendChild(element);
}

function makePositionAbsolute(element) {
  element.style.position = "absolute";
}

function setDraggableTrue(element) {
  element.setAttribute("draggable", "true");
}

function setDraggableFalse(element) {
  element.setAttribute("draggable", "false");
}

function isArrayOfLength2(arr) {
  return arr.length === 2;
}

function cutSpacesReturnNumber(str) {
  return Number(str.trim());
}

function isEmpty(x) {
  return x === "";
}

function isNotANumber(item) {
  return isNaN(item);
}

function setElementCoordinatesFromEvent(element, event) {
  element.style.left = event.pageX + "px";
  element.style.top = event.pageY + "px";
}

function setElementPostionFromArray(element, postionArray) {
  const [x, y, ...remain] = postionArray;
  element.style.left = x + "px";
  element.style.top = y + "px";
}

function splitStringAtCommaReturnArray(str) {
  const arr = str.split(",");
  return arr;
}

function makeElementInline(element) {
  element.style.display = "inline";
}

function rotateElementByRad(line, angle) {
  line.style.transform = `rotate(${angle}rad)`;
}

function returnMidPointBetweenTwoPoints(arr) {
  const [x1, y1, x2, y2, ...rest] = arr;
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function distanceBetweenTwoPoints(arr) {
  const [x1, y1, x2, y2, ...rest] = arr;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function setLineWidth(line, width) {
  line.style.width = width + "px";
}

// ----------------------------------------------------------------------------------------------

function isInputWrongForPointer(s) {
  if (isEmpty(s) || areNonNumbersPresent(s)) {
    return true;
  }
  return false;
}

function returnArrayFromNumberedString(str) {
  const arr = splitStringAtCommaReturnArray(str);
  const ret = [];
  for (const item of arr) {
    ret.push(cutSpacesReturnNumber(item));
  }
  return ret;
}

function changeElementPositionOnDrag(element) {
  element.ondrag = function (event) {
    setElementCoordinatesFromEvent(this, event);
  };

  element.ondragend = function (event) {
    setElementCoordinatesFromEvent(this, event);
  };
}

function areNonNumbersPresent(s) {
  const arr = splitStringAtCommaReturnArray(s);
  for (const item of arr) {
    if (isNotANumber(item)) {
      return true;
    }
  }
  return false;
}

// ----------------------------------------------------------------------------------------------
function getArrayFromTextBox() {
  const s = textBox.value;
  return returnArrayFromNumberedString(s);
}

// ----------------------------------------------------------------------------------------------

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

function addDraggableCircle() {
  const circle = createCirclewithName("state1");
  makePositionAbsolute(circle);
  setDraggableTrue(circle);
  changeElementPositionOnDrag(circle);
  addElementToWebPage(circle);
}

function createPoint() {
  const point = document.createElement("div");
  point.classList.add("pt");
  return point;
}

function addPointAtCoordinates(arr) {
  const pt = createPoint();
  makePositionAbsolute(pt);
  setElementPostionFromArray(pt, arr);
  addElementToWebPage(pt);
}

function createLine() {
  const line = document.createElement("div");
  line.classList.add("l");
  return line;
}

function addLineAtCoordinates(arr) {
  const line = createLine();
  makePositionAbsolute(line);
  setElementPostionFromArray(line, arr);
  addElementToWebPage(line);
  return line;
}

function createTextElement(name) {
  const text = document.createElement("p");
  text.textContent = name;
  return text;
}

function createCirclewithName(name) {
  const circle = createCircle();
  const text = createTextElement(name);
  makeElementInline(text);
  circle.appendChild(text);
  return circle;
}

// ----------------------------------------------------------------------------------------------

point.addEventListener("click", function (event) {
  if (isInputWrongForPointer(textBox.value)) {
    alert("Enter Numbers Separated By Commas");
    return;
  }
  const arr = getArrayFromTextBox();
  addPointAtCoordinates(arr);
});

line.addEventListener("click", function (event) {
  if (isInputWrongForPointer(textBox.value)) {
    alert("Enter Numbers Separated By Commas");
    return;
  }
  const arr = getArrayFromTextBox();
  const l = addLineAtCoordinates(arr);
});

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// ------------------------------------------------

// Add line when points are not parallel

function addLineBetweenTwoPoints(arr) {
  if (isInputWrongForPointer(textBox.value)) {
    alert("Enter Numbers Separated By Commas");
    return;
  }
  const arr = getArrayFromTextBox();
  const l = addLineAtCoordinates(returnMidPointBetweenTwoPoints(arr));
  setLineWidth(l, distanceBetweenTwoPoints(arr));
  rotateElementByRad(l, angleBetweenTwoPoints(arr));
  addElementToWebPage(l);
}

function angleBetweenTwoPoints(arr) {
  const [x1, y1, x2, y2] = arr;

  return Math.atan((y2 - y1) / (x2 - x1));
}
