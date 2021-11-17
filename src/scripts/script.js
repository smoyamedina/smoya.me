// ▶ JS confirmed - adding init classes ◀
// mostly doing this to force myself to learn what I can do with CSS alone
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

// ▶ locomotive smooth scroll ◀

// const scrollContainer = '[data-scroll-container]'

// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector(scrollContainer),
//     smooth: true
// });

// document.onreadystatechange = function () {
//     // because loco inits before all heights are rendered completely. need to refresh it.
//     if (document.readyState === 'complete') {
//         locoScroll.update();
//     }
// }
// locoScroll.on("scroll", ScrollTrigger.update);

// // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
// ScrollTrigger.scrollerProxy(scrollContainer, {
//     scrollTop(value) {
//       return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//     getBoundingClientRect() {
//       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//     },
//     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//     pinType: document.querySelector(scrollContainer).style.transform ? "transform" : "fixed"
//   });

// ▶ gsap ◀
gsap.registerPlugin(CSSRulePlugin);

const projCardCount = document.getElementsByClassName('projs-card').length

let textRevealEndStd = "center 10%"
let textRevealEndLast = "center 30%"

let textReveal = (projNum, endVals) => {
    const tl = gsap.timeline({
      defaults: {duration: 1},
      scrollTrigger: {
        trigger: `.projs-card:nth-child(${projNum})`,
        scrub: 1.5,
        // scroller: scrollContainer,
        // markers: true,
        start: "center 90%",
        end: endVals,
        toggleActions: 'play reverse play reverse',
      }
    })
    tl.from (`.projs-card:nth-child(${projNum}) .projs-text`, {"clipPath": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: .1})
    tl.from(`.projs-card:nth-child(${projNum}) .projs-text`, {y:'20', opacity: 0, duration: 0.2}, 0)
    tl.to(`.projs-card:nth-child(${projNum}) .projs-text`, {y:'-20', opacity: 0, duration: 0.2}, 0.85)
    tl.to (`.projs-card:nth-child(${projNum}) .projs-text`, {"clipPath": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration: .1})
}
  
for (i=1; i <= projCardCount ; i++) {
    const projNameContain = document.querySelector(`.projs-card:nth-child(${i}) .projs-text`)
    //check if div exists to avoid warnings in console
    if (projNameContain !== null) {
        if (i < projCardCount === true) {
            textReveal(i, textRevealEndStd)
        } else {
            textReveal(i, textRevealEndLast)
        }
    }
} 

//test transition
// let projReveal = (projNum) => {
// gsap.from(`.projs-card:nth-child(${projNum}) .projs-img`, {
//     duration: .5,
//     opacity: 0.4,
//     ease: "expo.inOut",
//     scrollTrigger: {
//         trigger:`.projs-card:nth-child(${projNum})`,
//         markers: true,
//         start: "top 50%",
//         end: "bottom 60%",
//         // scroller: ".smooth-scroll",
//         toggleActions: "play reverse play reverse",
//         // scrub: true
//         },

//     }
// )
// }



  //for reference after .hero animates
//   for (i=1; i < 9; i++) {
//     const homeProjContain = document.querySelector(`.project${i}`)
//     //check if div exists to avoid warnings in console
//     if (homeProjContain !== null) {
//       projReveal(i)
//     }
//   }
  




