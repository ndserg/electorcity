let body = null;
let header = null;
let footer = null;
let bottomMenu = null;
let bottomMenuOpenClass = "";
let bottomMenuClosedClass = "";

let isMenuShown = false;

const showMenu = () => {
  isMenuShown = true;
  bottomMenu.classList.add(bottomMenuOpenClass);
  bottomMenu.classList.remove(bottomMenuClosedClass);
};

const hideMenu = () => {
  isMenuShown = false;
  bottomMenu.classList.remove(bottomMenuOpenClass);
  bottomMenu.classList.add(bottomMenuClosedClass);
};

const checkHeaderPosition = () => {
  const isHidden =
    header.getBoundingClientRect().height / 2 - window.pageYOffset <= 0;

  return isHidden;
};

const checkFooterPosition = () => {
  const isHidden =
    footer.getBoundingClientRect().bottom -
      footer.getBoundingClientRect().height / 2 >=
    window.innerHeight;

  return isHidden;
};

const menuVisibilityHandler = () => {
  if (checkHeaderPosition() && checkFooterPosition()) {
    if (!isMenuShown) {
      showMenu();
    }
  } else {
    if (isMenuShown) {
      hideMenu();
    }
  }
};

const setBottomMenu = () => {
  menuVisibilityHandler();

  window.addEventListener("scroll", menuVisibilityHandler, false);
};

const unsetBottomMenu = () => {
  hideMenu();

  window.removeEventListener("scroll", menuVisibilityHandler, false);
};

const initBottomMenu = (menuCls, headerCls, footerCls) => {
  body = document.querySelector("body");
  bottomMenu = body.querySelector(`.${menuCls}`);
  header = body.querySelector(headerCls);
  footer = body.querySelector(footerCls);

  bottomMenuOpenClass = `${menuCls}--opened`;
  bottomMenuClosedClass = `${menuCls}--closed`;
};

export {
  initBottomMenu,
  menuVisibilityHandler,
  setBottomMenu,
  unsetBottomMenu,
};
