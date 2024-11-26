import React, { useEffect, useRef, useState } from 'react';
import styles from './Section4Video.module.css';
import SystemVideo from '../../assets/video/시스템 시연영상.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP의 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Section4Video = () => {
  const sectionRef = useRef(null); // 섹션 전체를 감싸는 레퍼런스
  const videoRef = useRef(null); // 비디오 요소를 감싸는 레퍼런스
  const headingRef = useRef(null); // 헤딩 텍스트를 감싸는 레퍼런스
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // 비디오 로딩 상태 관리

  useEffect(() => {
    const currentVideo = videoRef.current; // 현재 비디오 요소 캡처

    if (!currentVideo) {
      return;
    }

    // IntersectionObserver 생성: 비디오가 25% 이상 보일 때 로드
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoLoaded(true); // 비디오 로드 상태 데이트
            observer.unobserve(entry.target); // 더 이상 관찰하지 않음
          }
        });
      },
      {
        threshold: 0.25, // 비디오가 25% 이상 보일 때 트리거
      }
    );

    // 비디오 요소 관찰 시작
    observer.observe(currentVideo);

    // 클린업 함수: 컴포넌트 언마운트 시 관찰 중지
    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, []);

  useEffect(() => {
    if (!headingRef.current) {
      console.error('헤딩 레퍼런스가 초기화되지 않았습니다.');
      return;
    }

    // GSAP 타임라인 생성: 애니메이션을 일시 정지 상태로 시작
    const burnAndShineTimeline = gsap.timeline({ paused: true });

    // 텍스트 주황색 textShadow 애니메이션 설정
    burnAndShineTimeline
      .to(headingRef.current, {
        textShadow: `
          0 0 20px rgba(255, 165, 0, 0.8),
          0 0 40px rgba(255, 140, 0, 0.7),
          0 0 60px rgba(255, 215, 0, 0.5)
        `, // 첫 번째 textShadow 설정 (밝은 주황색)
        duration: 1.5,
        ease: 'power2.out',
      }, 0) // 즉시 시작

      .to(headingRef.current, {
        textShadow: `
          0 0 25px rgba(255, 165, 0, 0.9),
          0 0 50px rgba(255, 140, 0, 0.8),
          0 0 75px rgba(255, 215, 0, 0.6)
        `, // 두 번째 textShadow 설정 (더 밝고 큰 그림자)
        duration: 1.5,
        ease: 'power2.in',
      }, '+=0') // 바로 다음에 실행

      .to(headingRef.current, {
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

    // ScrollTrigger 생성: 헤딩이 뷰포트에 들어올 때 애니메이션 시작
    ScrollTrigger.create({
      trigger: headingRef.current, // 트리거 요소: 헤딩
      start: 'top 80%', // 트리거 시작 지점
      onEnter: () => {
        burnAndShineTimeline.play(); // 애니메이션 시작
      },
      once: true, // 한 번만 트리거되도록 설정
      markers: false, // 디버깅용 마커 비활성화
    });

    // 클린업 함수: 컴포넌트 언마운트 시 ScrollTrigger 및 타임라인 정리
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      burnAndShineTimeline.kill();
    };
  }, []);

  return (
    <div className={styles.section4VideoWrapper} ref={sectionRef}>
      {/* 비디오 영역 */}
      <div className={styles.videoSection} ref={videoRef}>
        {isVideoLoaded && (
          <video
            src={SystemVideo}
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        )}
      </div>

      {/* 헤딩 컨테이너 */}
      <div className={styles.headingContainer}>
        {/* '효율적인 UI의 숨겨진 열쇠' 글자 */}
        <h2 ref={headingRef} className={styles.heading}>
          효율적인 UI의 숨겨진 열쇠
        </h2>
      </div>
      
      {/* 텍스트 그리드 영역 */}
      <div className={styles.textGrid}>
        <div className={styles.textSection1}>
          <p>
          초기에 자바스크립트로 UI를 구상하는데 한계를 느꼇지만,
          React의 풍부한 라이브러리, 컴포넌트 기반 아키텍처 덕분에 이를 극복할 수 있었습니다. 
            <br /><br />
            React를 통해 <span className={styles.highlight}> 컴포넌트 단위로 나누고 재사용</span>하며 
            개발 속도와 유지보수성을 높이고,
            <span className={styles.highlight}> 데이터 흐름과 상태관리를 명확</span>히해  
            사용자와의 상호작용을 자연스럽게 구현했습니다.
          </p>
        </div>

        <div className={styles.textSection2}>
          <p>
            Firebase를 통해 <span className={styles.highlight}>데이터는 단순 저장을 넘어 UI 구성의 핵심</span>임을 깨달았습니다. 
            <br /><br />UI는 데이터를 기반으로 렌더링되며, UI는 데이터를 기반으로 렌더링되며, 
            정확한 데이터 구조와 실시간 동기화로 실패 없는 UI를 만들었습니다.            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4Video;
