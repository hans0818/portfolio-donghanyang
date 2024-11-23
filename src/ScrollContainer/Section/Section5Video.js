import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import styles from './Section5Video.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5Video = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  // YouTube 동영상 옵션
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      burnAndShineTimeline.kill();
    };
  }, []);

  return (
    <div className={styles.section5VideoWrapper} ref={sectionRef}>
      <div className={styles.videoSection}>
        <YouTube 
          videoId={videoId} 
          opts={opts} 
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
            보험설계사로 근무하면서 많은 분들이 모바일 청약의 어려워 했습니다.
            특히, 나이드신 분들은 모바일 청약을 못하는 걸 보면서 모바일 청약의 불필요한 요소가 
            사용자에게 얼마나 불편함을 느끼게 하는지 깨달았습니다. <br />
            이 경험은 통해 단순히 기능을 제공하는 것이 아니라, <span className={styles.highlight}>모든 사용자가 쉽게 사용할 수 있도록 
            설계</span>되어야 한다는 것을 느꼈습니다.
            프로젝트를 진행하면서 누구나 쉽게 접근할 수 있는 UI설계를 끊임없이 고만하고 있습니다.
          </p>
        </div>

        <div className={styles.textSection2}>
          <p>
            제 프로젝트에서 중요한 핵심은 <span className={styles.highlight}>효율적인 압축</span> 입니다.<br />
            첫번째로 <span className={styles.highlight}>단순함이 주는 편리함</span> 입니다. 
            하나의 화면에 너무 많은 것을 담는 것을 피했습니다.<br />
            두번째는 사용자가<span className={styles.highlight}>경험으로 UI를 익히는 것</span>입니다. 
            미적인 요소로 애니메이션을 넣는 것이 아니라 
            경험으로 사용법을 습득할 수 있게 애니메이션을 구성했습니다.<br />
            세번째는 <span className={styles.highlight}>본질에 집중</span> 하는 것입니다. 
            좋은 자동차는 옵션이 많은 자동차가 아니라 
            엑셀과 브레이크 같이 자동차의 핵심적인 성능이 우선입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section5Video;
