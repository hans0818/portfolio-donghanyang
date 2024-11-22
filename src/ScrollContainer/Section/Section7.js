import React, { useLayoutEffect, useRef } from 'react';
import styles from './Section7.module.css';
import bulbIcon from '../../assets/images/bulb.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section7 = () => {
  const leftRef1 = useRef(null);
  const rightRef1 = useRef(null);
  const leftRef2 = useRef(null);
  const rightRef2 = useRef(null);
  const coreRef = useRef(null);

  useLayoutEffect(() => {
    [leftRef1, rightRef1, leftRef2, rightRef2].forEach((ref) => {
      const elem = ref.current;
      if (!elem) return;

      const direction = elem.dataset.direction;
      let x = 0;

      if (direction === 'left') {
        x = -100; // 왼쪽으로 100px 이동
      } else if (direction === 'right') {
        x = 100; // 오른쪽으로 100px 이동
      }

      gsap.fromTo(
        elem,
        { x: x, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    });

    // 핵심 요소 애니메이션
    if (coreRef.current) {
      gsap.fromTo(
        coreRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: coreRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );
    }
  }, []);

  return (
    <div className={styles.techFeaturesSection}>
      <div ref={leftRef1} className={styles.techFeaturesContainerLeft} data-direction="left">
        <h2>React와 firebase 활용</h2>
        <ul>
          <li>
            React의 컴포넌트 기반 아키텍처와 Firebase의 실시간 데이터베이스를 통합하여 확장 가능한 웹 애플리케이션을 구축함.
          </li>
          <li>
            Firebase Authentication을 활용한 사용자 인증 시스템과 Firestore를 통한 데이터 관리로 안정적인 서비스를 구축함.
          </li>
        </ul>
      </div>
      <div ref={rightRef1} className={styles.techFeaturesContainerRight} data-direction="right">
        <h2>실시간 데이터 동기화</h2>
        <ul>
          <li>
            Firebase의 onSnapshot 리스너를 활용하여 주문 상태, 테이블 위치, 메뉴 변경 등 실시간으로 모든 디바이스에 동기화되도록 구현함.
          </li>
          <li>
            WebSocket 기반의 실시간 통신으로 POS와 키오스크 간의 즉각적인 데이터 업데이트를 보장함.
          </li>
        </ul>
      </div>
      <div ref={leftRef2} className={styles.techFeaturesContainerLeft} data-direction="left">
        <h2>반응형 디자인</h2>
        <ul>
          <li>
            CSS Grid와 Flexbox를 활용하여 다양한 화면 크기에 대응하는 레이아웃을 구현했습니다.
          </li>
          <li>
            모바일 환경에서도 최적화된 사용자 경험을 제공하도록 반응형 UI/UX를 설계했습니다.
          </li>
        </ul>
      </div>
      <div ref={rightRef2} className={styles.techFeaturesContainerRight} data-direction="right">
        <h2>성능 최적화</h2>
        <ul>
          <li>
            React.memo와 useMemo를 활용한 불필요한 리렌더링 방지로 애플리케이션의 성능을 향상시켰습니다.
          </li>
          <li>Code Splitting과 Lazy Loading을 통해 초기 로딩 시간을 최적화 시킴.</li>
        </ul>
      </div>
      <div ref={coreRef} className={styles.coreContainer} data-direction="center">
        <img src={bulbIcon} alt="Bulb Icon" className={styles.icon} />
        <div className={styles.coreText}>
          <p>이러한 기술적 특징들을 통해 사용자 경험을 개선하고</p>
          <p>애플리케이션의 안정성과 확장성을 확보했습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Section7;
