// Section5.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Section5.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import posLogin from '../../assets/images/pos로그인.png';
import posSignup from '../../assets/images/pos회원가입.png';
import posMain from '../../assets/images/pos메인.png';
import posQuickButton from '../../assets/images/pos퀵버튼.png';
import posSettings from '../../assets/images/pos설정.png';
import posTableEdit from '../../assets/images/pos테이블편집.png';
import posMenuEdit1 from '../../assets/images/pos메뉴편집.png'; // 메뉴편집 이미지 마지막으로 이동

const Section5 = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const imageContainer = imageContainerRef.current;

    gsap.to(imageContainer, {
      x: () => -(imageContainer.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=800vh`, // 섹션 높이에 맞춰 end 값 설정
        scrub: 1, // scrub 값을 1로 설정하여 스크롤과 애니메이션의 동기화를 부드럽게 함
        pin: true,
        anticipatePin: 1,
        markers: true, // 디버깅용 마커 (프로덕션에서는 false로 설정)
      },
    });

    // 창 크기 변경 시 ScrollTrigger 업데이트
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.posSection5} ref={sectionRef}>
      {/* 제목 컨테이너 */}
      <div className={styles.posTitleContainer}>
        <h1 className={styles.posTitle}>POS 화면요소</h1>
      </div>

      {/* 가로 스크롤 컨테이너 */}
      <div className={styles.posHorizontalScroll}>
        <div className={styles.posImageContainer} ref={imageContainerRef}>
          <div className={styles.posImageBox}>
            <img src={posLogin} alt="POS 로그인" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 로그인</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posSignup} alt="POS 회원가입" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 회원가입</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posMain} alt="POS 메인" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 메인</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posQuickButton} alt="POS 퀵버튼" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 퀵버튼</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posSettings} alt="POS 설정" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 설정</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posTableEdit} alt="POS 테이블편집" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 테이블편집</p>
            </div>
          </div>
          <div className={styles.posImageBox}>
            <img src={posMenuEdit1} alt="POS 메뉴편집" loading="lazy" />
            <div className={styles.posTextContainer}>
              <p>POS 메뉴편집</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
