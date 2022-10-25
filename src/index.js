window.addEventListener("DOMContentLoaded", function () {
  var searchContainer = document.querySelector(".search");

  document.addEventListener("click", function (event) {
    var searchBtn = this.querySelector(".main__search button");

    if (searchBtn.contains(event.target)) {
      // searchContainer.style.display = "block";
      searchContainer.classList.add("expanded");
      document.querySelector(".yxt-SearchBar-input").focus();
    } else {
      // searchContainer.style.display = "none";
      searchContainer.classList.remove("expanded");
    }
  });
});