// src/components/Section5/Section5.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './Section5.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tooltip from './Tooltip/Tooltip';

import posLogin from '../../assets/images/pos로그인.png';
import posSignup from '../../assets/images/pos회원가입.png';
import posMain from '../../assets/images/pos메인.png';
import posQuickButton from '../../assets/images/pos퀵버튼.png';
import posSettings from '../../assets/images/pos설정.png';
import posTableEdit from '../../assets/images/pos테이블편집.png';
import posMenuEdit1 from '../../assets/images/pos메뉴편집.png';

const Section5 = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    text: '',
  });

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
        end: () => `+=800vh`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false,
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = (e, title, text) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      title,
      text,
    });
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip({
      visible: false,
      x: 0,
      y: 0,
      title: '',
      text: '',
    });
  };

  return (
    <div className={styles.posSection5} ref={sectionRef}>
      <Tooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        title={tooltip.title}
        text={tooltip.text}
      />

      <div className={styles.posHorizontalScroll}>
        <div
          className={styles.posImageContainer}
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
        >
          {[
            {
              img: posLogin,
              alt: 'POS 로그인',
              tooltipTitle: '로그인',
              tooltipText: '사용자가 로그인할 수 있는 페이지입니다.',
            },
            {
              img: posSignup,
              alt: 'POS 회원가입',
              tooltipTitle: '회원가입',
              tooltipText: '새로운 사용자를 등록할 수 있는 페이지입니다.',
            },
            {
              img: posMain,
              alt: 'POS 메인',
              tooltipTitle: '메인 화면',
              tooltipText: 'POS의 주요 기능을 관리하는 페이지입니다.',
            },
            {
              img: posQuickButton,
              alt: 'POS 퀵버튼',
              tooltipTitle: '퀵 버튼 설정',
              tooltipText: '빠르게 접근할 기능을 설정합니다.',
            },
            {
              img: posSettings,
              alt: 'POS 설정',
              tooltipTitle: '설정',
              tooltipText: 'POS의 다양한 설정을 변경할 수 있습니다.',
            },
            {
              img: posTableEdit,
              alt: 'POS 테이블편집',
              tooltipTitle: '테이블 편집',
              tooltipText: [
                '테이블 배치를 변경하고 관리합니다.',
                '테이블 위치, 크기, 색상, 제목을 수정할 수 있습니다.',
              ],
            },
            {
              img: posMenuEdit1,
              alt: 'POS 메뉴편집',
              tooltipTitle: '메뉴 편집',
              tooltipText: '메뉴 항목을 추가하거나 수정할 수 있습니다.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className={styles.posImageBox}
              onMouseEnter={(e) =>
                handleMouseEnter(e, item.tooltipTitle, item.tooltipText)
              }
              onMouseLeave={handleMouseLeave}
            >
              <img src={item.img} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section5;
