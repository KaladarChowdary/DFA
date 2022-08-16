function setElementWidth(element, width) {
  element.style.width = width + "px";
}

const [one] = document.getElementsByClassName("one");
const [square] = document.getElementsByClassName("square");
const [cube] = document.getElementsByClassName("cube");

console.log(one, square);

// for (let x = 0; x <= 20; x += 0.0001) {
//   setElementWidth(one, x);
//   console.log("x set");
//   setElementWidth(square, x ** 2);
//   console.log("x square set");
// }

let wait = 1;
for (let x = 0; x <= 10; x += 0.001) {
  setTimeout(function () {
    setElementWidth(one, x);
    setElementWidth(square, x ** 2);
    setElementWidth(cube, x ** 3);
    wait++;
  }, 250 * x);
}
