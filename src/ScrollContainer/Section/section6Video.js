// src/components/Section6/Section6.jsx
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
        end: '+=1200vh', // end 값을 문자열로 수정
        scrub: 1, // 스크롤과 애니메이션 동기화
        pin: true,
        anticipatePin: 1,
        markers: false, // 디버깅용 마커 (프로덕션에서는 false)
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
          {/* 각 이미지 박스 */}
          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskMain} alt="KIOSK 메인" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  음식을 주문할 때 가장 <span className={styles.highlight}>필요한 요소로 UI</span>를 <br />구성 했습니다.
                  <br />
                  메뉴, 가격이 먼저 보여서 주문하기 <br /> 편하게 했습니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 메인</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskBeverage} alt="KIOSK 음료영역" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  토글 스위치로 메뉴, 주류(음료)를 선택 할 수 있습니다.
                  <br />
                  추가 주문이 많을 수 있는 주류(음료)는 토글스위치로{' '}
                  <br /><span className={styles.highlight}>편하게 찾을 수 있게</span> UI를 구성했습니다.
                  <br />(토글 스위치 디자인 변경 예정)
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 음료영역</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskPreviousOrder} alt="KIOSK 기본주문" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  메뉴 스위치를 토글 스위치 컨셉으로 <br />어떤 항목을 주문 했는지 <span className={styles.highlight}>쉽게 확인</span> 할 수 있게 <br />UI구성 했습니다.
                  <br />
                  주문을 하면 주문 목록에 <br />어떤 항목을 주문 했는지 확인 할 수 있습니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 기본주문</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskOptionOrder} alt="KIOSK 옵션주문" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  데이터에 사이즈, 맛, 토핑 항목이 있으면 <br />{' '}
                  <span className={styles.highlight}>데이터에 따라 버튼이 렌더링</span> 됩니다. <br /> 없으면 버튼이 안 보여서 <br /> 불필요한 정보를 줄였습니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 옵션주문</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskOrderComplete} alt="KIOSK 주문완료" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  모달을 활용하여 <span className={styles.highlight}>집중도 있는 UI</span>를 구성하였습니다.
                  <br />
                  '주문'버튼을 누르면 POS로 <br /> 주문 데이터가 넘어가게 됩니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 주문완료</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;
