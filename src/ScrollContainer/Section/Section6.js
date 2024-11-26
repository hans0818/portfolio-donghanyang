// src/components/Section6/Section6.jsx
import React, { useLayoutEffect, useRef } from 'react';
import styles from './Section6.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 이미지 임포트
import kioskMain from '../../assets/images/키오스크 메인.jpg';
import kioskBeverage from '../../assets/images/키오스크 음료.jpg';
import kioskPreviousOrder from '../../assets/images/키오스크 기본주문.jpg';
import kioskOptionOrder from '../../assets/images/키오스크 옵션주문.jpg';
import kioskOrderComplete from '../../assets/images/키오스크 주문완료.jpg';
import kioskMenuPhoto from '../../assets/images/키오스크 메뉴사진.jpg';
import kioskOptionSelection from '../../assets/images/키오스크 옵션선택.jpg';

gsap.registerPlugin(ScrollTrigger);

const imagesData = [
  {
    src: kioskMain,
    title: 'KIOSK 메인',
    description: `
      음식 주문에 가장 <span class="${styles.highlight}">필요한 요소</span>를 <br /> 중심으로 UI를 구성했습니다.<br />
      메뉴와 가격을 우선적으로 보여 주문 과정을 <br />더 직관적이고 편리하게 만들었습니다.
    `,
  },
  {
    src: kioskBeverage,
    title: 'KIOSK 음료영역',
    description: `
      토글 스위치를 통해 메뉴와 주류(음료)를 <br />선택할 수 있습니다.<br /><br />
      주문 빈도가 높은 주류(음료)는 <br /><span class="${styles.highlight}">쉽게 찾을 수 있도록</span> UI를 설계했습니다.
      <br /><br />
    `,
  },
  {
    src: kioskMenuPhoto,
    title: 'KIOSK 메뉴사진',
    description: `
      1차 정보는 먼저 렌더링하고, <br />2차 정보는 스위치 클릭 시<br />
      표시되도록 구성했습니다.<br />
      <br /> 이미지나 메뉴설명이 있으면 <br /> 형광펜 효과를 활용해 강조하고, <br /> <span class="${styles.highlight}">'선택과 집중'</span>을 
      통하여 <br />사용자 경험을 향상시키는 데<br /> 중점을 두었습니다.
    `,
  },
  {
    src: kioskPreviousOrder,
    title: 'KIOSK 기본주문',
    description: `
      메뉴 스위치는 토글 스위치 컨셉을 활용하여 <br />
      어떤 항목을 주문했는지 <span class="${styles.highlight}">쉽게 확인</span>할 수 있도록 설계했습니다.
      <br /><br />
      사용자가 주문 내역을 한눈에 파악할 수 있습니다.
    `,
  },
  {
    src: kioskOptionOrder,
    title: 'KIOSK 옵션주문',
    description: `
      사이즈, 맛, 토핑 항목이 포함된 경우, <br />
      해당 데이터에 따라 버튼이 <br />동적으로 렌더링됩니다.<br />
      <br /> <span class="${styles.highlight}">중요한 정보에 집중</span>하고<br /> 
      불필요한 정보를 <br />최소화하는 방향으로 디자인했습니다.
    `,
  },
  {
    src: kioskOptionSelection,
    title: 'KIOSK 옵션선택',
    description: `
      화면에 요소가 많아 불편했던 경험을 기반으로, <br />
      <span class="${styles.highlight}">필요한 정보에 집중</span>할 수 있도록<br />
      모달 방식을 활용해 사용자 경험을 개선했습니다.
    `,
  },
  {
    src: kioskOrderComplete,
    title: 'KIOSK 주문완료',
    description: `
      <span class="${styles.highlight}">버튼 수를 최소화</span>하여 <br />
      직관적으로 원하는 버튼을 <br />찾을 수 있도록 설계했습니다.<br />
      <br /> 하지만 기존 키오스크가 제공하는 <br />필수 기능은 그대로 유지하며, <br />
      불필요한 요소를 제거하여 <br />간결함과 편리함을 동시에 추구했습니다.
    `,
  },
];

const Section6 = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const imageRefs = useRef([]);
  const descriptionRefs = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const images = imageRefs.current;
    const descriptions = descriptionRefs.current;

    // 초기 상태 설정
    gsap.set(images, { opacity: 0, filter: 'blur(20px)' });
    gsap.set(images[0], { opacity: 1, filter: 'blur(0px)' });
    gsap.set(descriptions, { opacity: 0, y: 50 }); // 초기 디스크립션 위치 설정
    gsap.set(descriptions[0], { opacity: 1, y: 0 }); // 첫 디스크립션은 보이도록 설정

    // 래퍼를 스크롤 동안 고정
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * imagesData.length}`,
      pin: wrapperRef.current,
      pinSpacing: true,
      markers: false, // 디버깅 완료 후 false로 변경
    });

    // 이미지 및 디스크립션 전환 애니메이션 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * imagesData.length}`,
        scrub: true,
        markers: false, // 디버깅 완료 후 false로 변경
      },
    });

    imagesData.forEach((data, index) => {
      const currentImage = images[index];
      const nextImage = images[index + 1];
      const currentDescription = descriptions[index];
      const nextDescription = descriptions[index + 1];

      if (nextImage && nextDescription) {
        // 현재 이미지 블러 아웃 및 투명화
        tl.to(
          currentImage,
          {
            opacity: 0,
            filter: 'blur(20px)',
            duration: 1.5, // 지속 시간 늘림
            ease: 'power3.inOut',
          },
          `+=0.5` // 약간의 지연 후 시작
        );

        // 다음 이미지 블러 인 및 나타나기
        tl.fromTo(
          nextImage,
          {
            opacity: 0,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5, // 지속 시간 늘림
            ease: 'power3.inOut',
          },
          `-=${0.75}` // 이전 애니메이션과 겹치게 시작
        );

        // 현재 디스크립션 사라지기 (위로 이동하며 사라짐)
        tl.to(
          currentDescription,
          {
            opacity: 0,
            y: -150, // 위로 이동
            duration: 1.5, // 지속 시간 늘림
            ease: 'power3.inOut',
          },
          `-=${0.75}` // 이미지 전환과 동시에 사라지게
        );

        // 다음 디스크립션 나타나기 (아래에서 위로 이동하며 나타남)
        tl.fromTo(
          nextDescription,
          {
            opacity: 0,
            y: 150, // 아래에서 시작
          },
          {
            opacity: 1,
            y: 0, // 현재 위치로 이동
            duration: 1.5, // 지속 시간 늘림
            ease: 'power3.out',
          },
          `-=${0.75}` // 이미지 전환과 동시에 나타나게
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.kioskSection6} ref={sectionRef}>
      {/* 래퍼 컨테이너 */}
      <div className={styles.kioskWrapper} ref={wrapperRef}>
        {/* 이미지 컨테이너 */}
        <div className={styles.kioskImageContainer}>
          {imagesData.map((data, index) => (
            <img
              key={index}
              src={data.src}
              alt={data.title}
              className={styles.kioskImage}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* 설명 컨테이너 */}
        <div className={styles.kioskDescriptionContainer}>
          {imagesData.map((data, index) => (
            <div
              key={index}
              className={styles.kioskDescription}
              ref={(el) => (descriptionRefs.current[index] = el)}
            >
              <h2 className={styles.kioskSubtitle}>{data.title}</h2>
              {/* dangerouslySetInnerHTML을 사용하여 HTML 문자열을 렌더링 */}
              <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section6;
