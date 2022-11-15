//Actual html elements first
let AllCircles = [];
let clickedPointCoordinates = [];

const [textBox] = document.getElementsByClassName("textbox");
const [pointBtn] = document.getElementsByClassName("point");
const [lineBtn] = document.getElementsByClassName("line");
const [btn] = document.getElementsByClassName("btn");

// Adds element to webpage
function addElementToWebPage(element) {
  document.body.appendChild(element);
}

// Makes element position absolute
function makePositionAbsolute(element) {
  element.style.position = "absolute";
}

// Makes element draggable
function setDraggableTrue(element) {
  element.setAttribute("draggable", "true");
}

// Stops element being draggable
function setDraggableFalse(element) {
  element.setAttribute("draggable", "false");
}

//  Set's element width
function setElementWidthPixels(element, width) {
  element.style.width = width + "px";
}

// Set's elements background color
function setBackgroundColor(element, color) {
  element.style.backgroundColor = color;
}

// boolean : Weather array is less than given length
function isArrayOfLengthLessThanN(arr, N) {
  return arr.length < N;
}

// Returns number after eliminating spaces
function cutSpacesReturnNumber(str) {
  return Number(str.trim());
}

// boolean: is the given entity empty
function isEmpty(x) {
  return x === "";
}

// boolean: Given entity is not a number right
function isNotANumber(item) {
  return isNaN(item);
}

// Returns lesser of the two numbers
function returnLesserOfTwo(a, b) {
  return a < b ? a : b;
}

// Gives elements mid point
function returnElementMidPoint(element) {
  return [
    element.offsetLeft + element.offsetWidth / 2,
    element.offsetTop + element.offsetHeight / 2,
  ];
}

// Set's default value in the text box
function setDefaultValueinTextBox() {
  textBox.defaultValue = "1000, 300, 500, 200";
}

// Takes an event and set elements position according to the event
function setElementCoordinatesFromEvent(element, event) {
  element.style.left = event.pageX + "px";
  element.style.top = event.pageY + "px";
}

// Set's the element position from the array
function setElementPostionFromArray(element, [x, y]) {
  element.style.left = x + "px";
  element.style.top = y + "px";
}

// Splits the string at comma and returns array
function splitStringAtCommaReturnArray(str) {
  const arr = str.split(",");
  return arr;
}

//  Makes the element inline
function makeElementInline(element) {
  element.style.display = "inline";
}

// Rotates the given element by given radian
function rotateElementByRad(element, angle) {
  element.style.transform = `rotate(${angle}rad)`;
}

// Returns the mid point between two points
function returnMidPointBetweenTwoPoints([x1, y1, x2, y2]) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

