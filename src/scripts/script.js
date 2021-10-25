gsap.registerPlugin(CSSRulePlugin);

//smooth scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        locoScroll.update();
    }
  }