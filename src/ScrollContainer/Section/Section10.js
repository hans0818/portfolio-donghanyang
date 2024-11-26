import React, { useRef, useEffect } from 'react';
import styles from './Section10.module.css';
import { gsap } from 'gsap';

const Section10 = () => {
  const highlightRef = useRef(null);

  useEffect(() => {
    const highlight = highlightRef.current;

    if (highlight) {
      // GSAP 타임라인 생성
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // "가치" 텍스트의 텍스트 그림자 애니메이션
      tl.to(highlight, {
        textShadow: `
          0 0 20px rgba(255, 255, 255, 0.8),
          0 0 40px rgba(255, 255, 255, 0.6),
          0 0 60px rgba(255, 255, 255, 0.4)
        `,
        duration: 3,
        ease: 'sine.inOut',
      })
      .to(highlight, {
        textShadow: `
          0 0 10px rgba(255, 255, 255, 0.5),
          0 0 20px rgba(255, 255, 255, 0.3),
          0 0 30px rgba(255, 255, 255, 0.2)
        `,
        duration: 3,
        ease: 'sine.inOut',
      }, 0); // 동시에 애니메이션 시작

      // "light" 스팬의 opacity 애니메이션
      const light = highlight.querySelector(`.${styles.light}`);
      if (light) {
        tl.to(light, {
          opacity: 0.6,
          duration: 3,
          ease: 'sine.inOut',
        }, 0) // 텍스트 그림자 애니메이션과 동시에 시작
        .to(light, {
          opacity: 1,
          duration: 3,
          ease: 'sine.inOut',
        }, 3); // 텍스트 그림자 애니메이션과 동시에 시작
      }
    }
  }, []);

  return (
    <div className={styles.lastSection10}>
      <div className={styles.lastContainer}>
        <div className={styles.lastThanksContainer}>
          <h1>
            새로운 도전을 두려워하지 않고, <br />
            함께 성장하며 세상에<br />
            <span className={styles.highlight} ref={highlightRef}>
              가치
              <span className={styles.light}></span>
            </span>
            를 더하겠습니다.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Section10;
