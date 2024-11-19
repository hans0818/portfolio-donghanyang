import React from 'react';
import styles from './Section3.module.css';

const Section3 = () => {
  return (
    <div className={styles.section3}>
      <div className={styles.sloganContainer}>
        <h1>
          스마트폰이 나와서 편리해졌는데<br />
          왜 <span className={styles.highlight}>불편</span>해졌을까?
        </h1>
      </div>
      <div className={styles.problemImageContainer}>문제사진 컨테이너</div>
      <div className={styles.problemTextContainer}>문제텍스트 컨테이너</div>
      <div className={styles.solutionImageContainer}>해결사진 컨테이너</div>
      <div className={styles.solutionTextContainer}>해결텍스트 컨테이너</div>
    </div>
  );
};

export default Section3;
