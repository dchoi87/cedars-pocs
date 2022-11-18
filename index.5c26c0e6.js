class Navigation{constructor(){this.header=document.querySelector("header"),this.searchInput=this.header.querySelector(".yxt-SearchBar-input"),this.flyoutExpanded=this.header.querySelector(".main__flyout[data-expanded='true']"),this.mainAnchorActive=this.header.querySelector(".main__link[aria-expanded='true']")}expandSearch(){this.header.matches(".menu-expanded")&&this.closeMenu(),this.header.classList.add("search-expanded"),this.searchInput.focus()}closeSearch(){this.header.classList.remove("search-expanded")}expandMenu(e){var t=this.header.querySelector(`.main__flyout[data-id="${e.dataset.id}"]`);this.header.classList.add("menu-expanded"),isMobile&&this.header.classList.add("mobile"),t&&(this.resetExpandedState(),t.setAttribute("data-expanded",!0),e.setAttribute("aria-expanded",!0))}closeMenu(){this.header.classList.remove("menu-expanded"),this.header.classList.remove("mobile"),this.resetExpandedState()}resetExpandedState(){this.flyoutExpanded&&this.flyoutExpanded.setAttribute("data-expanded",!1),this.mainAnchorActive&&this.mainAnchorActive.setAttribute("aria-expanded",!1)}expandLanguageMenu(){this.header.classList.add("language-expanded")}closeLanguageMenu(){this.header.classList.remove("language-expanded")}getDataAttr(){var e=Array.from(document.querySelectorAll("header a, header button")).reduce((function(e,t){return t.matches(".js-yext-submit")||t.matches(".js-yxt-SearchBar-clear")||e.push({text:t.innerText.trim()||`Img: ${t.dataset.dmValue}`,href:t.href,dmCategory:t.dataset.dmCategory,dmEvent:t.dataset.dmEvent,dmType:t.dataset.dmType,dmValue:t.dataset.dmValue,type:t.tagName}),e}),[]);console.table(e)}}var nav=function(){return new Navigation};document.querySelector(".main__search-btn").addEventListener("click",(function(){nav().expandSearch()})),document.querySelector(".utility__search-btn").addEventListener("click",(function(){document.querySelector("header").matches(".search-expanded")?nav().closeSearch():nav().expandSearch()})),document.querySelector(".utility__menu-btn").addEventListener("click",(function(e){document.querySelector("header").matches(".menu-expanded")?(nav().closeMenu(),this.setAttribute("aria-label","Menu Button")):(nav().expandMenu(e.target),this.setAttribute("aria-label","Close Button"))})),document.querySelectorAll(".main__link").forEach((function(e){e.addEventListener("click",(function(e){!isMobile&&e.target.ariaExpanded&&(e.preventDefault(),nav().expandMenu(e.target))}))})),document.querySelectorAll(".main__close-btn").forEach((function(e){e.addEventListener("click",(function(){nav().closeMenu()}))})),document.querySelectorAll(".utility__language").forEach((function(e){e.addEventListener("click",(function(){nav().expandLanguageMenu()}))})),document.querySelector(".language__close-btn").addEventListener("click",(function(){nav().closeLanguageMenu()})),document.addEventListener("click",(function(e){var t=document.querySelector(".search-expanded"),a=document.querySelector(".language-expanded"),n=document.querySelector(".menu-expanded");e.target.closest(".main__search-btn, .utility__search-btn, .yxt-SearchBar-input, .yxt-SearchBar-autocomplete")||t&&nav().closeSearch(),e.target.closest(".main, .utility")||isMobile||n&&nav().closeMenu(),e.target.closest(".utility__language, .language")||a&&nav().closeLanguageMenu()})),document.addEventListener("keydown",(function(e){var t=document.querySelector(".search-expanded"),a=document.querySelector(".language-expanded"),n=document.querySelector(".menu-expanded");"Escape"===e.key&&(t&&nav().closeSearch(),n&&nav().closeMenu(),a&&nav().closeLanguageMenu())}));var isMobile=window.innerWidth<768;window.addEventListener("resize",(function(){isMobile=window.innerWidth<768}));