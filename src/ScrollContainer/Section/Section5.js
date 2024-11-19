import React from 'react';
import styles from './Section5.module.css';

const Section5 = () => {
  return (
    <div className={styles.posSection5}>
      <h1>POS 화면요소</h1>
      <div className={styles.posImageContainer}>
        <div className={styles.posImageBox}>이미지 1</div>
        <div className={styles.posImageBox}>이미지 2</div>
        <div className={styles.posImageBox}>이미지 3</div>
        <div className={styles.posImageBox}>이미지 4</div>
      </div>
      <div className={styles.posVideoContainer}>
        동영상 추가 컨테이너
      </div>
    </div>
  );
};

export default Section5;

/// Swiper.js 라이브러리 활용할 예정