// Returns the distence between two points
function distanceBetweenTwoPoints([x1, y1, x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Finds the angle from initial point to final point
function angleFromInititalToFinalPoint([x1, y1, x2, y2]) {
  return Math.atan((y2 - y1) / (x2 - x1));
}

// Returns the width of the given element
function returnWidth(element) {
  return Number.parseFloat(element.offsetWidth);
}

// Returns the height of the given element
function returnHeight(element) {
  return Number.parseFloat(element.offsetHeight);
}

// ----------------------------------------------------------------------------------------------

// Givens array of integers from the array of string numbers
function intArrayFromStrArray(arr) {
  const ret = [];
  for (const item of arr) {
    ret.push(cutSpacesReturnNumber(item));
  }
  return ret;
}

// give element to this function, it will begin to drag
function changeElementPositionOnDrag(element) {
  setDraggableTrue(element);
  element.ondrag = function (event) {
    setElementCoordinatesFromEvent(element, event);
  };

  element.ondragend = function (event) {
    setElementCoordinatesFromEvent(element, event);
  };
}

// Returns true if non numbers are present
function areNonNumbersPresent(arr) {
  for (const item of arr) {
    if (isNotANumber(item)) {
      return true;
    }
  }
  return false;
}

// Return's x offset, whatever that is
function returnXOffset([x1, y1, x2, y2]) {
  const distance = distanceBetweenTwoPoints([x1, y1, x2, y2]);
  const hlength = Math.abs(x1 - x2);
  return (distance - hlength) / 2;
}

// Get's the string from textbox and returns array of numbers
function getArrayFromTextBox(textBox) {
  const s = textBox.value;
  const arr = splitStringAtCommaReturnArray(s);
  return intArrayFromStrArray(arr);
}

// ----------------------------------------------------------------------------------------------

// Checks whether is input wrong for a pointer
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

// Checks whether input is wrong for line
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

// Gives initial point for line between two points
function initialPointForLineBetweenTwoPoints([x1, y1, x2, y2]) {
  return [
    returnLesserOfTwo(x1, x2) - returnXOffset([x1, y1, x2, y2]),
    Math.abs((y1 + y2) / 2),
  ];
}

function circumferencePointsFromCentrePoints(x1, y1, x2, y2, radius) {
  const distence = distanceBetweenTwoPoints([x1, y1, x2, y2]);
  const x = ((x2 - x1) * radius) / distence;
  const y = ((y2 - y1) * radius) / distence;

  return [x1 + x, y1 + y, x2 - x, y2 - y];
}

// ----------------------------------------------------------------------------------------------

// Creates circle
// Creates div with class circle
function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  return circle;
}

// Creates point
function createPoint() {
  const point = document.createElement("div");
  point.classList.add("pt");
  return point;
}

// Add point at specified coordinates
function addPointAtCoordinates(arr) {
  const pt = createPoint();
  makePositionAbsolute(pt);
  setElementPostionFromArray(pt, arr);
  addElementToWebPage(pt);
}

// Creates line
function createLine() {
  const line = document.createElement("div");
  line.classList.add("l");
  return line;
}

// Creates line from specific coordinates
function addLineAtCoordinates(arr) {
  const line = createLine();
  makePositionAbsolute(line);
  setElementPostionFromArray(line, arr);
  addElementToWebPage(line);
  return line;
}

// Creates a label(text) with given string
function createTextElement(name) {
  const text = document.createElement("p");
  text.textContent = name;
  return text;
}

// Creates circle with name
function createCirclewithName(name) {
  const circle = createCircle();
  const text = createTextElement(name);
  makeElementInline(text);
  circle.appendChild(text);
  return circle;
}

// Adds line between two points
function addLineBetweenTwoPoints([x1, y1, x2, y2]) {
  const l = addLineAtCoordinates(
    initialPointForLineBetweenTwoPoints([x1, y1, x2, y2])
  );
  setElementWidthPixels(l, distanceBetweenTwoPoints([x1, y1, x2, y2]));
  rotateElementByRad(l, angleFromInititalToFinalPoint([x1, y1, x2, y2]));
  setBackgroundColor(l, "black");
  addElementToWebPage(l);
}

function pushMidpointOnClick(element) {
  element.addEventListener("click", function () {
    pushMidpoint(returnElementMidPoint(element));
  });
}

// ---------------------------------------------------------------------------

function pushMidpoint(newCoordinates) {
  clickedPointCoordinates.push(newCoordinates);

  if (clickedPointCoordinates.length === 2) {
    addLineBetweenTwoPoints(
      circumferencePointsFromCentrePoints(
        ...clickedPointCoordinates[0],
        ...clickedPointCoordinates[1],
        50
      )
    );
    clickedPointCoordinates = [];
  }
}

// ---------------------------------------------------------------------------

pointBtn.addEventListener("click", function (event) {
  if (isInputWrongForPointer(textBox.value)) {
    alert("Enter Numbers Separated By Commas");
    return;
  }
  const arr = getArrayFromTextBox(textBox);
  addPointAtCoordinates(arr);
});

lineBtn.addEventListener("click", function (event) {
  if (isInputWrongForPointer(textBox.value)) {
    alert("Enter Numbers Separated By Commas");
    return;
  }
  const arr = getArrayFromTextBox(textBox);
  addLineBetweenTwoPoints(arr);
});

btn.addEventListener("click", function (evt) {
  addDraggableCircle();
});

// ------------------------------------------------

setDefaultValueinTextBox();

//--------------------------------------------------

function visited(circle) {
  setBackgroundColor(circle, "green");
}

let firstCircle = -1;

function setFirstCircle(circle) {
  if (firstCircle === -1) firstCircle = circle;
}

function getFirstCircle() {
  return firstCircle;
}

let clickedCircles = [];
function pushElementOnClick(element) {
  element.addEventListener("click", function () {
    console.log(`${element} is clicked`);
    pushElement(element);
  });
}

function pushElement(element) {
  clickedCircles.push(element);

  if (clickedCircles.length === 2) {
    addLineBetweenTwoPoints(
      circumferencePointsFromCentrePoints(
        ...returnElementMidPoint(clickedCircles[0]),
        ...returnElementMidPoint(clickedCircles[1]),
        50
      )
    );
    clickedCircles = [];
  }
}

// ---------------------------------------------------------
function addDraggableCircle() {
  const circle = createCircle();
  makePositionAbsolute(circle);
  changeElementPositionOnDrag(circle);
  // pushMidpointOnClick(circle);
  pushElementOnClick(circle);
  addElementToWebPage(circle);

  AllCircles.push(circle);
  setFirstCircle(circle);
}

// ----------------------------------------------------------------
