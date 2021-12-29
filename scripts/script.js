

function initMain () {

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
        console.log(walk);
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
        for (currentItem of baseGet){
            currentItem.classList.add(addon)
        };
    };    

    initPairs.forEach((currentPair) => { 
            addInitClass(currentPair[0], currentPair[1]) }
    );

    // ▶ locomotive scroll ◀ 
    // const locoScroll = new LocomotiveScroll({
    //     el: document.querySelector(scrollerWrapper),
    //     smooth: true,
    //     invalidateOnRefresh: true,
    //     reloadOnContextChange: true,
    //     mobile: {
    //         smooth: false
    //     }
    // });
    // locoScroll.on("scroll", ScrollTrigger.update);
    // ScrollTrigger.scrollerProxy(scrollerWrapper, {
    //     scrollTop(value) {
    //         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    //     }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    //     getBoundingClientRect() {
    //         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    //     },
    //     // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    //     pinType: document.querySelector(scrollerWrapper).style.transform ? "transform" : "fixed"
    // });



    // ▶ gsap ◀
    gsap.registerPlugin(CSSRulePlugin);

    const projCardCount = document.getElementsByClassName('projs-card').length

    // ---------- bg blobbies
    gsap.to('canvas', {
        y: '-60%',
        ease: 'power3.out',
        opacity: .5,
        scrollTrigger: {
            trigger: 'section:nth-child(2)',
            // scroller: ".container",
            start: 'top 60%',
            toggleActions: 'play pause pause reverse',
            scrub: .75
        }
    })

    // ---------- hero text
    let heroTxt = document.querySelector('.hero-txt')
    if ( heroTxt !== null) {
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
    for (i=1; i <= projOutcomeImgCount ; i++) {
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

initMain();

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