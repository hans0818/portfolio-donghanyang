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

gsap.registerPlugin(ScrollTrigger);

const Section3One = () => {
  const sectionRef = useRef(null);
  const developmentPeriodRef = useRef(null);
  const stackBoxRefs = useRef([]);
  const projectNameRef = useRef(null); // 'OrderIn' 글자 레퍼런스 추가

  useEffect(() => {
    if (
      !sectionRef.current ||
      !developmentPeriodRef.current ||
      stackBoxRefs.current.length === 0 ||
      !projectNameRef.current
    ) {
      console.error('필요한 참조가 초기화되지 않았습니다.');
      return;
    }

    // 'OrderIn' 글자에 부드러운 글로우 효과 애니메이션 적용
    gsap.to(projectNameRef.current, {
      textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)',
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      scrollTrigger: {
        trigger: projectNameRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        markers: false,
      },
    });

    // 개발 시작 텍스트 애니메이션
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

    // 스택 박스 요소들 애니메이션 (stagger 적용)
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
  }, []);

  return (
    <div className={styles.section3One} ref={sectionRef}>
      <div className={styles.projectNameContainer}>
        <h1 ref={projectNameRef} className={styles.projectName}>
          OrderIn
        </h1>
      </div>
      <div className={styles.developmentPeriodContainer} ref={developmentPeriodRef}>
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
