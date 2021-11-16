// ▶ JS confirmed - adding init classes ◀

const initPairs = [
    ['p-heroimg','opac-init'],
    ['proj-pg-desc', 'text-gradient-init'],
    ['projs', 'projs-init'],
    ['projs-card', 'projs-card-init'],
    ['projs-text', 'projs-text-init'],
    ['projs-slide-gall', 'projs-slide-gall-init']
];

const addInitClass = (base, addon) => {
    let baseGet = document.getElementsByClassName(base);
    for (currentItem of baseGet){
            currentItem.classList.add(addon)
        };
};    

initPairs.forEach((currentPair) => { addInitClass(currentPair[0], currentPair[1]) });

// ▶ gsap ◀
gsap.registerPlugin(CSSRulePlugin);

// horiz proj gallery scroll - try 1
let sections = gsap.utils.toArray(".projs-card-init");

// gsap.to( ".projs-card-init", {
//   xPercent: -100 * (sections.length - 1),
//   ease: "linear",
//   scrollTrigger: {
//     trigger: ".projs",
//     pin: true,
//     scrub: .5,
//     // markers: true,
//     snap: 1 / (sections.length - 1),
//     // base vertical scrolling on how wide the container is so it feels more natural.
//     start: "top 0%",
//     end: "+=300"
//   }
// });

gsap.to(sections, {
    xPercent: -100 * (sections.length -1),
    ease: "none",
    scrollTrigger: {
        trigger: ".projs",
        pin: true,
        start: 'top',        
        markers: true,
        scrub: 1,
    end: () => "+=" + (document.querySelector(".projs-slide-gall").offsetWidth / 2),
    }
})
// ▶ locomotive smooth scroll ◀

// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true
// });

// document.onreadystatechange = function () {
//     // because loco inits before all heights are rendered completely. need to refresh it.
//     if (document.readyState === 'complete') {
//         locoScroll.update();
//     }
//   }

