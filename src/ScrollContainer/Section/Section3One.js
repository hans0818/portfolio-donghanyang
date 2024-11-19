import React from 'react';
import styles from './Section3One.module.css';

const Section3One = () => {
  return (
    <div className={styles.section3One}>
      <div className={styles.projectNameContainer}>
        <h1>OrderIn</h1> {/* 큰 글자로 프로젝트 이름 */}
      </div>
      <div className={styles.developmentPeriodContainer}>
        <p>개발시작 2024-08-01</p> {/* 개발 기간 텍스트 */}
      </div>
      <div className={styles.developmentStackContainer}>
        <div className={styles.stackBox}>디자인</div>
        <div className={styles.stackBox}>프론트엔드</div>
        <div className={styles.stackBox}>백엔드</div>
        <div className={styles.stackBox}>개발툴</div>
      </div>
    </div>
  );
};

export default Section3One;
