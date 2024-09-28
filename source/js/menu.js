let body = null;
let menuButton = null;
let menu = null;

const bodyLockedClass = "locked";
let burgerButtonActiveClass = "";
let burgerButtonClosedClass = "";
let menuOpenClass = "";
let menuClosedClass = "";

let isSettedListener = false;

const removeActiveClasses = () => {
  menuButton.ariaExpanded = "false";
  menuButton.classList.remove(burgerButtonActiveClass);
  menuButton.classList.add(burgerButtonClosedClass);
  menu.classList.remove(menuOpenClass);
  menu.classList.add(menuClosedClass);
  body.classList.remove(bodyLockedClass);
};

const setActiveClasses = () => {
  menuButton.ariaExpanded = "true";
  menuButton.classList.remove(burgerButtonClosedClass);
  menuButton.classList.add(burgerButtonActiveClass);
  menu.classList.add(menuOpenClass);
  menu.classList.remove(menuClosedClass);
  body.classList.add(bodyLockedClass);
};

const mouseUpHandler = (evt) => {
  if (evt.target.closest("a") || evt.target.closest("button")) {
    evt.preventDefault();

    removeActiveClasses();
  }
};

const menuButtonClickHandler = (evt) => {
  evt.preventDefault();

  if (menuButton.classList.contains(burgerButtonActiveClass)) {
    removeActiveClasses();
  } else {
    setActiveClasses();
  }
};

const removeMainNavListener = () => {
  menu.removeEventListener("mouseup", mouseUpHandler);
};

const addMainNavListener = () => {
  menu.addEventListener("mouseup", mouseUpHandler);
};

const setMobileMenu = () => {
  if (!isSettedListener) {
    menuButton.addEventListener("click", menuButtonClickHandler);
    addMainNavListener();
    isSettedListener = true;
  }
};

const unsetMobileMenu = () => {
  if (isSettedListener) {
    menuButton.removeEventListener("click", menuButtonClickHandler);
    removeMainNavListener();

    removeActiveClasses();
    isSettedListener = false;
  }
};

const initMobileMenu = (button, nav) => {
  burgerButtonActiveClass = `${button}--opened`;
  burgerButtonClosedClass = `${button}--closed`;
  menuOpenClass = `${nav}--opened`;
  menuClosedClass = `${nav}--closed`;

  body = document.querySelector("body");
  menuButton = body.querySelector(`.${button}`);
  menu = body.querySelector(`.${nav}`);
};

export { initMobileMenu, setMobileMenu, unsetMobileMenu };
