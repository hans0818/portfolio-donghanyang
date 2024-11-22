import React, { useEffect, useRef } from 'react';
import styles from './Section3.module.css';
import tabletKioskImage from '../../assets/images/테블릿키오스크.webp'; // 문제 사진 import
import phoneImage from '../../assets/images/휴대폰.webp'; // 해결 사진 import
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const highlightRef = useRef(null);
  const solutionImageContainerRef = useRef(null);
  const solutionTextContainerRef = useRef(null);

  useEffect(() => {
    if (!highlightRef.current) {
      console.error('highlightRef가 초기화되지 않았습니다.');
      return;
    }

    // "불편" 단어 애니메이션
    gsap.fromTo(
      highlightRef.current,
      { fontSize: '4rem', fontWeight: 700 },
      {
        fontSize: '7rem',
        fontWeight: 800,
        scrollTrigger: {
          trigger: highlightRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: false,
        },
        ease: 'power3.out',
      }
    );

    // 솔루션 컨테이너 애니메이션
    if (solutionImageContainerRef.current && solutionTextContainerRef.current) {
      gsap.fromTo(
        [solutionImageContainerRef.current, solutionTextContainerRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: solutionImageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'restart pause resume pause',
            markers: false,
          },
        }
      );
    }
  }, []);

  return (
    <div className={styles.section3}>
      <div className={styles.sloganContainer}>
        <p>
          스마트폰이 나와서 편리해졌는데<br />
          왜 <span className={styles.highlight} ref={highlightRef}>불편</span>해진 테블릿 키오스크
        </p>
      </div>
      <div className={styles.problemImageContainer}>
        <img src={tabletKioskImage} alt="문제 사진" className={styles.problemImage} />
      </div>
      <div className={styles.problemTextContainer}>
        <h2>접근성 문제</h2>
        <p>: 노인, 장애인 등 익숙하지 않으면 사용하기 힘듦.</p>
        <h2>인간적 접촉 부족</h2>
        <p>: 직접적인 인간적인 도움을 필요로 할 때 이를 제공하기 어려움.</p>
        <h2>기술적 문제</h2>
        <p>: 소프트웨어 오류, 터치 스크린 문제, 네트워크 연결 불안정 등.</p>
        <h2>청결 문제</h2>
        <p>: 다수 사용자의 사용으로 전염병, 위생에 취약.</p>
      </div>
      <div className={styles.solutionImageContainer} ref={solutionImageContainerRef}>
        <img src={phoneImage} alt="해결 사진" className={styles.solutionImage} />
      </div>
      <div className={styles.solutionTextContainer} ref={solutionTextContainerRef}>
        <p>주변에 익숙한 도구로<br />사용자 친환경적인 UI를 만들어보자.</p>
      </div>
    </div>
  );
};

export default Section3;
