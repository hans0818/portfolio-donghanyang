import React, { useRef, useLayoutEffect } from 'react';
import styles from './Section9.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import treeImage from '../../assets/images/tree.webp'; // Adjust the path if necessary

gsap.registerPlugin(ScrollTrigger);

const Section9 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const outcomeRef = useRef(null);
  const futurePlanRef = useRef(null);
  const reflectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const containers = [
        { ref: imageRef.current },
        { ref: outcomeRef.current },
        { ref: futurePlanRef.current },
        { ref: reflectionRef.current },
      ];

      containers.forEach((container) => {
        if (container.ref) {
          gsap.fromTo(
            container.ref,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container.ref,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                markers: false,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={styles.section9} ref={sectionRef}>
      {/* 섹션 제목 */}
      <h1 className={styles.sectionTitle}>코드로 쓴 성장 일기</h1>

      {/* 새로운 그리드 레이아웃 */}
      <div className={styles.contentGrid}>
        {/* 이미지 컨테이너 */}
        <div className={styles.imageContainer} ref={imageRef}>
          <img src={treeImage} alt="Tree" className={styles.treeImage} />
        </div>

        {/* 내용 컨테이너 */}
        <div className={styles.textContainers}>
          <div className={styles.outcomeContainer} ref={outcomeRef}>
            <h2>현재까지 성과</h2>
            <p>Firebase를 통해서 실시간 렌더링으로 UI를 완성.</p>
          </div>
          <div className={styles.futurePlanContainer} ref={futurePlanRef}>
            <h2>확장계획</h2>
            <p>
              React 코드 관리를 위해 Redux, Context API 활용, MariaDB 매출 관리, 직원 관리 시스템 제작,
              페이지 렌더링 최적화, typeScript 적용,
            </p>
          </div>
          <div className={styles.reflectionContainer} ref={reflectionRef}>
            <h2>생각보다 실천</h2>
            <p className={styles.reflectionText}>                        
              '과연 될까?'라는 의문 대신 <br />'왜'라는 질문이 문제 해결의 열쇠가 되었고, <br />
              기능을 추가할 때마다 <br /><span className={styles.highlight}>코딩의 가능성과 무한한 잠재력</span>을 실감했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section9;
