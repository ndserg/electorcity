let body = "";
let nav = "";
let navList = "";
let links = "";
let btnPrev = "";
let btnNext = "";
let btnMainClas = "";
let isActiveNav = true;

const getContentWidth = (element) => {
  let widthWithPaddings = element.clientWidth;
  const elementComputedStyle = window.getComputedStyle(element, null);
  return (
    widthWithPaddings -
    parseFloat(elementComputedStyle.paddingLeft) -
    parseFloat(elementComputedStyle.paddingRight)
  );
};

const checkIsScrollPossible = () => {
  const padding =
    (nav.getBoundingClientRect().width - getContentWidth(navList)) / 2;

  const isLeftVisible =
    Math.floor(links[0].getBoundingClientRect().left) - padding >=
    Math.floor(nav.getBoundingClientRect().left);

  const isRightVisible =
    Math.floor(links[links.length - 1].getBoundingClientRect().right) +
      padding <=
    nav.getBoundingClientRect().right;

  if (isLeftVisible || !isActiveNav) {
    btnPrev.classList.add(`${btnMainClas}--hidden`);
  } else {
    btnPrev.classList.remove(`${btnMainClas}--hidden`);
  }

  if (isRightVisible || !isActiveNav) {
    btnNext.classList.add(`${btnMainClas}--hidden`);
  } else {
    btnNext.classList.remove(`${btnMainClas}--hidden`);
  }
};

const prevClickHandler = (evt) => {
  evt.preventDefault();

  navList.scrollLeft -= 200;
};

const nextClickHandler = (evt) => {
  evt.preventDefault();

  navList.scrollLeft += 200;
};

const setNavigation = () => {
  isActiveNav = true;
  btnPrev.addEventListener("click", prevClickHandler);
  btnNext.addEventListener("click", nextClickHandler);
  navList.addEventListener("scrollend", checkIsScrollPossible);
  checkIsScrollPossible();
};

const destroyNavigation = () => {
  isActiveNav = false;
  navList.removeEventListener("scrollend", checkIsScrollPossible);
  btnPrev.removeEventListener("click", prevClickHandler);
  btnNext.removeEventListener("click", nextClickHandler);

  btnPrev.classList.add(`${btnMainClas}--hidden`);
  btnNext.classList.add(`${btnMainClas}--hidden`);
};

const initNavScroll = (options) => {
  const { navCls, navListCls, itemCls, btnPrevCls, btnCls } = options;

  btnMainClas = btnCls;
  body = document.querySelector("body");
  nav = body.querySelector(navCls);
  navList = nav.querySelector(navListCls);
  links = nav.querySelectorAll(itemCls);
  btnPrev = nav.querySelector(`.${btnCls}--prev`);
  btnNext = nav.querySelector(`.${btnCls}--next`);
};

export {
  initNavScroll,
  checkIsScrollPossible,
  setNavigation,
  destroyNavigation,
};
