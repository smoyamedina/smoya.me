// ▶ JS confirmed - adding init classes here ◀ 

function initMain(){


    //cojea gabriel - cursor 
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
    
    
    
    const cursorModifiers = document.querySelectorAll('[cursor-class]');
    
    cursorModifiers.forEach(curosrModifier => {
      curosrModifier.addEventListener('mouseenter', function() {
        const className = this.getAttribute('cursor-class');
        cursor.classList.add(className);
      });
      
      curosrModifier.addEventListener('mouseleave', function() {
        const className = this.getAttribute('cursor-class');
        cursor.classList.remove(className);
      });
    });




    // mostly doing this to force myself to learn what I can do with CSS alone
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

    initPairs.forEach((currentPair) => { addInitClass(currentPair[0], currentPair[1]) });

    // ▶ gsap ◀
    gsap.registerPlugin(CSSRulePlugin);

    const projCardCount = document.getElementsByClassName('projs-card').length

    let homeProjTxtRevealEndStd = "center 10%"
    let homeProjTxtRevealEndLast = "center 10%"


    // ---------- bg blobbies
    gsap.to('canvas', {
        y: '-50%',
        ease: 'power4.out',
        opacity: .5,
        scrollTrigger: {
            trigger: '.about',
            start: 'top 60%',
            toggleActions: 'play pause pause reverse',
            scrub: .75
        }
    })

    // ---------- hero text
    gsap.to('.hero-txt', {
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

    // ---------- proj text on home pg
    let homeProjTxtReveal = (projNum, endVals) => {
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: `.projs-card:nth-child(${projNum})`,
            scrub: .75,
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
        // gsap.set(`.${txtClass}`, {opacity:0})
        gsap.from(`.${txtClass}`, {
            ease: 'power4.out',
            y: '25vh',
            opacity: 0,
            duration: 2,
            scrollTrigger: {
                trigger: `.${txtTrigger}`,
                start: 'top 85%',
                end: 'top 50%'
            }
        })
    }


    let heroImgReveal = (imgClass, imgWrapClass, imgTrigger) => {
        let imgScaleDown = () => {
            gsap.fromTo(`.${imgClass}`, {scale: 2}, {scale: 1.125, duration: 2.5, ease: "power4.out"})
        
        }
        gsap.fromTo(`.${imgWrapClass}`,
            {y: '100%', opacity: 0}, 
            {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "power4.out", y: 0, 
                scrollTrigger: {
                    trigger: `.${imgTrigger}`,
                    start: "top 85%"
                }
            }
        )
        ScrollTrigger.refresh()
    }

    gsap.to('.proj-pg-desc', {
        y: '-40vh',
        opacity: 0,
        scrollTrigger: {
            trigger: '.proj-prompt',
            start: 'top: 85%',
            scrub: .75
        }
    })

    let txtReveals = (txtClass, txtTrigger) => {
        gsap.from(`.${txtClass}`, {
            ease: 'expo.out',
            y: '100%',
            opacity: 0,
            duration: 2,
            scrollTrigger: {
                trigger: `.${txtTrigger}`,
                start: 'top 85%',
                end: 'top 50%'
            }
        })
    }

    let imgReveals = (imgClass, imgWrapClass, imgTrigger) => {
        let imgScaleDown = () => {gsap.fromTo(`.${imgClass}`, {scale: 1.5}, {scale: 1, duration: 2.5, ease: "expo.out"})}
        gsap.fromTo(`.${imgWrapClass}`,{y: '100%', opacity: 0}, {onStart: imgScaleDown, duration: 2, opacity: 1, ease: "expo.out", y: 0, scrollTrigger: {
            trigger: `.${imgTrigger}`,
            start: "top 85%"
        }})
        ScrollTrigger.refresh()
    }

    heroImgReveal('p-heroimg img', 'p-heroimg', 'projhero');
    heroTxtReveal('proj-pg-desc', 'projhero');


    txtReveals('hero-txt', 'hero');
    txtReveals('slide-text-all h3', 'about .slide-text-all');
    txtReveals('slide-text-pwrap', 'about .slide-text-all');
    txtReveals('proj-prompt-txt', 'proj-prompt');
    txtReveals('proj-desc', 'proj-outcome');
    
    
    imgReveals('p-img-lead img', 'p-img-lead', 'proj-outcome');

    // ---------- Project Outcome Images within the -list wrapper
    const pOutcomeImgFirst = 'top 80%'
    const pOutcomeImgStd = 'bottom 80%'

    let refreshTriggers = ScrollTrigger.refresh();

    let projOutcomeImgReveals = (pOutcomeImgClass, pOutcomeImgWrapClass, pOutcomeImgTrigger, pOutcomeImgStart) => {
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
        // gsap.fromTo(`.${pOutcomeImgClass}`, {
        //     'transform-origin':'50% 0%'}, {
        //     'transform-origin':'50% 100%',
        //     scrollTrigger: {
        //             trigger: `.p-outcome-img-list`,
        //             start: 'top bottom',
        //             end: 'bottom top',
        //             scrub: .75,
        //             markers: true
        //         }
        //     }
        // )
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

    // // const getFooterItem = () => { return document.querySelector('.fi-links').children['${arrayNum}'].className }
    // // let numOfFooterItems = getFooterItems.length;
    // const animateItem = (item) => {
    //     return footerTL.from(`${item}`, {opacity: 0, y: '20vh', duration: .15})
    // }
    let footerTL = gsap.timeline({ease: "power4.out",
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 65%',
                end: 'bottom bottom'
            }   
        }
    )
    footerTL.from('.flinks-overline', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(2)', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(3)', {opacity: 0, y: '20vh'}, "<+=.1")
    footerTL.from('.fi-link:nth-of-type(4)', {opacity: 0, y: '20vh'}, "<+=.1")
};

initMain();
// SWUP pg transitions test
// const swup = new Swup();
// swup.on('contentReplaced', function () {
//     window.scrollTo(0, 0);
//     ScrollTrigger.refresh();
//     initMain();
// });
