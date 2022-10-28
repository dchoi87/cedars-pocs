window.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector(".search");
  var button = document.querySelector(".main__search button");

  button.addEventListener("click", function (event) {
    container.classList.add("expanded");
    document.querySelector(".yxt-SearchBar-input").focus();
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".main__search button, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")) {
      // guard?
      container.classList.remove("expanded");
    }
  });
  
  document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (key === "Escape") {
      container.classList.remove("expanded");
    }
  });
});
