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

function setElementWidth(element, width) {
  element.style.width = width + "px";
}

function setBackgroundColor(element, color) {
  element.style.backgroundColor = color;
}

function isArrayOfLengthLessThanN(arr, N) {
  return arr.length < N;
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

function returnLesserOfTwo(a, b) {
  return a < b ? a : b;
}

function returnCircleMidPoint(element) {
  return [
    element.offsetLeft + element.offsetWidth / 2,
    element.offsetTop + element.offsetHeight / 2,
  ];
}

function setDefaultValueinTextBox() {
  textBox.defaultValue = "1000, 300, 500, 200";
}

function setElementCoordinatesFromEvent(element, event) {
  element.style.left = event.pageX + "px";
  element.style.top = event.pageY + "px";
}

function setElementPostionFromArray(element, [x, y]) {
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

function rotateElementByRad(element, angle) {
  element.style.transform = `rotate(${angle}rad)`;
}

function returnMidPointBetweenTwoPoints([x1, y1, x2, y2]) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function distanceBetweenTwoPoints([x1, y1, x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function angleFromInititalToFinalPoint([x1, y1, x2, y2]) {
  return Math.atan((y2 - y1) / (x2 - x1));
}

// ----------------------------------------------------------------------------------------------

function intArrayFromStrArray(arr) {
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

function areNonNumbersPresent(arr) {
  for (const item of arr) {
    if (isNotANumber(item)) {
      return true;
    }
  }
  return false;
}

function returnXOffset([x1, y1, x2, y2]) {
  const distance = distanceBetweenTwoPoints([x1, y1, x2, y2]);
  const hlength = Math.abs(x1 - x2);
  return (distance - hlength) / 2;
}

function getArrayFromTextBox() {
  const s = textBox.value;
  const arr = splitStringAtCommaReturnArray(s);
  return intArrayFromStrArray(arr);
}

// ----------------------------------------------------------------------------------------------

function isInputWrongForPointer(s) {
  const arr = splitStringAtCommaReturnArray(s);
  if (
    isEmpty(s) ||
    areNonNumbersPresent(arr) ||
    isArrayOfLengthLessThanN(arr, 2)
  ) {
    return true;
  }
  return false;
}

function isInputWrongForLine(s) {
  const arr = splitStringAtCommaReturnArray(s);
  if (
    isEmpty(s) ||
    areNonNumbersPresent(arr) ||
    isArrayOfLengthLessThanN(arr, 4)
  ) {
    return true;
  }
  return false;
}

function initialPointForLineBetweenTwoPoints([x1, y1, x2, y2]) {
  return [
    returnLesserOfTwo(x1, x2) - returnXOffset([x1, y1, x2, y2]),
    Math.abs((y1 + y2) / 2),
  ];
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
  pushMidpointOnClick(circle);
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

function addLineBetweenTwoPoints([x1, y1, x2, y2]) {
  const l = addLineAtCoordinates(
    initialPointForLineBetweenTwoPoints([x1, y1, x2, y2])
  );
  setElementWidth(l, distanceBetweenTwoPoints([x1, y1, x2, y2]));
  rotateElementByRad(l, angleFromInititalToFinalPoint([x1, y1, x2, y2]));
  setBackgroundColor(l, "black");
  addElementToWebPage(l);
  // if (x1 > x2) rotateElementByRad(l, Math.PI);

  addPointAtCoordinates(initialPointForLineBetweenTwoPoints([x1, y1, x2, y2]));
  addPointAtCoordinates([x1, y1]);
  addPointAtCoordinates([x2, y2]);
}

// ---------------------------------------------------------------------------
let clickedPointCoordinates = [];
function pushMidpoint(newCoordinates) {
  clickedPointCoordinates.push(newCoordinates);

  if (clickedPointCoordinates.length === 2) {
    addLineBetweenTwoPoints([
      ...clickedPointCoordinates[0],
      ...clickedPointCoordinates[1],
    ]);
    clickedPointCoordinates = [];
  }
}

// ---------------------------------------------------------------------------

// function pushMidpointOnClick(element) {
//   element.addEventListener("click", function () {
//     pushMidpoint(returnCircleMidPoint(element));
//   });
// }

// ---------------------------------------------------------------------------

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
  addLineBetweenTwoPoints(arr);
});

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// ------------------------------------------------

setDefaultValueinTextBox();

//--------------------------------------------------
// Eliminate hardcoding of width and height
function pushMidpointOnClick(element) {
  element.addEventListener("click", function () {
    pushMidpoint(returnCircleMidPoint(element));
    console.log(returnWidth(element), returnHeight(element));
  });
}

function returnWidth(element) {
  console.log(element.style.width);
  return Number.parseFloat(element.style.width);
}

function returnHeight(element) {
  return Number.parseFloat(element.style.height);
}
