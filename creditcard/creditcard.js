"use strict";

window.addEventListener("load", init);

function init() {
  console.log("init");
  const form = document.querySelector("form");
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", checkInput);
  });
}

function checkInput() {
  const inputContent = this.value.length;
  const maxLength = this.getAttribute("size");

  if (inputContent == maxLength) {
    console.log("length is 16");
    focusNextInput(this);
  }
}

function focusNextInput(element) {
  console.log("focusNextInput");
  if (element.name === "cvv") {
    element.blur();
  } else {
    const nextElement = element.parentElement.nextElementSibling.querySelector("input");
    nextElement.focus();
  }
}
