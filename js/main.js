(function () {
  "use strict";

  const ELEMENT = document.documentElement;

  /**
   * Selector function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const getElement = (el, type) => {
    el = el.trim();
    switch (type) {
      case "id":
        return document.getElementById(el);
      case "className":
        return document.getElementsByClassName(el);
      case "name":
        return document.getElementsByName(el);
      case "tagName":
        return document.getElementsByTagName(el);
      default:
        break;
    }
  };

  /**
   * Type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Toggle Dark - Light
   */
  const toggleSwitch = select('.switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem("theme");

  function setText(e) {
    let text = "&#127769;";
    if (e === "light") {
      text = "&#127774;";
    }
    getElement("toggle-text", "id").innerHTML = text;
  }

  if (currentTheme) {
    ELEMENT.setAttribute("data-theme", currentTheme);
    if (currentTheme === "light") {
      toggleSwitch.checked = true;
      setText(currentTheme);
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      ELEMENT.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setText("light");
    } else {
      ELEMENT.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setText("dark");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  /**
   * Slide show work
   */
  var slideIndex = 1;

  function showWork(n) {
    var i;
    var x = getElement("itemWork", "className");
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
  }

  function plusWork(n) {
    showWork((slideIndex += n));
  }

  function initLoopImg(n) {
    showWork(slideIndex);
    setInterval(function(){
      plusWork(+1);
    },2000);
  }

  if (window.innerWidth < 700) {
    window.onload = initLoopImg()
    getElement("navigate", "id").style.display = "flex";
    showWork(slideIndex);
    var post = getElement("post", "id");
    var prev = getElement("prev", "id");
    post.addEventListener("click", (event) => {
      plusWork(-1);
    });
    prev.addEventListener("click", (event) => {
      plusWork(+1);
    });
  }

  /**
   * Slide show work
   */
  var items = select(".timeline ul li", true);

  function isItemInView(item) {
    var rect = item.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || ELEMENT.clientHeight) &&
      rect.right <= (window.innerWidth || ELEMENT.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isItemInView(items[i])) {
        items[i].classList.add("show");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();
