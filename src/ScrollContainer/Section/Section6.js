import React from 'react';
import styles from './Section6.module.css';

const Section6 = () => {
  return (
    <div className={styles.kioskSection6}>
      <h1>KIOSK 화면요소</h1>
      <div className={styles.kioskImageContainer}>
        <div className={styles.kioskImageBox}>이미지 1</div>
        <div className={styles.kioskImageBox}>이미지 2</div>
        <div className={styles.kioskImageBox}>이미지 3</div>
        <div className={styles.kioskImageBox}>이미지 4</div>
      </div>
      <div className={styles.kioskVideoContainer}>
        동영상 추가 컨테이너
      </div>
    </div>
  );
};

export default Section6;

