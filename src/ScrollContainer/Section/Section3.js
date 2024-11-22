import React, { useEffect, useRef } from 'react';
import styles from './Section3.module.css';
import tabletKioskImage from '../../assets/images/테블릿키오스크.webp'; // 문제 사진 import
import phoneImage from '../../assets/images/휴대폰.webp'; // 해결 사진 import
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const highlightRef = useRef(null);
  const sloganContainerRef = useRef(null); // 슬로건 컨테이너 레퍼런스
  const solutionContainerRef = useRef(null);
  const solutionTextRef = useRef(null); // 솔루션 텍스트 레퍼런스 추가
  const solutionImageRef = useRef(null); // 솔루션 이미지 레퍼런스 추가

  useEffect(() => {
    if (!highlightRef.current || !sloganContainerRef.current) {
      console.error('highlightRef 또는 sloganContainerRef가 초기화되지 않았습니다.');
      return;
    }

    // "불편" 단어 애니메이션 수정
    gsap.fromTo(
      highlightRef.current,
      { fontSize: '6rem', fontWeight: 700 },
      {
        fontSize: '9rem',
        fontWeight: 800,
        ease: 'none',
        scrollTrigger: {
          trigger: sloganContainerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: false,
        },
      }
    );

    // 솔루션 컨테이너 애니메이션 (Glow Animation 적용)
    if (solutionContainerRef.current) {
      // 솔루션 컨테이너 나타남 애니메이션
      gsap.fromTo(
        solutionContainerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: solutionContainerRef.current,
            start: 'top 80%',
            toggleActions: 'restart pause resume pause',
            markers: false,
          },
        }
      );

      // 텍스트에 Glow Animation 적용
      if (solutionTextRef.current) {
        gsap.fromTo(
          solutionTextRef.current,
          { textShadow: '0px 0px 0px rgba(255, 255, 255, 0)' },
          {
            textShadow: '0px 0px 20px rgba(255, 255, 255, 1)',
            duration: 0.5,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: solutionContainerRef.current,
              start: 'top 80%',
              markers: false,
            },
          }
        );
      }

      // 이미지에 Glow Animation 적용
      if (solutionImageRef.current) {
        gsap.fromTo(
          solutionImageRef.current,
          { boxShadow: '0px 0px 0px rgba(255, 255, 255, 0)' },
          {
            boxShadow: '0px 0px 30px rgba(255, 255, 255, 1)',
            duration: 0.5,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: solutionContainerRef.current,
              start: 'top 80%',
              markers: false,
            },
          }
        );
      }
    }
  }, []);

  return (
    <div className={styles.section3}>
      <div className={styles.sloganContainer} ref={sloganContainerRef}>
        <p>
          스마트폰이 나와서 편리해졌는데
          <br />
          왜{' '}
          <span className={styles.highlight} ref={highlightRef}>
            불편
          </span>
          한 테블릿 키오스크
        </p>
      </div>

      {/* 문제 컨테이너 */}
      <div className={styles.problemContainer}>
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
      </div>

      {/* 솔루션 컨테이너 */}
      <div className={styles.solutionContainer} ref={solutionContainerRef}>
        <div className={styles.solutionTextContainer} ref={solutionTextRef}>
          <p>
            주변에 익숙한 도구로
            <br />
            <span className={styles.emphasize}>사용자 중심 UI</span>를 제작.
          </p>
        </div>
        <div className={styles.solutionImageContainer}>
          <img
            ref={solutionImageRef}
            src={phoneImage}
            alt="해결 사진"
            className={styles.solutionImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
