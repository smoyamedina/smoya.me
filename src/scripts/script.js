// ▶ JS confirmed - adding init classes ◀
// mostly doing this to force myself to learn what I can do with CSS alone
const initPairs = [
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


// ▶ smooth scroll ◀

// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector(".container"),
//     smooth: true
//   });
//   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//   locoScroll.on("scroll", ScrollTrigger.update);
  
//   // tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
//   ScrollTrigger.scrollerProxy(".container", {
//     scrollTop(value) {
//       return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//     getBoundingClientRect() {
//       return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//     },
//     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//     pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
//   });

// ▶ gsap ◀
gsap.registerPlugin(CSSRulePlugin);

const projCardCount = document.getElementsByClassName('projs-card').length

let homeProjTxtRevealEndStd = "center 10%"
let homeProjTxtRevealEndLast = "center 30%"


gsap.to('.hero-txt', {
    ease: 'none',
    y: '-130vh',
    opacity: 0,
    scrollTrigger: {
        trigger: '.about',
        scrub: .75,
        // scroller: ".container",
        // markers: true,
        start: 'top bottom',
        end: 'top top',
        toggleActions: 'play reverse play reverse',
    }
})

let homeProjTxtReveal = (projNum, endVals) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.projs-card:nth-child(${projNum})`,
        scrub: .75,
        // scroller: ".container",
        // markers: true,
        start: "top bottom",
        end: endVals,
        toggleActions: 'play reverse play reverse',
      }
    })
    tl.from (`.projs-card:nth-child(${projNum}) .projs-text`, {opacity: 0, "clipPath": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: .2})
    tl.fromTo(`.projs-card:nth-child(${projNum}) .projs-text`, {y:'-70vh'}, {y:'-10vh', duration: 4, ease: 'power3.inOut'}, '<-.75')
    tl.to (`.projs-card:nth-child(${projNum}) .projs-text`, {"clipPath": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",duration: .2}, '>-.75')
}
  
for (i=1; i <= projCardCount ; i++) {
    const projNameContain = document.querySelector(`.projs-card:nth-child(${i}) .projs-text`)
    //check if div exists to avoid warnings in console
    if (projNameContain !== null) {
        if (i < projCardCount === true) {
            homeProjTxtReveal(i, homeProjTxtRevealEndStd)
        } else {
            homeProjTxtReveal(i, homeProjTxtRevealEndLast)
        }
    }
} 


// Indiv Proj page

// ---------- 


let txtReveals = (txtClass, txtTrigger) => {
    gsap.from(`.${txtClass}`, {
        ease: 'power4.out',
        y: '75%',
        opacity: 0,
        duration: 2,
        scrollTrigger: {
            // scroller: ".container",
            trigger: `.${txtTrigger}`,
            start: 'top 85%',
            end: 'top 50%'
        }
    })

}

let imgReveals = (imgClass, imgWrapClass, imgTrigger) => {
    let imgScaleDown = () => {gsap.fromTo(`.${imgClass}`, {scale: 2}, {scale: 1, duration: 2.5, ease: "power4.out"})}
    gsap.fromTo(`.${imgWrapClass}`,{y: '100%', opacity: 0}, {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "power4.out", y: 0, scrollTrigger: {
        trigger: `.${imgTrigger}`,
        // scroller: ".container",
        start: "top 85%"
    }})
}

txtReveals('proj-pg-desc', 'projhero');
txtReveals('proj-prompt-txt', 'proj-prompt');
txtReveals('proj-desc', 'proj-outcome');
imgReveals('p-heroimg img', 'p-heroimg', 'projhero');
imgReveals('p-img-lead img', 'p-img-lead', 'proj-outcome');

// ---------- Project Outcome Images within the -list wrapper
const pOutcomeImgFirst = 'top 75%'
const pOutcomeImgStd = 'bottom 75%'


let projOutcomeImgReveals = (pOutcomeImgClass, pOutcomeImgWrapClass, pOutcomeImgTrigger, pOutcomeImgStart) => {
    let imgScaleDown = () => {
        gsap.fromTo(`.${pOutcomeImgClass}`, {scale: 2}, {scale: 1, duration: 2.5, ease: "power4.out"})}
        gsap.fromTo(`.${pOutcomeImgWrapClass}`,{y: '100%', opacity: 0}, {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "power4.out", y: 0, scrollTrigger: {
        trigger: `.${pOutcomeImgTrigger}`,
        // scroller: ".container",
        start: `${pOutcomeImgStart}`,
        invalidateOnRefresh: true 
        // iOR to refresh preceeding div's position + therefore scrollTrigger location!!
    }})
}

const projOutcomeImgCount = document.querySelectorAll('.p-outcome-img img').length;
//1 bc of nth-child's starting interger 
for (i=1; i <= projOutcomeImgCount ; i++) {
    const projOutcomeImgContain = document.querySelector(`.p-outcome-img:nth-child(${i}) img`)
    //check if div exists to avoid warnings in console
    if (projOutcomeImgContain !== null) {
        // (pOutcomeImgClass, pOutcomeImgWrapClass, pOutcomeImgTrigger, pOutcomeImgStart)
        if (i == 1) {
            projOutcomeImgReveals(`p-outcome-img:nth-child(${i}) img`, `p-outcome-img:nth-child(${i})`, `p-outcome-img-list`, pOutcomeImgFirst)
        } else {
            projOutcomeImgReveals(`p-outcome-img:nth-child(${i}) img`, `p-outcome-img:nth-child(${i})`, `p-outcome-img:nth-child(${i - 1})`, pOutcomeImgStd)
        }
    }
};

