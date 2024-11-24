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
import kioskMenuPhoto from '../../assets/images/키오스크 메뉴사진.jpg'; // 새로운 이미지 추가
import kioskOptionSelection from '../../assets/images/키오스크 옵션선택.jpg'; // 새로운 이미지 추가

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
      <div className={styles.kioskHorizontalScroll}>
        <div className={styles.kioskImageContainer} ref={imageContainerRef}>
          {/* 기존 이미지 박스 */}
          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskMain} alt="KIOSK 메인" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  음식을 주문할 때 가장 <span className={styles.highlight}>필요한 요소로 UI</span>를 <br />
                  구성 했습니다.
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

          {/* 새로운 이미지 박스: KIOSK 메뉴사진 */}
          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskMenuPhoto} alt="KIOSK 메뉴사진" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  UI를 구성할 때 <span className={styles.highlight}>1차 정보, 2차 정보 구분</span>을 해서 <br />
                  1차 정보는 먼저 렌더링 하고 <br />2차 정보는 버튼을 눌렀을 때 렌더링합니다.<br />
                  <br /> 이미지, 텍스트 데이터가 있으면 <br /> 형관펜으로 강조를 하여 <br />
                  <span className={styles.highlight}>사용자 경험을 향상</span> 했습니다. <br />
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 메뉴사진</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskPreviousOrder} alt="KIOSK 기본주문" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  메뉴 스위치를 토글 스위치 컨셉으로 <br />어떤 항목을 주문 했는지 
                  <span className={styles.highlight}>쉽게 확인</span> 할 수 있게 <br />UI구성 했습니다.
                  <br /><br />
                  어떤 항목을 주문 했는지 확인 할 수 있습니다.
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
                  데이터에 유무에 따라 버튼이 렌더링됩니다. <br />
                  <br /> <span className={styles.highlight}>정말 필요한 정보에 집중</span>하여 <br /> 
                  불필요한 정보를 최대한 줄이는 방향<br />
                  으로 디자인 했습니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 옵션주문</p>
            </div>
          </div>

          {/* 새로운 이미지 박스: KIOSK 옵션선택 */}
          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskOptionSelection} alt="KIOSK 옵션선택" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  화면에 여러 요소가 있으면 불편 했던 경험을 바탕으로 <br />
                  <span className={styles.highlight}>필요한 정보를 집중</span>할 수 있도록 모달을 통하여 <br />
                  사용자 경험을 향상시킵니다.
                </p>
              </div>
            </div>
            <div className={styles.kioskTextContainer}>
              <p>KIOSK 옵션선택</p>
            </div>
          </div>

          <div className={styles.kioskImageBox}>
            <div className={styles.kioskContentGrid}>
              <img src={kioskOrderComplete} alt="KIOSK 주문완료" loading="lazy" />
              <div className={styles.kioskDescription}>
                <p>
                  가능하면 <span className={styles.highlight}>버튼 수를 최소화</span>하여 <br />
                  직관적으로 바로 버튼을 찾을 수 있게 했습니다. <br />
                  <br /> 요소를 추가하기 보다는 <br />
                  불필요한 요소를 제거하는데 집중하여 <br />
                  <span className={styles.highlight}>누구나 쉽게 사용할 수 있도록</span> 디자인 했습니다.
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
