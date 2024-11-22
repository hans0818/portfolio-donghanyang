import React, { useRef, useLayoutEffect } from 'react';
import styles from './Section9.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section9 = () => {
  const sectionRef = useRef(null);
  const outcomeRef = useRef(null);
  const futurePlanRef = useRef(null);
  const reflectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const containers = [
        { ref: outcomeRef.current, direction: 'left' },
        { ref: futurePlanRef.current, direction: 'right' },
        { ref: reflectionRef.current, direction: 'center' },
      ];

      containers.forEach((container) => {
        if (container.ref) {
          let xValue = 0;

          if (container.direction === 'left') {
            xValue = -100;
          } else if (container.direction === 'right') {
            xValue = 100;
          }

          gsap.fromTo(
            container.ref,
            { x: xValue, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container.ref,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                markers: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.section9} ref={sectionRef}>
      <div className={styles.outcomeContainer} ref={outcomeRef}>
        <h2>현재까지 성과</h2>
        <p>Firebase를 통해서 실시간 렌더링으로 UI를 완성.</p>
      </div>
      <div className={styles.futurePlanContainer} ref={futurePlanRef}>
        <h2>확장계획</h2>
        <p>
          React 코드 관리를 위해 Redux, Context API 활용, MariaDB 매출 관리, 직원 관리 시스템 제작,
          페이지 렌더링 최적화.
        </p>
      </div>
      <div className={styles.reflectionContainer} ref={reflectionRef}>
        <h2>소감</h2>
        <p>
          이번 프로젝트를 진행하면서 느낀 점은{' '}
          <span className={styles.highlight}>‘생각하고 실천하면 다 해결되었다’</span>는 사실입니다.
          <br />
          ‘과연 해결 될까?’라는 의문보다는{' '}
          <span className={`${styles.highlight} ${styles.large}`}>‘왜’</span>라는 질문이 문제 해결에 큰
          도움이 되었습니다.
          <br />
          그리고 문제점을 해결하고 기능을 하나하나 추가할 때마다{' '}
          <span className={styles.highlight}>‘코딩의 가능성과 무한한 잠재력’</span>을 다시 한번
          깨달았습니다.
        </p>
      </div>
    </div>
  );
};

export default Section9;
