import initWebpSupport from "./webp-support.js";
import { initMobileMenu, setMobileMenu, unsetMobileMenu } from "./menu.js";
import {
  initNavScroll,
  checkIsScrollPossible,
  setNavigation,
  destroyNavigation,
} from "./navigation.js";
import {
  initBottomMenu,
  menuVisibilityHandler,
  setBottomMenu,
  unsetBottomMenu,
} from "./bottom-menu.js";

const VIEWPORTS = {
  tablet: 768,
  desktop: 1024,
};

let isNavigationActive = false;
let isBottomMenuActive = false;

const mediaQueryTablet = window.matchMedia(
  `(min-width: ${VIEWPORTS.tablet}px)`
);
const mediaQueryDesktop = window.matchMedia(
  `(min-width: ${VIEWPORTS.desktop}px)`
);

const tabletScreenSizeHandler = (mql) => {
  if (mql.matches) {
    isBottomMenuActive = false;
    unsetMobileMenu();
    unsetBottomMenu();
  } else {
    isBottomMenuActive = true;
    setMobileMenu();
    setBottomMenu();
  }
};

const desktopScreenSizeHandler = (mql) => {
  if (mql.matches) {
    isNavigationActive = true;
    setNavigation();
  } else {
    isNavigationActive = false;
    destroyNavigation();
  }
};

const actualResizeHandler = () => {
  if (isNavigationActive) {
    checkIsScrollPossible();
  }

  if (isBottomMenuActive) {
    menuVisibilityHandler();
  }
};

let resizeTimeout;
const resizeThrottler = () => {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  initWebpSupport();
  initMobileMenu("header__burger-btn", "catalog-nav");
  initBottomMenu("bottom-menu", ".header", ".footer");
  initNavScroll({
    navCls: ".main-nav",
    navListCls: ".main-nav__list",
    itemCls: ".main-nav__item",
    btnCls: "main-nav__btn",
  });

  tabletScreenSizeHandler(mediaQueryTablet);
  desktopScreenSizeHandler(mediaQueryDesktop);

  mediaQueryTablet.addEventListener("change", tabletScreenSizeHandler);
  mediaQueryDesktop.addEventListener("change", desktopScreenSizeHandler);

  window.addEventListener("resize", resizeThrottler, false);
});
