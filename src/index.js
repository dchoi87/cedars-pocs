class Navigation {
  constructor () {
    this.header = document.querySelector("header");
    this.searchInput = this.header.querySelector(".yxt-SearchBar-input");
    this.searchBtn = this.header.querySelector(".main__search-btn");
    this.sectionExpanded = this.header.querySelector(".main__section[data-expanded='true']");
    this.mainAnchorActive = this.header.querySelector(".main__link[aria-expanded='true']");
    this.language = this.header.querySelector(".language");
    this.languageBtn = this.header.querySelector(".utility__language");
  }
  expandSearch () {
    if (this.header.matches(".menu-expanded")) {
      this.closeMenu();
    }
    this.header.classList.add("search-expanded");
    this.searchInput.focus();
  }
  closeSearch () {
    this.header.classList.remove("search-expanded");
    this.searchBtn.focus();
  }
  expandMenu (target) {
    var section = this.header.querySelector(`.main__section[data-id="${target.dataset.id}"]`);

    this.header.classList.add("menu-expanded");
    if (isMobile) {
      this.header.classList.add("mobile");
    }
    if (section) {
      this.resetExpandedState();
      section.setAttribute("data-expanded", true);
      target.setAttribute("aria-expanded", true);
    }
    section.querySelector("a").focus();
  }
  closeMenu () {
    this.header.classList.remove("menu-expanded");
    this.header.classList.remove("mobile");
    this.resetExpandedState();
    this.mainAnchorActive.focus();
  }
  resetExpandedState () {
    this.sectionExpanded && this.sectionExpanded.setAttribute("data-expanded", false);
    this.mainAnchorActive && this.mainAnchorActive.setAttribute("aria-expanded", false);
  }
  expandLanguageMenu () {
    this.header.classList.add("language-expanded");
    this.language.querySelector("a").focus();
  }
  closeLanguageMenu () {
    this.header.classList.remove("language-expanded");
    this.languageBtn.focus();
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
    if (!isMobile && event.target.ariaExpanded) {
      event.preventDefault();
      nav().expandMenu(event.target);
    }
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
  var search = document.querySelector(".search-expanded");
  var language = document.querySelector(".language-expanded");
  var menu = document.querySelector(".menu-expanded");

  if (!event.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
    if (search) {
      console.log("outside click - search");
      nav().closeSearch();
    }
  }
  if (!event.target.closest(".main, .utility") && !isMobile) {
    if (menu) {
      console.log("outside click - menu");
      nav().closeMenu();
    }
  }
  if (!event.target.closest(".utility__language, .language")) {
    if (language) {
      console.log("outside click - language");
      nav().closeLanguageMenu();
    }
  }
});

document.addEventListener("keydown", function(event) {
  var search = document.querySelector(".search-expanded");
  var language = document.querySelector(".language-expanded");
  var menu = document.querySelector(".menu-expanded");

  if (event.key === "Escape") {
    if (search) {
      nav().closeSearch();
    }
    if (menu) {
      nav().closeMenu();
    }
    if (language) {
      nav().closeLanguageMenu();
    }
  }
});

var isMobile = window.innerWidth < 768;
window.addEventListener("resize", function() {
  isMobile = window.innerWidth < 768;
});