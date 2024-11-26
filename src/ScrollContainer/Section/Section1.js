import React, { useEffect, useRef } from 'react';
import styles from './Section1.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const sloganRef = useRef(null);

  const titleText = 'Portfolio';

  // 'Portfolio' 텍스트를 각 글자별로 분리
  const splitTitle = titleText.split('').map((char, index) => {
    return (
      <span key={index} data-char>
        {char}
      </span>
    );
  });

  const sloganText = '걸림돌은 넘어설 때\n디딤돌이 된다.';

  // 슬로건 텍스트를 각 글자별로 분리
  const splitText = sloganText.split('').map((char, index) => {
    if (char === '\n') {
      return <br key={index} />;
    }
    return (
      <span key={index} data-char>
        {char}
      </span>
    );
  });

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !sloganRef.current) {
      console.error('필요한 참조가 초기화되지 않았습니다.');
      return;
    }

    // 초기 상태 설정
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(sloganRef.current, { opacity: 1, y: 0 });

    const duration = 3;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    const titleChars = titleRef.current.querySelectorAll('[data-char]');

    // 'Portfolio' 텍스트 사라짐 (Particle Disperse 효과)
    tl.to(
      titleChars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        scale: 0.5,
        duration: duration,
        ease: 'power3.in',
        stagger: {
          amount: duration,
          from: 'center',
        },
      },
      'start'
    );

    const sloganChars = sloganRef.current.querySelectorAll('[data-char]');

    // 슬로건 나타남 (Particle Reveal 효과)
    tl.fromTo(
      sloganChars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: duration,
        ease: 'power3.out',
        stagger: {
          amount: duration,
          from: 'random',
        },
      }
    );

    // 슬로건 유지 시간
    tl.to({}, { duration: duration });

    // 슬로건 사라짐 (Particle Disperse 효과)
    tl.to(
      sloganChars,
      {
        opacity: 0,
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        scale: 0.5,
        duration: duration,
        ease: 'power3.in',
        stagger: {
          amount: duration,
          from: 'center',
        },
      },
      '+=' + duration
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.section1}>
  <h1 ref={titleRef} className={styles.textGradient}>{splitTitle}</h1>
      </div>
      <div className={styles.section1One}>
  <h2 ref={sloganRef} className={styles.textGradient}>{splitText}</h2>
      </div>
    </div>
  );
};

export default Section1;
