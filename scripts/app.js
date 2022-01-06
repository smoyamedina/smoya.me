import * as $ from 'jquery'
import { gsap } from '../node_modules/gsap'
import { CSSRulePlugin } from '../node_modules/gsap/CSSRulePlugin';
import { ScrollTrigger } from '../node_modules/gsap/ScrollTrigger';
 
// ▶ gradient bg - modified from firoznep's example for my usecase ◀
//modified from firoznep's example for my usecase
// gets the canvas element 
const canvas = document.querySelector('canvas');

// gets the width and height of browser viewport
const width = window.innerWidth;
const height = window.innerHeight;

//   set the width and height of canvas equal to browser viewport
canvas.width = width;
canvas.height = height;

//   call the getContext method to draw 2d shape
const ctx = canvas.getContext('2d');
// ctx.filter = 'blur(100px)';
// create Ball class
class Ball {
  constructor(x, y, velx, vely, size, color) {
    this.x = x; // horizontal position of the ball
    this.y = y; // vertical position of the ball
    this.velx = velx; // velocity x added to coordinate x when we animate our ball
    this.vely = vely; // velocity y added to coordinate y
    this.size = size; // size is a radius of the ball
    this.color = color; // fill ball shape with given color
  }

  // create draw func
  drawBall() {
    ctx.beginPath(); // start drawing
    ctx.fillStyle = this.color; // fill ball shape with given color

    // x and y is center of the ball
    // size is radius of the ball
    // 0 is a start point of degree around radius of the ball
    // 2 * Math.PI is an end point which is equivalent to 360 degree
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill(); // finish drawing
  }

  // create update func
  updateBall() {
    // if x and y position is greater than or less than
    // browser viewport than balls turn another direction
    if (this.x + this.size / 2 >= width || this.x - this.size / 2 <= 0) {
      this.velx = -this.velx;
    }

    if (this.y + this.size / 2 >= height || this.y - this.size / 2 <= 0) {
      this.vely = -this.vely;
    }

    // x and y velocity added to x and y coordinate
    // everytime updateBall func is called
    // divide this number to slow or pick up speed
    this.x += this.velx / 45;
    this.y += this.vely / 45;
  }
}

//   create random number generator func
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
// set color choices
let colorChoices = [
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-warm'),
    // getComputedStyle(document.body).getPropertyValue('--light-warm'),
    getComputedStyle(document.body).getPropertyValue('--dark-cool'),
    getComputedStyle(document.body).getPropertyValue('--dark-cool'),
    getComputedStyle(document.body).getPropertyValue('--dark-cool'),
    getComputedStyle(document.body).getPropertyValue('--dark-cool'),
    getComputedStyle(document.body).getPropertyValue('--light-cool'),
    getComputedStyle(document.body).getPropertyValue('--light-cool')
    // I KNOW. IT's LATE. I'M SORRY. PLEASE FOR G IVE.
]

let randomColor = () => {
    return colorChoices[~~random(0, colorChoices.length)]
}

//   create some balls and store in an array
const balls = [];

while (balls.length < 14) {
  let size = random(100, 300);

  // create a new instance of Ball class
  // now replace static number with random number
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    size,
    randomColor()
  );
  balls.push(ball);
}

//   create loop func
function loop() {
  // cover the previous frame's drawing before the next one is drawn
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    // we're going to change this to custom colors from my vis id
  ctx.fillRect(0, 0, width, height);

  // run necessary func
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].updateBall();
  }

  // lets calls loop func itself over and over again
  //  and make animation smooth
  requestAnimationFrame(loop);
}

// finally call the loop func once ot start
loop();

