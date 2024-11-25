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
      음식을 주문할 때 가장 <span class="${styles.highlight}">필요한 요소로 UI</span>를
      구성 했습니다.<br />      
      메뉴, 가격이 먼저 보여서 주문하기 편하게 했습니다.
    `,
  },
  {
    src: kioskBeverage,
    title: 'KIOSK 음료영역',
    description: `
      토글 스위치로 메뉴, 주류(음료)를 선택 할 수 있습니다.
      <br />
      추가 주문이 많을 수 있는 주류(음료)는 토글스위치로 <br /><span class="${styles.highlight}">편하게 찾을 수 있게</span> UI를 구성했습니다.
      <br />(토글 스위치 디자인 변경 예정)
    `,
  },
  {
    src: kioskMenuPhoto,
    title: 'KIOSK 메뉴사진',
    description: `
      UI를 구성할 때 <span class="${styles.highlight}">1차 정보, 2차 정보 구분</span>을 해서 <br />
      1차 정보는 먼저 렌더링 하고 <br />2차 정보는 버튼을 눌렀을 때 렌더링합니다.<br />
      <br /> 이미지, 텍스트 데이터가 있으면 <br /> 형관펜으로 강조를 하여 <br />
      <span class="${styles.highlight}">사용자 경험을 향상</span> 했습니다. <br />
    `,
  },
  {
    src: kioskPreviousOrder,
    title: 'KIOSK 기본주문',
    description: `
      메뉴 스위치를 토글 스위치 컨셉으로 <br />어떤 항목을 주문 했는지 
      <span class="${styles.highlight}">쉽게 확인</span> 할 수 있게 <br />UI구성 했습니다.
      <br /><br />
      어떤 항목을 주문 했는지 확인 할 수 있습니다.
    `,
  },
  {
    src: kioskOptionOrder,
    title: 'KIOSK 옵션주문',
    description: `
      데이터에 사이즈, 맛, 토핑 항목이 있으면 <br />{' '}
      데이터에 유무에 따라 버튼이 렌더링됩니다. <br />
      <br /> <span class="${styles.highlight}">정말 필요한 정보에 집중</span>하여 <br /> 
      불필요한 정보를 최대한 줄이는 방향<br />
      으로 디자인 했습니다.
    `,
  },
  {
    src: kioskOptionSelection,
    title: 'KIOSK 옵션선택',
    description: `
      화면에 여러 요소가 있으면 불편 했던 경험을 바탕으로 <br />
      <span class="${styles.highlight}">필요한 정보를 집중</span>할 수 있도록 모달을 통하여 <br />
      사용자 경험을 향상시킵니다.
    `,
  },
  {
    src: kioskOrderComplete,
    title: 'KIOSK 주문완료',
    description: `
      가능하면 <span class="${styles.highlight}">버튼 수를 최소화</span>하여 <br />
      직관적으로 바로 버튼을 찾을 수 있게 했습니다. <br />
      <br /> 요소를 추가하기 보다는 <br />
      불필요한 요소를 제거하는데 집중하여 <br />
      <span class="${styles.highlight}">누구나 쉽게 사용할 수 있도록</span> 디자인 했습니다.
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
