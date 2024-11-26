import React, { useEffect, useRef } from 'react';
import styles from './Section3One.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiFigma,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiVisualstudiocode,
  SiOpenai,
  SiNotion
} from "react-icons/si";
import { BsFillCursorFill } from "react-icons/bs";

// GSAP의 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Section3One = () => {
  const sectionRef = useRef(null); // 섹션 전체를 감싸는 레퍼런스
  const developmentPeriodRef = useRef(null); // 개발 기간 텍스트를 감싸는 레퍼런스
  const stackBoxRefs = useRef([]); // 스택 박스 요소들을 담는 레퍼런스 배열
  const projectNameRef = useRef(null); // 'OrderIn' 글자 레퍼런스

  // 각 로고에 대한 레퍼런스
  const figmaWrapperRef = useRef(null);
  const jsWrapperRef = useRef(null);
  const reactWrapperRef = useRef(null);
  const nodeWrapperRef = useRef(null);
  const firebaseWrapperRef = useRef(null);
  const vscodeWrapperRef = useRef(null);
  const openaiWrapperRef = useRef(null);
  const notionWrapperRef = useRef(null);
  const cursorWrapperRef = useRef(null);

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

    // 각 로고에 대한 애니메이션 설정
    // Figma: 제자리에서 통통 튀는 애니메이션
    if (figmaWrapperRef.current) {
      gsap.to(figmaWrapperRef.current, {
        y: -15, // 위로 15px 이동
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut', // 통통 튀는 느낌을 위해 부드러운 이징 적용
      });
    }

    // JavaScript: 상하로 부드럽게 이동
    if (jsWrapperRef.current) {
      gsap.to(jsWrapperRef.current, {
        y: -10,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // React: 지속적으로 회전
    if (reactWrapperRef.current) {
      gsap.to(reactWrapperRef.current, {
        rotation: 360,
        duration: 5,
        repeat: -1,
        ease: 'none',
      });
    }

    // Node.js: 좌우로 흔들림
    if (nodeWrapperRef.current) {
      gsap.to(nodeWrapperRef.current, {
        rotation: 10,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // Firebase: 위아래로 부드럽게 떠오름
    if (firebaseWrapperRef.current) {
      gsap.to(firebaseWrapperRef.current, {
        y: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // VS Code: 좌우로 미세하게 이동
    if (vscodeWrapperRef.current) {
      gsap.to(vscodeWrapperRef.current, {
        x: 5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // OpenAI: 지속적으로 회전
    if (openaiWrapperRef.current) {
      gsap.to(openaiWrapperRef.current, {
        rotation: -360,
        duration: 5,
        repeat: -1,
        ease: 'none',
      });
    }

    // Notion: 확대/축소 반복
    if (notionWrapperRef.current) {
      gsap.to(notionWrapperRef.current, {
        scale: 1.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }

    // Cursor: 지속적으로 깜빡임
    if (cursorWrapperRef.current) {
      gsap.to(cursorWrapperRef.current, {
        opacity: 0.5,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
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
          <div className={styles.stackTitle}>Design</div>
          <div className={styles.iconContainer}>
            <div ref={figmaWrapperRef}>
              <SiFigma className={styles.logo} color="#DEDEDE" />
            </div>
            <span className={styles.iconText}>Figma</span>
          </div>
        </div>
        <div
          className={styles.stackBox}
          ref={(el) => {
            if (el) stackBoxRefs.current[1] = el;
          }}
        >
          <div className={styles.stackTitle}>Front-end</div>
          <div className={styles.logoRow}>
            <div className={styles.iconContainer}>
              {/* JavaScript 아이콘 래퍼 */}
              <div ref={jsWrapperRef}>
                <SiJavascript className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>JavaScript</span>
            </div>
            <div className={styles.iconContainer}>
              {/* React 아이콘 래퍼 */}
              <div ref={reactWrapperRef}>
                <SiReact className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>React</span>
            </div>
          </div>
        </div>
        <div
          className={styles.stackBox}
          ref={(el) => {
            if (el) stackBoxRefs.current[2] = el;
          }}
        >
          <div className={styles.stackTitle}>Full-stack</div>
          <div className={styles.logoRow}>
            <div className={styles.iconContainer}>
              {/* Node.js 아이콘 래퍼 */}
              <div ref={nodeWrapperRef}>
                <SiNodedotjs className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>Node.js</span>
            </div>
            <div className={styles.iconContainer}>
              {/* Firebase 아이콘 래퍼 */}
              <div ref={firebaseWrapperRef}>
                <SiFirebase className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>Firebase</span>
            </div>
          </div>
        </div>
        <div
          className={styles.stackBox}
          ref={(el) => {
            if (el) stackBoxRefs.current[3] = el;
          }}
        >
          <div className={styles.stackTitle}>Development Tool</div>
          <div className={styles.logoGrid}>
            <div className={styles.iconContainer}>
              {/* VS Code 아이콘 래퍼 */}
              <div ref={vscodeWrapperRef}>
                <SiVisualstudiocode className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>VS Code</span>
            </div>
            <div className={styles.iconContainer}>
              {/* OpenAI 아이콘 래퍼 */}
              <div ref={openaiWrapperRef}>
                <SiOpenai className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>OpenAI</span>
            </div>
            <div className={styles.iconContainer}>
              {/* Notion 아이콘 래퍼 */}
              <div ref={notionWrapperRef}>
                <SiNotion className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>Notion</span>
            </div>
            <div className={styles.iconContainer}>
              {/* Cursor 아이콘 래퍼 */}
              <div ref={cursorWrapperRef}>
                <BsFillCursorFill className={styles.logo} color="#DEDEDE" />
              </div>
              <span className={styles.iconText}>Cursor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3One;
