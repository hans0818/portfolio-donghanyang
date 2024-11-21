import React, { useEffect, useRef } from 'react';
import styles from './Section1.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const sloganRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !sloganRef.current) {
      console.error('필요한 참조가 초기화되지 않았습니다.');
      return;
    }

    // 초기 상태 설정
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(sloganRef.current, { opacity: 0, y: 50 });

    const duration = 1;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    // Portfolio 텍스트 사라짐
    tl.to(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: duration,
      ease: 'power3.out',
    });

    // 슬로건 나타남
    tl.fromTo(
      sloganRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power3.out',
      }
    );

    // 슬로건 유지 시간
    tl.to({}, { duration: duration });

    // 슬로건 사라짐
    tl.to(sloganRef.current, {
      opacity: 0,
      y: -50,
      duration: duration,
      ease: 'power3.in',
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.section1}>
        <h1 ref={titleRef}>Portfolio</h1>
      </div>
      <div className={styles.section1One}>
        <h2 ref={sloganRef}>
          안된다고 하면 <span className={styles.highlight}>변명</span>이 보이고 <br />
          하려고 하면 <span className={styles.highlight}>방법</span>이 보인다.
        </h2>
      </div>
    </div>
  );
};

export default Section1;
