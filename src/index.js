class Navigation {
  constructor () {
    this.header = document.querySelector("header");
    this.search = this.header.querySelector(".yxt-SearchBar-input");
    this.section = this.header.querySelector(".main__section");
    this.sectionExpanded = this.header.querySelector(".main__section[data-expanded='true']");
    this.linkMain = this.header.querySelector(".main__link");
    this.linkMainActive = this.header.querySelector(".main__link[aria-expanded='true']");
  }
  expandSearch () {
    if (this.header.matches(".menu-expanded")) {
      this.closeMenu();
    }
    this.header.classList.add("search-expanded");
    this.search.focus();
  }
  closeSearch () {
    this.header.classList.remove("search-expanded");
  }
  expandMenu (target) {
    var section = this.header.querySelector(`.main__section[data-id="${target.dataset.id}"]`);

    this.header.classList.add("menu-expanded");
    if (section) {
      this.resetExpandedState();
      section.setAttribute("data-expanded", true);
      target.setAttribute("aria-expanded", true);
    }
  }
  closeMenu () {
    this.header.classList.remove("menu-expanded");
    this.resetExpandedState();
  }
  resetExpandedState () {
    this.sectionExpanded && this.sectionExpanded.setAttribute("data-expanded", false);
    this.linkMainActive && this.linkMainActive.setAttribute("aria-expanded", false);
  }
  expandLanguageMenu () {
    this.header.classList.add("language-expanded");
  }
  closeLanguageMenu () {
    this.header.classList.remove("language-expanded");
  }
  getDataAttr () {
    var array = Array.from(document.querySelectorAll("header a, header button"));
    var data = array.reduce(function(acc, curr) {
      var isYextButton = curr.matches(".js-yext-submit") || curr.matches(".js-yxt-SearchBar-clear");
      if (!isYextButton) {
        acc.push({
          text: curr.innerText.trim() || `Img: ${curr.dataset.dmValue}`,
          href: curr.href,
          dmCategory: curr.dataset.dmCategory,
          dmEvent: curr.dataset.dmEvent,
          dmType: curr.dataset.dmType,
          dmValue: curr.dataset.dmValue,
          type: curr.tagName
        });
      }
      return acc;
    }, []);
    console.table(data);
  }
}
// class alias
var nav = function () {
  return new Navigation();
};
// event listeners
document.querySelector(".main__search-btn").addEventListener("click", function () {
  nav().expandSearch();
});
document.querySelector(".utility__search-btn").addEventListener("click", function () {
  var header = document.querySelector("header");

  if (header.matches(".search-expanded")) {
    nav().closeSearch();
  } else {
    nav().expandSearch();
  }
});
document.querySelector(".utility__menu-btn").addEventListener("click", function (event) {
  var header = document.querySelector("header");
  
  if (header.matches(".menu-expanded")) {
    nav().closeMenu();
  } else {
    nav().expandMenu(event.target);
  }
});
document.querySelectorAll(".main__link").forEach(function (el) {
  el.addEventListener("click", function (event) {
    nav().expandMenu(event.target);
  });
});
document.querySelectorAll(".main__close-btn").forEach(function (el) {
  el.addEventListener("click", function () {
    nav().closeMenu();
  });
});
document.querySelectorAll(".utility__language").forEach(function (el) {
  el.addEventListener("click", function () {
    nav().expandLanguageMenu();
  });
});
document.querySelector(".language__close-btn").addEventListener("click", function () {
  nav().closeLanguageMenu();
});
document.addEventListener("click", function(event) {
  if (!event.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
    nav().closeSearch();
  }
  if (!event.target.closest(".main, .utility") && !isMobile) {
    nav().closeMenu();
  }
  if (!event.target.closest(".utility__language, .language")) {
    nav().closeLanguageMenu();
  }
});
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    nav().closeSearch();
  }
});
var isMobile = window.innerWidth < 768;
window.addEventListener("resize", function() {
  isMobile = window.innerWidth < 768;
});