import React from 'react';
import styles from './Section2.module.css';

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <div className={styles.profileContainer}>
        <h2>프로필 사진 영역</h2>
      </div>
      <div className={styles.experienceContainer}>
        <h2>경력 사항</h2>
      </div>
    </div>
  );
};

export default Section2;
