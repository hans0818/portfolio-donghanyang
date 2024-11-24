// src/components/Section6/Section6.jsx
import React, { useLayoutEffect, useRef } from 'react';
import styles from './Section6.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    description: '추후 작업 2',
  },
  {
    src: kioskBeverage,
    title: 'KIOSK 음료영역',
    description: '추후 작업 3',
  },
  {
    src: kioskMenuPhoto,
    title: 'KIOSK 메뉴사진',
    description: '추후 작업 4',
  },
  {
    src: kioskPreviousOrder,
    title: 'KIOSK 기본주문',
    description: '추후 작업 5',
  },
  {
    src: kioskOptionOrder,
    title: 'KIOSK 옵션주문',
    description: '추후 작업 6',
  },
  {
    src: kioskOptionSelection,
    title: 'KIOSK 옵션선택',
    description: '추후 작업 7',
  },
  {
    src: kioskOrderComplete,
    title: 'KIOSK 주문완료',
    description: '추후 작업 8',
  },
];

const Section6 = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const imageRefs = useRef([]);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const images = imageRefs.current;

    // 래퍼를 스크롤 동안 고정
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * (imagesData.length - 1)}`,
      pin: wrapperRef.current,
      pinSpacing: true,
      markers: true, // 디버깅 시 사용
    });

    // 이미지 전환 애니메이션 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * (imagesData.length - 1)}`,
        scrub: true,
        markers: false, // 디버깅 완료 시 false로 설정
      },
    });

    imagesData.forEach((data, index) => {
      const currentImage = images[index];
      const nextImage = images[index + 1];

      // 이미지 초기 상태 설정
      gsap.set(currentImage, {
        opacity: index === 0 ? 1 : 0,
        filter: 'blur(0px)',
      });

      // 현재 이미지 블러 아웃 및 투명화
      tl.to(
        currentImage,
        {
          opacity: 0,
          filter: 'blur(20px)',
          duration: 1,
          ease: 'power3.inOut',
        },
        index * window.innerHeight
      );

      // 다음 이미지 블러 인 및 나타나기
      if (nextImage) {
        tl.fromTo(
          nextImage,
          {
            opacity: 0,
            filter: 'blur(20px)',
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.inOut',
          },
          index * window.innerHeight
        );
      }

      // 설명 텍스트 업데이트
      tl.call(
        () => {
          if (descriptionRef.current) {
            const subtitle = descriptionRef.current.querySelector(`.${styles.kioskSubtitle}`);
            const description = descriptionRef.current.querySelector('p');
            if (subtitle && description) {
              subtitle.textContent = data.title;
              description.textContent = data.description;
            }
          }
        },
        null,
        index * window.innerHeight + 0.5
      );
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
              style={{ opacity: index === 0 ? 1 : 0, filter: 'blur(0px)' }}
            />
          ))}
        </div>

        {/* 설명 컨테이너 */}
        <div className={styles.kioskDescriptionContainer}>
          <div className={styles.kioskDescription} ref={descriptionRef}>
            <h2 className={styles.kioskSubtitle}>{imagesData[0].title}</h2>
            <p>{imagesData[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section6;