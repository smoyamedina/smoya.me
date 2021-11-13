// JS confirmed classes
const insertClass = (base, addon) => { 
    document.querySelector(`${base}`).classList.add(`${addon}`)
}

insertClass('.p-heroimg','opac-init')
insertClass('.proj-pg-desc', 'text-gradient-init')


gsap.registerPlugin(CSSRulePlugin);

//smooth scroll
// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true
// });

document.onreadystatechange = function () {
    // because loco inits before all heights are rendered completely. need to refresh it.
    if (document.readyState === 'complete') {
        locoScroll.update();
    }
  }

