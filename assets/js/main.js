/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => navMenu.classList.add("show-menu"));
}
if (navClose) {
  navClose.addEventListener("click", () => navMenu.classList.remove("show-menu"));
}
document.querySelectorAll(".nav__link").forEach((n) =>
  n.addEventListener("click", () => navMenu.classList.remove("show-menu"))
);

/*==================== SKILLS ACCORDION ====================*/
const skillsHeaders = document.querySelectorAll(".skills__header");

skillsHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const parent = header.parentNode;
    const isOpen = parent.classList.contains("skills__open");

    document.querySelectorAll(".skills__content").forEach((c) => {
      c.classList.remove("skills__open");
      c.classList.add("skills__close");
    });

    if (!isOpen) {
      parent.classList.add("skills__open");
      parent.classList.remove("skills__close");
    }
    header.setAttribute("aria-expanded", String(!isOpen));
  });
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tc) => tc.classList.remove("qualification__active"));
    target.classList.add("qualification__active");

    tabs.forEach((t) => {
      t.classList.remove("qualification__active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("qualification__active");
    tab.setAttribute("aria-selected", "true");
  });
});

/*==================== ACTIVE LINK ON SCROLL ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id"),
      link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== HEADER SHADOW & SCROLL UP ====================*/
function scrollFx() {
  const header = document.getElementById("header"),
    scrollUp = document.getElementById("scroll-up");

  if (header) header.classList.toggle("scroll-header", window.scrollY >= 80);
  if (scrollUp) scrollUp.classList.toggle("show-scroll", window.scrollY >= 560);
}
window.addEventListener("scroll", scrollFx);

/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";

function storage(action, value) {
  try {
    return action === "get"
      ? localStorage.getItem("selected-theme")
      : localStorage.setItem("selected-theme", value);
  } catch (e) {
    return null;
  }
}

const savedTheme = storage("get");
if (savedTheme) {
  document.body.classList.toggle(darkTheme, savedTheme === "dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add(darkTheme);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    const isDark = document.body.classList.contains(darkTheme);
    storage("set", isDark ? "dark" : "light");
    themeButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  });
}
