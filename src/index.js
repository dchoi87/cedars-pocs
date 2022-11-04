var isMobile = window.innerWidth < 768;

var navigation = {
  init: function () {
    var self = this;

    if (!this.header) return;
    // desktop search
    this.searchBtn.addEventListener("click", function () {
      self.expandSearch();
    });
    // mobile search
    this.mobileSearchBtn.addEventListener("click", function () {
      var isSearchExpanded = self.searchContainer.matches(".expanded");

      if (isSearchExpanded) {
        self.closeSeach();
      } else {
        self.expandSearch();
      }
    });
    // document click to close
    document.addEventListener("click", function (event) {
      var isSearchExpanded = self.searchContainer.matches(".expanded");

      if (!event.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
        if (isSearchExpanded) {
          self.closeSeach();
        }
      }
      if (!event.target.closest(".main__section, .main__container, .utility")) {
        self.closeMenu();
      }
    });
    // escape to close
    document.addEventListener("keydown", function(event) {
      var key = event.key;

      if (key === "Escape") {
        self.closeSeach();
      }
    });
    // mobile menu
    this.mobileMenuBtn.addEventListener("click", function () {
      self.toggleMenu();
    });
    // main menu
    this.mainLinks.addEventListener("click", function (event) {
      self.expandMenu(event.target);
    });
    // section close
    this.mainCloseBtns.forEach(function(el) {
      el.addEventListener("click", function () {
        self.closeMenu();
      });
    });
    // window resize event
    window.addEventListener("resize", function() {
      isMobile = window.innerWidth < 768;
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

      console.log(isMobile);

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

  header: document.querySelector("header.header"),
  searchContainer: document.querySelector(".search"),
  searchBtn: document.querySelector(".main__search-btn"),
  mobileSearchBtn: document.querySelector(".utility__search-btn"),
  mobileMenuBtn: document.querySelector(".utility__menu-btn"),
  main: document.querySelector(".main"),
  mainLinks: document.querySelector(".main__links"),
  mainCloseBtns: document.querySelectorAll(".main__close-btn"),
  overlay: document.querySelector(".overlay"),
}
navigation.init();