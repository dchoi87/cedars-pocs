document.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector(".search");
  var desktopSearchBtn = document.querySelector(".main__search-btn");
  var mobileSearchBtn = document.querySelector(".utility__search-btn");
  var mobileMenuBtn = document.querySelector(".utility__menu-btn");

  // desktop search
  desktopSearchBtn.addEventListener("click", function () {
    container.classList.add("expanded");
    document.querySelector(".yxt-SearchBar-input").focus();
  });
  // mobile search
  mobileSearchBtn.addEventListener("click", function () {
    if (container.matches(".expanded")) {
      container.classList.remove("expanded");
      this.classList.remove("active");
      mobileMenuBtn.classList.remove("disabled");
    } else {
      container.classList.add("expanded");
      document.querySelector(".yxt-SearchBar-input").focus();
      this.classList.add("active");
      mobileMenuBtn.classList.add("disabled");
    }
  });
  // exit search on document click
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
      if (container.matches(".expanded")) {
        container.classList.remove("expanded");
        mobileSearchBtn.classList.remove("active");
        mobileMenuBtn.classList.remove("disabled");
      }
    }
  });
  // exit search on esc
  document.addEventListener("keydown", function(event) {
    var key = event.key;
    if (key === "Escape") {
      container.classList.remove("expanded");
      mobileSearchBtn.classList.remove("active");
      mobileMenuBtn.classList.remove("disabled");
    }
  });
  // mobile menu
  mobileMenuBtn.addEventListener("click", function (event) {
    var main = document.querySelector(".main");

    if (main.matches(".expanded")) {
      main.classList.remove("expanded");
      this.classList.remove("active");
    } else {
      main.classList.add("expanded");
      this.classList.add("active");
    }
  });

});
