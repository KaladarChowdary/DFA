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

function returnNumberFromString(str) {
  return Number(str.trim());
}

function isEmpty(x) {
  return x == "" ? true : false;
}

function isNotANumber(item) {
  return isNaN(item);
}

function setElementCoordinatesFromEvent(element, event) {
  element.style.left = event.pageX + "px";
  element.style.top = event.pageY + "px";
}

function setStartPositionFromArray(element, postionArray) {
  const [x, y, ...remain] = postionArray;
  element.style.left = x + "px";
  element.style.top = y + "px";
}

function splitStringAtCommaReturnArray(str) {
  const arr = str.split(",");
  return arr;
}

// ----------------------------------------------------------------------------------------------

function isInputWrongForPointer(s) {
  if (isEmpty(s) || areNonNumbersPreset(s)) {
    return true;
  }
  return false;
}

function returnArrayFromNumberedString(str) {
  const arr = splitStringAtCommaReturnArray(str);
  const ret = [];
  for (const item of arr) {
    ret.push(returnNumberFromString(item));
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

function areNonNumbersPreset(s) {
  const arr = splitStringAtCommaReturnArray(s);
  for (const item of arr) {
    if (isNotANumber(item)) {
      return true;
    }
  }
  return false;
}

function distanceBetweenTwoPoints(arr) {
  const [x1, y1, x2, y2, ...rest] = arr;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function setLineWidth(line, width) {
  line.style.width = width + "px";
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
  const circle = createCircle();
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
  setStartPositionFromArray(pt, arr);
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
  setStartPositionFromArray(line, arr);
  addElementToWebPage(line);
  return line;
}

function addLineBetweenPoints(arr) {
  const line = createLine();
  makePositionAbsolute(line);
  setStartPositionFromArray(line, arr);
  setLineWidth(line, distanceBetweenTwoPoints(arr));
  addElementToWebPage(line);
  return line;
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
  const l = addLineBetweenPoints(arr);
  rotateLine(l, 30);
  addLineBetweenPoints(arr);
});

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// ROTATION IS IN CLOCKWISE DIRECTION
function rotateLine(line, angle) {
  console.log(line);
  line.style.transform = `rotate(${angle}deg)`;
  // console.log("function to rotate is executed");
}
