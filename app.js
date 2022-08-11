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
  const [x, y, ...remain] = postionArray;
  element.style.left = x + "px";
  element.style.top = y + "px";
}

function makeArrayFrom2NumberedString(str) {
  const arr = [];
  for (const s of str.split(",")) {
    arr.push(Number(s.trim()));
  }
  return arr;
}

function createPoint() {
  const point = document.createElement("div");
  point.classList.add("pt");
  return point;
}

function addPointAtCoordinates(arr) {
  const pt = createPoint();
  setElementPostionFromArray(pt, arr);
  addElementToWebPage(pt);
}

const [textBox] = document.getElementsByClassName("textbox");
const [point] = document.getElementsByClassName("point");
const [line] = document.getElementsByClassName("line");

point.addEventListener("click", function (event) {
  const s = textBox.value;
  console.log(isEmpty(s));
  if (isInputWrongForPointer(s)) {
    alert("Wrong Input For Pointer");
    return;
  }

  const arr = returnArrayFromNumberedString(s);
  addPointAtCoordinates(arr);
});

line.addEventListener("click", function (event) {
  alert("line button is clicked");
});

//Need to make sure input to the point is correct
function isInputWrongForPointer(s) {
  if (isEmpty(s) || areNonNumbersPreset(s)) {
    return true;
  }
  return false;
}
function isEmpty(x) {
  return x == "" ? true : false;
}

function isLengthTwo(s) {
  const arr = splitStringAtCommaReturnArray(s);
  if (arr.length === 2) return true;
  else return false;
}

function splitStringAtCommaReturnArray(str) {
  const arr = str.split(",");
  return arr;
}

function isArrayOfLength2(arr) {
  return arr.length === 2;
}

function returnNumberFromString(str) {
  return Number(str.trim());
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

function isNotANumber(item) {
  return isNaN(item);
}

function returnArrayFromNumberedString(str) {
  const arr = splitStringAtCommaReturnArray(str);
  const ret = [];
  for (const item of arr) {
    ret.push(returnNumberFromString(item));
  }
  return ret;
}
