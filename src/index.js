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
  
});

// const targetNode = document.querySelector('.yxt-AutoComplete-wrapper');

// console.log(targetNode)

// const config = { attributes: true, childList: true, subtree: false };

// const callback = (mutationList, observer) => {
//   console.log(mutationList)
//   // for (const mutation of mutationList) {
//   //   if (mutation.type === 'childList') {
//   //     console.log('A child node has been added or removed.');
//   //   } else if (mutation.type === 'attributes') {
//   //     console.log(`The ${mutation.attributeName} attribute was modified.`);
//   //   }
//   // }
// };

// const observer = new MutationObserver(callback);

// observer.observe(targetNode, config);