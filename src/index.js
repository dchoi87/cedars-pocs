/**
 * navigation methods
 */
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

/**
 * alias
 */
var nav = function () {
  return new Navigation();
};

/**
 * event listeners
 */
// main search
document.querySelector(".main__search-btn").addEventListener("click", function () {
  nav().expandSearch();
});
// mobile search
document.querySelector(".utility__search-btn").addEventListener("click", function () {
  var header = document.querySelector("header");

  if (header.matches(".search-expanded")) {
    nav().closeSearch();
  } else {
    nav().expandSearch();
  }
});
// hamburger menu
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
// main links
document.querySelectorAll(".main__link").forEach(function (el) {
  el.addEventListener("click", function (event) {
    if (!isMobile && event.currentTarget.ariaExpanded) {
      event.preventDefault();
      nav().expandMenu(event.currentTarget);
    }
  });
});
// flyout close
document.querySelectorAll(".main__close-btn").forEach(function (el) {
  el.addEventListener("click", function () {
    nav().closeMenu();
  });
});
// language modal
document.querySelectorAll(".utility__language").forEach(function (el) {
  el.addEventListener("click", function () {
    nav().expandLanguageMenu();
  });
});
// language close
document.querySelector(".language__close-btn").addEventListener("click", function () {
  nav().closeLanguageMenu();
});
// language select
document.querySelectorAll(".language__grid a").forEach(function (el) {
  el.addEventListener("click", function () {
    var languageHeader = document.querySelector(".language__selected span");
    var utilityHeader = document.querySelector(".utility__language span");
    var active = document.querySelector(".language__grid a.active");
    // translate
    doGTranslate(this.dataset.id);
    languageHeader.innerText = this.innerText;
    utilityHeader.innerText = this.innerText;
    // active class
    active.classList.remove("active");
    this.classList.add("active");
  });
});
// close on outside click
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
// close on escape
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
// window resize
var isMobile = window.innerWidth < 768;
window.addEventListener("resize", function() {
  isMobile = window.innerWidth < 768;
});
// translations - pulled from translations.js
var $selectedTranslation = $(".language__selected span");
var $translationBtnLabel = $(".utility__language span");

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
function getTransLabel(transCode) {
  var st = '.language__grid a[data-id="' + transCode + '"]';
  var $selectedText = $(st);
  var selectedText = '';
  $selectedText.each(function(){
    selectedText = $(this).text();
  });
  return selectedText;
}

$(function() {
  var urlTrans = getParameterByName('trans');
  if(urlTrans) {
    var trans = 'en|' + urlTrans;
    doGTranslate(trans);
    $selectedTranslation.text(getTransLabel(trans));
  } else {
    var googletrans = readCookie("googtrans");
    if(googletrans) {
      var transArr = googletrans.split('/');
      if(transArr.length > 1) {
        var tr = "en|" + transArr[transArr.length - 1];
        $selectedTranslation.text(getTransLabel(tr));
        $translationBtnLabel.text(getTransLabel(tr));
      }
    }
  }
})