function initMain () {

    gsap.from('.container', {ease: "linear", autoAlpha:0})
    gsap.from('#cursor', {ease: "linear", autoAlpha:0})
    // gsap.from('canvas', {ease: "linear", autoAlpha:0})
    

    // ▶ ionut daniel - much appreciated, you have no idea - draggable horizontal scrollable div ◀

    const slider = document.querySelector('.extras-slide-gall');
    if ( slider !== null) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;        
        });
    }

    // const scrollerWrapper = '.container'

    // ▶ cojea gabriel - thanks a bunch dude - cursor ◀
    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor__circle');

    const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
    const pos = { x: 0, y: 0 }; // cursor's coordinates
    const speed = 0.4; // between 0 and 1

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.45;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);
        
        pos.x += diffX * speed;
        pos.y += diffY * speed;
        
        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);
        
        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
        const rotate = 'rotate(' + angle +'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
        
        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const cursorModifiers = document.querySelectorAll('[data-cursor-class]');
    cursorModifiers.forEach(curosrModifier => {
        curosrModifier.addEventListener('mouseenter', function() {
            const className = this.getAttribute('data-cursor-class');
            cursor.classList.add(className);
        });
        
        curosrModifier.addEventListener('mouseleave', function() {
            const className = this.getAttribute('data-cursor-class');
            cursor.classList.remove(className);
        });
    });

    // ▶ JS confirmed - adding init classes here ◀ 
    // mostly doing this to force myself to learn what I can do with CSS alone it's a sloppy mess
    const initPairs = [
        ['proj-pg-desc', 'text-gradient-init'],
        ['projs', 'projs-init'],
        ['p-heroimg', 'p-heroimg-init'],
        ['projs-card', 'projs-card-init'],
        ['projs-text', 'projs-text-init'],
        ['projs-slide-gall', 'projs-slide-gall-init']
    ];

    const addInitClass = (base, addon) => {
        let baseGet = document.getElementsByClassName(base);
        for (let currentItem of baseGet){
            currentItem.classList.add(addon)
        };
    };   
    
    const projPgEl = document.querySelector('.proj-outcome')
    if ( projPgEl !== null) {
        const container = document.querySelector('.container')
        const overflowNo = 'overflow-no'
        container.classList.add(overflowNo)
    }

    initPairs.forEach((currentPair) => { 
            addInitClass(currentPair[0], currentPair[1]) }
    );

    // ▶ gsap ◀
    gsap.registerPlugin(CSSRulePlugin);
    gsap.registerPlugin(ScrollTrigger);

    const projCardCount = document.getElementsByClassName('projs-card').length

    // ---------- bg blobbies
    gsap.to('canvas', {
        y: '-80%',
        ease: 'power3.out',
        scrollTrigger: {
            trigger: 'section:nth-child(2)',
            // scroller: ".container",
            start: 'top 60%',
            toggleActions: 'play pause pause reverse',
            scrub: true
        }
    })

    // ---------- hero text
    let heroTxt = document.querySelector('.hero-txt')
    if (heroTxt !== null) {
        gsap.to(heroTxt, {
            ease: 'none',
            y: '-70vh',
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
    }
    // ---------- proj text on home pg
    const homeProjTxtRevealEndStd = "center top"
    const homeProjTxtRevealEndLast = "center top"

    let homeProjTxtReveal = (projNum, endVals) => {
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: `.projs-card:nth-child(${projNum})`,
            scrub: .75,
            // scroller: ".container",
            start: "top bottom",
            end: endVals,
            toggleActions: 'play reverse play reverse',
        }
        })
        tl.from (`.projs-card:nth-child(${projNum}) .projs-text`, {opacity: 0, duration: .5})
        tl.to (`.projs-card:nth-child(${projNum}) .projs-text`, {opacity: 0, duration: .15})
    }

    for (let i=1; i <= projCardCount ; i++) {
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

    // -- Indiv Proj page -- //

    // ---------- General Reveals 
    let heroTxtReveal = (txtClass, txtTrigger) => {
        if (document.querySelector(`.${txtClass}`) !== null && document.querySelector(`.${txtTrigger}`) !== null) {
            gsap.from(`.${txtClass}`, {
                ease: 'power4.out',
                y: '25vh',
                opacity: 0,
                duration: 2,
                scrollTrigger: {
                    trigger: `.${txtTrigger}`,
                    // scroller: ".container",
                    start: 'top 85%',
                    end: 'top 50%'
                }
            })
        }
    }
    heroTxtReveal('proj-pg-desc', 'projhero')

    let heroImgReveal = (imgClass, imgWrapClass, imgTrigger) => {
        if ( document.querySelector(`.${imgClass}`) !== null && document.querySelector(`.${imgWrapClass}`) !== null && document.querySelector(`.${imgTrigger}`) !== null) {
            let imgScaleDown = () => {
                gsap.fromTo(`.${imgClass}`, {scale: 2}, {scale: 1.125, duration: 2.5, ease: "power4.out"})
            }
            gsap.fromTo(`.${imgWrapClass}`,
                {y: '100%', opacity: 0}, 
                {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "power4.out", y: 0, 
                    scrollTrigger: {
                        trigger: `.${imgTrigger}`,
                        // scroller: ".container",
                        start: "top 85%"
                    }
                }
            )
        }
    }
    heroImgReveal('p-heroimg img', 'p-heroimg', 'projhero');

    const projDesc = document.querySelector('.proj-desc')
    if (projDesc !== null) {
        gsap.from('.proj-desc', {
            ease: 'expo.out',
            y: '40vh',
            opacity: 0,
            duration: 2,
            scrollTrigger: {
                trigger: '.proj-prompt',
                // scroller: ".container",
                start: 'bottom 55%'
            }
        })
    }

    const projMedia = document.querySelector('.video')
    if (projMedia !== null) {
        gsap.from('.video', {
            y: '40vh',
            opacity: 0,
            scrollTrigger: {
                trigger: '.proj-outcome',
                // scroller: ".container",
                start: 'bottom 50%'
            }
        })
    }


    let txtReveals = (txtClass, txtTrigger) => {
        if (document.querySelector(`.${txtClass}`) !== null) {
            gsap.from(`.${txtClass}`, {
                ease: 'expo.out',
                y: '40vh',
                opacity: 0,
                duration: 2,
                scrollTrigger: {
                    trigger: `.${txtTrigger}`,
                    // scroller: ".container",
                    start: 'top 65%',
                    end: 'top 50%',
                }
            })
        }
    } 

    let imgReveals = (imgClass, imgWrapClass, imgTrigger) => {
        if (document.querySelector(`.${imgClass}`) !== null && document.querySelector(`.${imgWrapClass}`) !== null && document.querySelector(`.${imgTrigger}`) !== null) {
            let imgScaleDown = () => {gsap.fromTo(`.${imgClass}`, {scale: 1.25}, {scale: 1, duration: 2.5, ease: "expo.out"})}
            gsap.fromTo(`.${imgWrapClass}`,{y: '100%', opacity: 0}, {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "expo.out", y: 0, scrollTrigger: {
                trigger: `.${imgTrigger}`,
                // scroller: ".container",
                start: "top 85%"
            }})
            // ScrollTrigger.refresh()
        }

    }




    txtReveals('hero-txt', 'hero');
    txtReveals('slide-text-all .about-header', 'about .slide-text-all'); // why isn't this or the one below working ):
    txtReveals('slide-text-pwrap', 'about .slide-text-all');
    txtReveals('proj-prompt-txt', 'proj-prompt');

    imgReveals('p-img-lead img', 'p-img-lead', 'proj-outcome');

    // ---------- Project Outcome Images within the -list wrapper
    const pOutcomeImgFirst = 'top 80%'
    const pOutcomeImgStd = 'bottom 80%'

    let refreshTriggers = ScrollTrigger.refresh();

    let projOutcomeImgReveals = (pOutcomeImgClass, pOutcomeImgWrapClass, pOutcomeImgTrigger, pOutcomeImgStart) => {
        if (pOutcomeImgClass !== null) {
            let imgScaleDown = () => {    
                gsap.fromTo(`.${pOutcomeImgClass}`, {scale: 1.5}, {scale: 1, duration: 2, ease: "power4.out"})
            }

            gsap.fromTo(`.${pOutcomeImgWrapClass}`,{y: '100%', opacity: 0}, {onStart:       imgScaleDown, duration: 1.5, opacity: 1, ease: "power4.out", y: 0, scrollTrigger: {
                        trigger: `.${pOutcomeImgTrigger}`,
                        // scroller: ".container",
                        // markers: true,
                        start: `${pOutcomeImgStart}`,
                        invalidateOnRefresh: true,
                        onLeave: refreshTriggers
                        // iOR to refresh preceeding div's position + therefore scrollTrigger location!!
                    }
                }
            )
        }
    }
        


    const projOutcomeImgCount = document.querySelectorAll('.p-outcome-img-wrapper img').length;
    //1 bc of nth-child's starting interger 
    for (let i=1; i <= projOutcomeImgCount ; i++) {
        const projOutcomeImg = document.querySelector(`.p-outcome-img:nth-child(${i}) img`)
        let projOutcomeImgWrap = (i) => {
            //nullish coalescing operator + some 'optional chaining' thing
            return document.querySelector(`.p-outcome-img:nth-child(${i})`)?.classList ?? []
        }
        const prvClass = projOutcomeImgWrap(i - 1)
        const crtClass = projOutcomeImgWrap(i)
        const nxtClass = projOutcomeImgWrap(i + 1)
        //leftover from prev wrapper nest levels
        if (projOutcomeImg !== null) {
            if (i == 1 || (
                prvClass.contains('left') && crtClass.contains('right') ||
                prvClass.contains('right') && crtClass.contains('left') ||
                crtClass.contains('left') && nxtClass.contains('right') ||
                crtClass.contains('right') && nxtClass.contains('left')
                )
            ) {
                ScrollTrigger.refresh()
                projOutcomeImgReveals(`p-outcome-img:nth-child(${i}) .p-outcome-img-wrapper img`, `p-outcome-img:nth-child(${i}) .p-outcome-img-wrapper`, `p-outcome-img-list`, pOutcomeImgFirst)     
            } else {
                ScrollTrigger.refresh()
                projOutcomeImgReveals(`p-outcome-img:nth-child(${i}) .p-outcome-img-wrapper img`, `p-outcome-img:nth-child(${i}) .p-outcome-img-wrapper`, `p-outcome-img:nth-child(${i - 1})`, pOutcomeImgStd)
            }
        }
    }

    // ---------- Footer

    let footerTL = gsap.timeline({ease: "power4.out",
            scrollTrigger: {
                trigger: 'footer',
                // scroller: ".container",
                start: 'top 65%',
                end: 'bottom bottom'
            }   
        }
    )
    footerTL.from('.flinks-overline', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(2)', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(3)', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(4)', {opacity: 0, y: '20vh'}, "<+=.1")

    // locoscroll
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    // ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    // ScrollTrigger.refresh();
}

// initMain();

window.addEventListener("load", (event) => {
  initMain();
})

// a message from our sponsor: me
const textA = '%cWhat\'re you doing here?! Hope things are going well!'
const styleA = 'font-family: Courier New, monospace; font-size: 22px; font-weight: 600; background: #e0e0e0; color: black; padding: 1em .75em;  border-top: .75em solid #5448C8;'
const textB = '%cIf you\'re seeing this, I need you to know that I am currently in the process of refactoring pretty much everything! I learned a lot of this on the side during the past couple of months outside of my current contract position. i.e...'
const styleB = 'font-family: Courier New, monospace; font-size: 16px; background: #e0e0e0; color: black; padding: 1em;'
const textC = '%c✨ Pardon the mess, a tornado just flew through ✨'
const styleC = 'font-family: Courier New, monospace; font-size: 16px; background: #e0e0e0; color: black; padding: 1em; border-bottom: .25em solid #5448C8;'
// above should be an array or object or something but i'm kind of strapped for time atm, dog grooming appointment!!!

console.log(textA, styleA);console.log(textB, styleB);console.log(textC, styleC);
// I would love to help you and your organization's mission! (: