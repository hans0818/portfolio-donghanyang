import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import styles from './Section5Video.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5Video = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const playerRef = useRef(null); // YouTube Player 레퍼런스

  // YouTube 동영상 옵션
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0, // 자동 재생 비활성화
      mute: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  const videoId = 'stwp4vslnmc';

  useEffect(() => {
    if (!headingRef.current) {
      console.error('헤딩 레퍼런스가 초기화되지 않았습니다.');
      return;
    }

    // GSAP 타임라인 생성
    const burnAndShineTimeline = gsap.timeline({ paused: true });

    // 텍스트 주황색 textShadow 애니메이션 설정
    burnAndShineTimeline
      .to(headingRef.current, {
        textShadow: `
          0 0 20px rgba(255, 165, 0, 0.8),
          0 0 40px rgba(255, 140, 0, 0.7),
          0 0 60px rgba(255, 215, 0, 0.5)
        `,
        duration: 1.5,
        ease: 'power2.out',
      }, 0)
      .to(headingRef.current, {
        textShadow: `
          0 0 25px rgba(255, 165, 0, 0.9),
          0 0 50px rgba(255, 140, 0, 0.8),
          0 0 75px rgba(255, 215, 0, 0.6)
        `,
        duration: 1.5,
        ease: 'power2.in',
      }, '+=0')
      .to(headingRef.current, {
        textShadow: `
          0 0 20px rgba(255, 165, 0, 0.8),
          0 0 40px rgba(255, 140, 0, 0.7),
          0 0 60px rgba(255, 215, 0, 0.5)
        `,
        duration: 1.5,
        ease: 'power2.out',
      }, '+=0')
      .yoyo(true)
      .repeat(-1);

    ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        burnAndShineTimeline.play();
      },
      once: true,
      markers: false,
    });

    // IntersectionObserver를 사용해 비디오 제어
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && playerRef.current) {
            playerRef.current.seekTo(0); // 영상 시작 지점으로 이동
            playerRef.current.playVideo(); // 영상 재생
          } else if (playerRef.current) {
            playerRef.current.pauseVideo(); // 영상 일시정지
          }
        });
      },
      { threshold: 0.5 } // 섹션이 50% 이상 보일 때 작동
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      burnAndShineTimeline.kill();
    };
  }, []);

  const onPlayerReady = (event) => {
    playerRef.current = event.target; // YouTube Player 인스턴스 저장
  };

  return (
    <div className={styles.section5VideoWrapper} ref={sectionRef}>
      <div className={styles.videoSection}>
        <YouTube 
          videoId={videoId} 
          opts={opts} 
          onReady={onPlayerReady} // Player Ready 이벤트 핸들러
          className={styles.video}
        />
      </div>

      <div className={styles.headingContainer}>
        <h2 ref={headingRef} className={styles.heading}>
          경험으로 빚어낸 단순함의 철학
        </h2>
      </div>
      
      <div className={styles.textGrid}>
        <div className={styles.textSection1}>
          <p>
          보험설계사로 근무하며, 특히 나이드신 분들이 <br /> 모바일 청약을 
          어려워하는 모습을 보며 <br />사용자에게 불필요한 요소가 <br /> 큰 불편을 주는지 깨달았습니다. <br /><br />
            이를 통해 단순히 기능을 제공하는 것을 넘어, <br/><span className={styles.highlight}>모든 사용자가 쉽게 사용할 수 있도록 
            설계</span>가 <br />중요하다는 것을 배웠습니다.
          </p>
        </div>

        <div className={styles.textSection2}>
          <p>
            제 프로젝트에서 중요한 핵심은 <span className={styles.highlight}>효율적인 압축</span> 입니다.<br />
            첫번째로 <span className={styles.highlight}>단순함이 주는 편리함</span> 으로, <br />
            한 화면에 과도한 정보를 담지 않았습니다.<br />
            두번째는 <span className={styles.highlight}>경험으로 UI를 익히는 것</span>을 목표로, <br /> 
            애니메이션을 미적 요소가 아닌 <br />사용법을 자연스럽게 익히도록 설계했습니다.<br />
            세번째는 <span className={styles.highlight}>본질에 집중</span> 하며, <br />
            옵션보다 핵심 성능을 우선 했습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section5Video;
