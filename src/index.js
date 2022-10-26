window.addEventListener("DOMContentLoaded", function () {
  var container = document.querySelector(".search");

  document.addEventListener("click", function (event) {
    var button = this.querySelector(".main__search button");
    var input = this.querySelector(".yxt-SearchBar-input");
    var main = this.querySelector(".main__container");

    if (button.contains(event.target) || input.contains(event.target)) {
      container.classList.add("expanded");
      document.querySelector(".yxt-SearchBar-input").focus();

      // main.style.display = 'none';
    } else {
      container.classList.remove("expanded");
      // main.style.display = '';
    }
  });
});