import React, { useEffect, useRef, useState } from 'react';
import styles from './Section6Video.module.css';
import KioskVideo from '../../assets/video/키오스크 시연영상.mp4'; // MP4 비디오
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP의 ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Section6Video = () => {
  const sectionRef = useRef(null); // 섹션 전체를 감싸는 레퍼런스
  const headingRef = useRef(null); // 헤딩 텍스트를 감싸는 레퍼런스
  const videoRef = useRef(null); // 비디오 요소를 감싸는 레퍼런스
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
            setIsVideoLoaded(true); // 비디오 로드 상태 업데이트
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

    const gridContainer = document.querySelector(`.${styles.gridContainer}`); // 그리드 컨테이너 요소 선택
    const descriptionContainer = document.querySelector(`.${styles.descriptionContainer}`); // 설명 컨테이너 요소 선택

    // ScrollTrigger 생성: 헤딩이 스크롤에 따라 overflow 속성 변경
    ScrollTrigger.create({
      trigger: headingRef.current, // 트리거 요소: 헤딩
      start: 'top 80%', // 헤딩의 상단이 뷰포트의 80% 지점에 도달할 때
      end: 'bottom 20%', // 끝 지점: 뷰포트의 20% 지점
      onEnter: () => {
        // 헤딩이 뷰포트에 들어올 때
        if (gridContainer) {
          gridContainer.style.overflow = 'visible';
        }
        if (descriptionContainer) {
          descriptionContainer.style.overflow = 'visible';
        }
      },
      onLeave: () => {
        // 헤딩이 뷰포트를 벗어날 때
        if (gridContainer) {
          gridContainer.style.overflow = 'hidden';
        }
        if (descriptionContainer) {
          descriptionContainer.style.overflow = 'hidden';
        }
      },
      onEnterBack: () => {
        // 헤딩이 다시 뷰포트에 들어올 때
        if (gridContainer) {
          gridContainer.style.overflow = 'visible';
        }
        if (descriptionContainer) {
          descriptionContainer.style.overflow = 'visible';
        }
      },
      onLeaveBack: () => {
        // 헤딩이 다시 벗어날 때
        if (gridContainer) {
          gridContainer.style.overflow = 'hidden';
        }
        if (descriptionContainer) {
          descriptionContainer.style.overflow = 'hidden';
        }
      },
      markers: false, // 디버깅용 마커 비활성화
    });

    // GSAP 타임라인 생성: 애니메이션을 일시 정지 상태로 시작
    const burnAndShineTimeline = gsap.timeline({ paused: true });

    // 텍스트 색상과 textShadow 애니메이션 설정
    burnAndShineTimeline
      .to(headingRef.current, {
        color: '#FFFFFF', // 텍스트 색상을 흰색으로 변경
        duration: 0.1, // 애니메이션 지속 시간
        ease: 'power1.inOut', // 이징 함수
      }, 0) // 타임라인 시작 시점

      .to(headingRef.current, {
        textShadow: `
          0 0 15px rgba(255, 69, 0, 0.8),
          0 0 30px rgba(255, 140, 0, 0.7),
          0 0 45px rgba(255, 215, 0, 0.5)
        `, // 첫 번째 textShadow 설정
        duration: 1.5,
        ease: 'power2.out',
      }, 0) // 동시에 시작

      .to(headingRef.current, {
        textShadow: `
          0 0 20px rgba(255, 69, 0, 0.9),
          0 0 40px rgba(255, 140, 0, 0.8),
          0 0 60px rgba(255, 215, 0, 0.6)
        `, // 두 번째 textShadow 설정
        duration: 1.5,
        ease: 'power2.in',
      }, '+=1.5') // 첫 번째 애니메이션 후 1.5초 뒤에 시작

      .to(headingRef.current, {
        textShadow: `
          0 0 15px rgba(255, 69, 0, 0.8),
          0 0 30px rgba(255, 140, 0, 0.7),
          0 0 45px rgba(255, 215, 0, 0.5)
        `, // 세 번째 textShadow 설정
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

    return () => {
      // 컴포넌트 언마운트 시 ScrollTrigger 및 타임라인 정리
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      burnAndShineTimeline.kill();
    };
  }, []);

  return (
    <div className={styles.section6VideoWrapper} ref={sectionRef}>
      <div className={styles.gridContainer}>
        {/* 동영상 컨테이너 */}
        <div className={styles.videoContainer} ref={videoRef}>
          {isVideoLoaded && (
            <video
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src={KioskVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        {/* 설명 컨테이너 */}
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionheadingBox}>
            <p ref={headingRef} className={styles.heading}>
              경험에서 답을 찾다.
            </p>
          </div>
          <div className={styles.descriptionBox}>
            <p>
              음식점 테이블 키오스크의 복잡함에서 <br /> 불편함을 느꼈지만, <br />
              김반천국의 메뉴 적힌 종이가 주는 <br /><span className={styles.highlight}>단순함에서 편리함</span>을 경험했습니다. <br />
            </p>
          </div>
          <div className={styles.descriptionBox}>
            <p>
              사용자의 불편은 단순히 디자인 문제가 아니라,<br />
              불필요한 과정에서 오는 스트레스를 깨달았습니다. <br />
              본질을 이해하고, <span className={styles.highlight}>단순하면서 효율적인 방식</span>으로<br />
              문제를 해결하고자 했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6Video;
