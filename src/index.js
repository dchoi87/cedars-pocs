var isMobile = window.innerWidth < 768;

var navigation = {
  init: function () {
    var self = this;
    if (!this.header) return;

    document.addEventListener("click", function (event) {
      // main search
      if (event.target.matches(".main__search-btn")) {
        self.expandSearch();
      }
      // mobile search
      if (event.target.matches(".utility__search-btn")) {
        var header = document.querySelector("header");
        var isSearchExpanded = header.matches(".search-expanded");
        isSearchExpanded ? self.closeSeach() : self.expandSearch();
      }
      // hamburger menu
      if (event.target.matches(".utility__menu-btn")) {
        self.toggleMenu();
      }
      // flyout link
      if (event.target.matches(".main__link")) {
        self.expandMenu(event.target);
      }
      // flyout close
      if (event.target.matches(".main__close-btn")) {
        self.closeMenu();
      }
      // language
      if (event.target.matches(".utility__language")) {
        self.expandLanguage();
      }
      // language close
      if (event.target.matches(".language__close-btn")) {
        self.closeLanguage();
      }
      // click to close
      if (!event.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
        self.closeSeach();
      }
      if (!event.target.closest(".main__section, .main__container, .utility")) {
        self.closeMenu();
      }
      if (!event.target.closest(".utility__language, .language")) {
        self.closeLanguage();
      }
    });
    // escape to close
    document.addEventListener("keydown", function(event) {
      var key = event.key;

      if (key === "Escape") {
        self.closeSeach();
      }
    });
    // window resize event
    window.addEventListener("resize", function() {
      isMobile = window.innerWidth < 768;
    });
  },
  // search-expanded, menu-expanded, language-expanded
  expandSearch: function () {
    var header = document.querySelector("header");
    var input = document.querySelector(".yxt-SearchBar-input");
    header.classList.add("search-expanded");
    input.focus();
  },
  closeSeach: function () {
    var header = document.querySelector("header");
    header.classList.remove("search-expanded");
  },
  expandMenu: function(target) {
    var header = document.querySelector("header");
    var section = document.querySelector(`.main__section[data-id='${target.dataset.id}']`);
    var expanded = document.querySelector(`.main__section[data-expanded="true"]`);
    var activeLink = document.querySelector(`.main__link[aria-expanded="true"]`);
    header.classList.add("menu-expanded");
    expanded && expanded.setAttribute("data-expanded", false);
    section.setAttribute("data-expanded", true);
    activeLink && activeLink.setAttribute("aria-expanded", false);
    target.setAttribute("aria-expanded", true);
  },
  closeMenu: function () {
    var header = document.querySelector("header");
    var expanded = document.querySelector(`.main__section[data-expanded="true"]`);
    var activeLink = document.querySelector(`.main__link[aria-expanded="true"]`);
    header.classList.remove("menu-expanded");
    expanded && expanded.setAttribute("data-expanded", false);
    activeLink && activeLink.setAttribute("aria-expanded", false);
  },
  toggleMenu: function () {
    var header = document.querySelector("header");
    if (header.matches(".menu-expanded")) {
      header.classList.remove("menu-expanded");
    } else {
      header.classList.add("menu-expanded");
    }
  },
  expandLanguage: function () {
    var header = document.querySelector("header");
    header.classList.add("language-expanded");
  },
  closeLanguage: function () {
    var header = document.querySelector("header");
    header.classList.remove("language-expanded");
  },
  logDataAttribute: function () {
    var _array = Array.from(document.querySelectorAll("header a, header button"));
    var _data = _array.reduce(function(acc, curr) {
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
    console.table(_data);
  },
  header: document.querySelector("header.header"),
  searchContainer: document.querySelector(".search"),
  searchBtn: document.querySelector(".main__search-btn"),
  mobileSearchBtn: document.querySelector(".utility__search-btn"),
  mobileMenuBtn: document.querySelector(".utility__menu-btn"),
  main: document.querySelector(".main"),
  mainLinks: document.querySelector(".main__links"),
  mainCloseBtns: document.querySelectorAll(".main__close-btn"),
  overlay: document.querySelector(".overlay"),
  language: document.querySelector(".language"),
  languageBtn: document.querySelectorAll(".utility__language"),
  languageCloseBtn: document.querySelector(".language__close-btn"),
}
navigation.init();