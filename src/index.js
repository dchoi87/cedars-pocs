var isMobile = window.innerWidth < 768;

// TODO:
// 1. use event bubbling for all click events (may be cleaner than binding each element)
// 2. create mutation observer for overlay

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
        var isSearchExpanded = self.searchContainer.matches(".expanded");
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
        var isSearchExpanded = self.searchContainer.matches(".expanded");
        if (isSearchExpanded) {
          self.closeSeach();
        }
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

      if (!isMobile && self.main.matches(".expanded")) {
        self.toggleMenu();
      }
      if (isMobile && self.language.matches(".expanded") && !self.main.matches(".expanded")) {
        self.toggleMenu();
      }
      var mainExpanded = document.querySelector(".main__section.expanded");
      if (isMobile && mainExpanded) {
        self.closeMenu();
      }
    });
  },
  expandSearch: function () {
    var input = document.querySelector(".yxt-SearchBar-input");

    this.searchContainer.classList.add("expanded");
    input.focus();

    if (isMobile) {
      this.mobileSearchBtn.classList.add("active");
      this.mobileMenuBtn.classList.add("disabled");
    } else {
      this.overlay.style.display = "block";
    }
  },
  closeSeach: function () {
    this.searchContainer.classList.remove("expanded");
    this.overlay.style.display = "none";

    if (isMobile) {
      this.mobileSearchBtn.classList.remove("active");
      this.mobileMenuBtn.classList.remove("disabled");
    }
  },
  expandMenu: function(target) {
    var section = document.querySelector(`.main__section[data-id='${target.dataset.id}']`);
    var expanded = document.querySelector(".main__section.expanded");
    var active = document.querySelector(".main__link.active");

    if (target.dataset.id) {
      // section
      if (expanded) {
        expanded.classList.remove("expanded");
      }
      section.classList.add("expanded");
      // link
      if (active) {
        active.classList.remove("active");
      }
      target.classList.add("active");

      if (!isMobile) {
        this.overlay.style.display = "block";
      }
    }
  },
  closeMenu: function () {
    var expanded = document.querySelector(".main__section.expanded");
    var active = document.querySelector(".main__link.active");
    
    if (expanded) {
      expanded.classList.remove("expanded");
      active.classList.remove("active");
      this.overlay.style.display = "none";
    }
  },
  toggleMenu: function () {
    if (this.main.matches(".expanded")) {
      this.main.classList.remove("expanded");
      this.mobileMenuBtn.classList.remove("active");
    } else {
      this.main.classList.add("expanded");
      this.mobileMenuBtn.classList.add("active");
    }
  },
  expandLanguage: function () {
    this.language.classList.add("expanded");
    this.overlay.style.display = "block";
  },
  closeLanguage: function () {
    if (this.language.matches(".expanded")) {
      this.language.classList.remove("expanded");
      this.overlay.style.display = "none";
    }
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