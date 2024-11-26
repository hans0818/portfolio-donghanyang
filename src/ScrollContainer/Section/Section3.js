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

    // "불편" 단어 애니메이션 유지
    gsap.fromTo(
      highlightRef.current,
      { fontSize: '7rem', fontWeight: 700 },
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

    // 솔루션 컨테이너 나타나는 애니메이션만 유지
    if (solutionContainerRef.current) {
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
    }
  }, []);

  return (
    <div className={styles.section3}>
      <div className={styles.sloganContainer} ref={sloganContainerRef}>
        <p>
          스마트폰이 나와서 편리한 세상에
          <br />
          {' '}
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
          <p>
            스마트폰의 등장으로 일상은 편리해졌지만, <br />태블릿 키오스크는 불편하다고 생각합니다. <br />
            이는 키오스크 자체보다 <br />태블릿의 불편함에서 비롯된다고 느꼈습니다.
          </p>
        </div>
      </div>

      {/* 솔루션 컨테이너 */}
      <div className={styles.solutionContainer} ref={solutionContainerRef}>
        <div className={styles.solutionTextContainer} ref={solutionTextRef}> 
          <p>
          이번 프로젝트의 목표는 <br/>경험했던 불편함을 개선하며, <br />
          <span className={styles.emphasize}>사용자 친화적인 UI를 만들고 <br />기술의 가능성을 탐구</span>하는 것입니다.
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
      <div className={styles.summaryContainer}>
        <p>하드웨어 불편함을 소프트웨어로 해결</p>
      </div>
    </div>
  );
};

export default Section3;
