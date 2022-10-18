/**
 * Yext Search Loader
 * Sample HTML:
 * <div class="search-bar" data-answers-key="cedars-sinai-blog" data-answers-config='{"placeholderText": "Custom Placeholder Text"}'></div>
 */
var loader = {
  /**
   * [dependencies]
   * answers css and js dependencies; dynamically loaded using `loadjs`
   */
  dependencies: [
    "https://assets.sitescdn.net/answers-search-bar/v1.0/answers.css",
    "https://assets.sitescdn.net/answers-search-bar/v1.0/answerstemplates.compiled.min.js",
    "https://assets.sitescdn.net/answers-search-bar/v1.0/answers.min.js"
  ],
  /**
   * [defaults]
   * default answer properties
   */
  defaults: {
    "init": {
      apiKey: "beae47b088a08a60bd3f7192c6e18228",
      businessId: "3586571",
      experienceVersion: "PRODUCTION",
      locale: "en",
      experienceKey: "cedars-sinai-answers",
    },
    "cedars-sinai-answers": {
      container: ".search-bar",
      name: "search_form",
      redirectUrl: "/search.html",
      placeholderText: 'Search by Keyword, Symptom, or Condition',
      customIconUrl: 'https://search.cedars-sinai.org/static/assets/images/csmagnifyingglass.svg',
    },
    "cedars-sinai-answers-articles": {
      container: ".search-bar",
      name: "enews_search_form",
      redirectUrl: "/blog-and-magazines/enews-search-results-yext.html",
      placeholderText: 'Search Blog Articles',
      customIconUrl: 'https://search.cedars-sinai.org/static/assets/images/csmagnifyingglass.svg',
    }
  },
  /**
   * [getConfig]
   * updates and returns config with custom properties (if applicable)
   * @param {obj} data 
   * @returns final config obj
   */
  getConfig: function(data) {
    var init = {...this.defaults.init, templateBundle: TemplateBundle.default};
    var component = this.defaults[data.answersKey || "cedars-sinai-answers"];
    
    // update experience and container selector
    if (data.answersKey) {
      init.experienceKey = data.answersKey;
      component.container = `[data-answers-key='${data.answersKey}']`;
    }
    // override default config with custom from data attribute
    if (data.answersConfig) {
      try {
        component = {...component, ...JSON.parse(data.answersConfig)};
      } catch (e) {
        console.error(e);
      }
    }

    return { init: init, component: component };
  },
  /**
   * [init]
   * load answers dependencies and initialze search component
   */
  init: function() {
    var _self = this;
    
    loadjs(_self.dependencies, {
      success: function() {
        var containers = document.querySelectorAll(".search-bar");
  
        if (containers.length) {
          containers.forEach(function (container) {
            if (!container.innerHTML) {
              var config = _self.getConfig(container.dataset);
              // init
              try {
                ANSWERS.init(config.init);
                ANSWERS.addComponent("SearchBar", config.component);
              } catch (e) {
                console.error(e);
              }
              // remove data attributes
              container.removeAttribute("data-answers-key");
              container.removeAttribute("data-answers-config");
            }
          });
        }
      },
      error: function(e) {
        console.error("Dependencies unable to load:", e);
      }
    });
  }
}

loader.init();