class Navigation {
  constructor () {
    this.header = document.querySelector("header");
    this.searchInput = this.header.querySelector(".yxt-SearchBar-input");
    this.flyoutExpanded = this.header.querySelector(".main__flyout[data-expanded='true']");
    this.mainAnchorActive = this.header.querySelector(".main__link[aria-expanded='true']");
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
  }
  expandMenu (target) {
    var section = this.header.querySelector(`.main__flyout[data-id="${target.dataset.id}"]`);

    this.header.classList.add("menu-expanded");
    if (isMobile) {
      this.header.classList.add("mobile");
    }
    if (section) {
      this.resetExpandedState();
      section.setAttribute("data-expanded", true);
      target.setAttribute("aria-expanded", true);
    }
  }
  closeMenu () {
    this.header.classList.remove("menu-expanded");
    this.header.classList.remove("mobile");
    this.resetExpandedState();
  }
  resetExpandedState () {
    this.flyoutExpanded && this.flyoutExpanded.setAttribute("data-expanded", false);
    this.mainAnchorActive && this.mainAnchorActive.setAttribute("aria-expanded", false);
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
    this.setAttribute("aria-label", "Menu Button");
  } else {
    nav().expandMenu(event.target);
    this.setAttribute("aria-label", "Close Button");
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
      nav().closeSearch();
    }
  }
  if (!event.target.closest(".main, .utility") && !isMobile) {
    if (menu) {
      nav().closeMenu();
    }
  }
  if (!event.target.closest(".utility__language, .language")) {
    if (language) {
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