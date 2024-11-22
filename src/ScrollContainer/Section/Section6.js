import React, { useEffect, useRef } from 'react';
import styles from './Section6.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import kioskMain from '../../assets/images/키오스크 메인.jpg';
import kioskBeverage from '../../assets/images/키오스크 음료.jpg';
import kioskPreviousOrder from '../../assets/images/키오스크 기본주문.jpg';
import kioskOptionOrder from '../../assets/images/키오스크 옵션주문.jpg';
import kioskOrderComplete from '../../assets/images/키오스크 주문완료.jpg';

const Section6 = () => {
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
        end: () => `+=900vh`, // 섹션 높이에 맞춰 end 값 설정
        scrub: 1, // scrub 값을 1로 설정하여 스크롤과 애니메이션의 동기화를 부드럽게 함
        pin: true,
        anticipatePin: 1,
        markers: false, // 디버깅용 마커 (프로덕션에서는 false로 설정)
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
    <div className={styles.kioskSection6} ref={sectionRef}>
      <div className={styles.kioskTitleContainer}>
        <h1 className={styles.kioskTitle}>KIOSK 화면요소</h1>
      </div>

      <div className={styles.kioskHorizontalScroll}>
        <div className={styles.kioskImageContainer} ref={imageContainerRef}>
          <div className={styles.kioskImageBox}>
            <img src={kioskMain} alt="KIOSK MAIN" loading="lazy" />
            <div className={styles.kioskTextContainer}>
              <p>KIOSK MAIN</p>
            </div>
          </div>
          <div className={styles.kioskImageBox}>
            <img src={kioskBeverage} alt="KIOSK BEVERAGE" loading="lazy" />
            <div className={styles.kioskTextContainer}>
              <p>KIOSK BEVERAGE</p>
            </div>
          </div>
          <div className={styles.kioskImageBox}>
            <img src={kioskPreviousOrder} alt="KIOSK PREVIOUS ORDER" loading="lazy" />
            <div className={styles.kioskTextContainer}>
              <p>KIOSK PREVIOUS ORDER</p>
            </div>
          </div>
          <div className={styles.kioskImageBox}>
            <img src={kioskOptionOrder} alt="KIOSK OPTION ORDER" loading="lazy" />
            <div className={styles.kioskTextContainer}>
              <p>KIOSK OPTION ORDER</p>
            </div>
          </div>
          <div className={styles.kioskImageBox}>
            <img src={kioskOrderComplete} alt="KIOSK ORDER COMPLETE" loading="lazy" />
            <div className={styles.kioskTextContainer}>
              <p>KIOSK ORDER COMPLETE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
