import React, { useEffect, useRef } from 'react';
import styles from './Section3One.module.css';
import FigmaLogo from '../../assets/logo/figma.svg';
import JSLogo from '../../assets/logo/JS.png';
import ReactLogo from '../../assets/logo/react.png';
import NodeLogo from '../../assets/logo/Node.js.png';
import FirebaseLogo from '../../assets/logo/firebase.png';
import VSCodeLogo from '../../assets/logo/vscode.png';
import OpenAILogo from '../../assets/logo/openai.png';
import NotionLogo from '../../assets/logo/notion.png';
import CursorLogo from '../../assets/logo/cursor.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP의 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Section3One = () => {
  const sectionRef = useRef(null); // 섹션 전체를 감싸는 레퍼런스
  const developmentPeriodRef = useRef(null); // 개발 기간 텍스트를 감싸는 레퍼런스
  const stackBoxRefs = useRef([]); // 스택 박스 요소들을 담는 레퍼런스 배열
  const projectNameRef = useRef(null); // 'OrderIn' 글자 레퍼런스

  useEffect(() => {
    // 'OrderIn' 글자에 부드러운 펄사 효과 애니메이션 적용
    if (!projectNameRef.current) {
      console.error('프로젝트 이름 레퍼런스가 초기화되지 않았습니다.');
      return;
    }

    // GSAP 타임라인 생성: 애니메이션을 일시 정지 상태로 시작
    const burnAndShineTimeline = gsap.timeline({ paused: true });

    // 텍스트 글자색은 CSS에서 흰색으로 설정하고, textShadow만 애니메이션 적용
    burnAndShineTimeline
      .to(projectNameRef.current, {
        textShadow: `
          0 0 20px rgba(255, 165, 0, 0.8),
          0 0 40px rgba(255, 140, 0, 0.7),
          0 0 60px rgba(255, 215, 0, 0.5)
        `, // 첫 번째 textShadow 설정 (밝은 주황색)
        duration: 1.5,
        ease: 'power2.out',
      }, 0) // 즉시 시작

      .to(projectNameRef.current, {
        textShadow: `
          0 0 25px rgba(255, 165, 0, 0.9),
          0 0 50px rgba(255, 140, 0, 0.8),
          0 0 75px rgba(255, 215, 0, 0.6)
        `, // 두 번째 textShadow 설정 (더 밝고 큰 그림자)
        duration: 1.5,
        ease: 'power2.in',
      }, '+=0') // 바로 다음에 실행

      .to(projectNameRef.current, {
        textShadow: `
          0 0 20px rgba(255, 165, 0, 0.8),
          0 0 40px rgba(255, 140, 0, 0.7),
          0 0 60px rgba(255, 215, 0, 0.5)
        `, // 세 번째 textShadow 설정 (원래 상태로 복귀)
        duration: 1.5,
        ease: 'power2.out',
      }, '+=0') // 바로 다음에 실행

      .yoyo(true) // 애니메이션을 역방향으로 실행
      .repeat(-1); // 무한 반복 설정

    // ScrollTrigger 생성: 'OrderIn' 글자가 뷰포트에 들어올 때 애니메이션 시작
    ScrollTrigger.create({
      trigger: projectNameRef.current, // 트리거 요소: 'OrderIn' 글자
      start: 'top 80%', // 트리거 시작 지점
      onEnter: () => {
        burnAndShineTimeline.play(); // 애니메이션 시작
      },
      once: true, // 한 번만 트리거되도록 설정
      markers: false, // 디버깅용 마커 비활성화
    });

    // 개발 시작 텍스트 애니메이션
    if (developmentPeriodRef.current) {
      gsap.fromTo(
        developmentPeriodRef.current,
        {
          x: 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: developmentPeriodRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    }

    // 스택 박스 요소들 애니메이션 (stagger 적용)
    if (stackBoxRefs.current.length > 0) {
      gsap.fromTo(
        stackBoxRefs.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.2, // 각 요소가 0.2초 간격으로 나타남
          scrollTrigger: {
            trigger: stackBoxRefs.current[0],
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    }

    // 클린업 함수: 컴포넌트 언마운트 시 ScrollTrigger 및 타임라인 정리
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      burnAndShineTimeline.kill();
    };
  }, []);

  return (
    <div className={styles.section3One} ref={sectionRef}>
      <div className={styles.projectNameContainer}>
        {/* 'OrderIn' 글자 */}
        <h1 ref={projectNameRef} className={styles.projectName}>
          OrderIn
        </h1>
      </div>
      <div className={styles.developmentPeriodContainer} ref={developmentPeriodRef}>
        {/* 개발 시작 텍스트 */}
        <p>개발시작 2024-08-01</p>
      </div>
      <div className={styles.developmentStackContainer}>
        {/* 스택 박스들 */}
        <div
          className={styles.stackBox}
          ref={(el) => {
            if (el) stackBoxRefs.current[0] = el;
          }}
        >
          design
          <img src={FigmaLogo} alt="Figma 로고" className={styles.logo} />
        </div>
        <div
          className={`${styles.stackBox} ${styles.frontendStackBox}`}
          ref={(el) => {
            if (el) stackBoxRefs.current[1] = el;
          }}
        >
          frontend
          <div className={styles.logoRow}>
            <img src={JSLogo} alt="JavaScript 로고" className={styles.logo} />
            <img src={ReactLogo} alt="React 로고" className={styles.logo} />
          </div>
        </div>
        <div
          className={`${styles.stackBox} ${styles.backendStackBox}`}
          ref={(el) => {
            if (el) stackBoxRefs.current[2] = el;
          }}
        >
          backend
          <div className={styles.logoRow}>
            <img src={NodeLogo} alt="Node.js 로고" className={styles.logo} />
            <img src={FirebaseLogo} alt="Firebase 로고" className={styles.logo} />
          </div>
        </div>
        <div
          className={`${styles.stackBox} ${styles.toolStackBox}`}
          ref={(el) => {
            if (el) stackBoxRefs.current[3] = el;
          }}
        >
          development tool
          <div className={styles.logoGrid}>
            <img src={VSCodeLogo} alt="VSCode 로고" className={styles.logo} />
            <img src={OpenAILogo} alt="OpenAI 로고" className={styles.logo} />
            <img src={NotionLogo} alt="Notion 로고" className={styles.logo} />
            <img src={CursorLogo} alt="Cursor 로고" className={styles.logo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3One;
