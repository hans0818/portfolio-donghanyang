import React from 'react';
import styles from './Section3.module.css';
import tabletKioskImage from '../../assets/images/테블릿키오스크.webp'; // 문제 사진 import
import phoneImage from '../../assets/images/휴대폰.webp'; // 해결 사진 import

const Section3 = () => {
  return (
    <div className={styles.section3}>
      <div className={styles.sloganContainer}>
        <h1>
          스마트폰이 나와서 편리해졌는데<br />
          왜 <span className={styles.highlight}>불편</span>해졌을까?
        </h1>
      </div>
      <div className={styles.problemImageContainer}>
        <img src={tabletKioskImage} alt="문제 사진" className={styles.problemImage} />
      </div>
      <div className={styles.problemTextContainer}>
        <h2>접근성 문제</h2>
        <p>: 노인, 장애인 등 익숙하지 않으면 사용하기 힘듦.</p>
        <h2>인간적 접촉 부족</h2>
        <p>: 직접적인 인간적인 도움을 필요로 할 때 이를 제공하기 어려움.</p>
        <h2>기술적 문제</h2>
        <p>: 소프트웨어 오류, 터치 스크린 문제, 네트워크 연결 불안정 등.</p>
        <h2>청결 문제</h2>
        <p>: 다수 사용자의 사용으로 전염병, 위생에 취약.</p>
      </div>
      <div className={styles.solutionImageContainer}>
        <img src={phoneImage} alt="해결 사진" className={styles.solutionImage} />
      </div>
      <div className={styles.solutionTextContainer}>
        <p>주변에 익숙한 도구로<br />사용자 친환경적인 UI를 만들어보자.</p>
      </div>
    </div>
  );
};

export default Section3;
