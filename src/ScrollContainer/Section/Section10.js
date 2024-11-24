import React, { useRef, useEffect } from 'react';
import styles from './Section10.module.css';
import { gsap } from 'gsap';

const Section10 = () => {
  const highlightRef = useRef(null);

  useEffect(() => {
    const highlight = highlightRef.current;

    if (highlight) {
      // "가치" 텍스트의 텍스트 그림자 애니메이션
      gsap.to(highlight, {
        textShadow: `
          0 0 30px rgba(255, 255, 0, 1),
          0 0 60px rgba(255, 255, 0, 0.9),
          0 0 90px rgba(255, 255, 0, 0.8),
          0 0 120px rgba(255, 255, 0, 0.7)
        `,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // "light" 스팬의 opacity 애니메이션
      const light = highlight.querySelector(`.${styles.light}`);
      if (light) {
        gsap.to(light, {
          opacity: 0.8,
          duration: 2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
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
