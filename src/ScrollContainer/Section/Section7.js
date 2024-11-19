import React from 'react';
import styles from './Section7.module.css';

const Section7 = () => {
  return (
    <div className={styles.기술특징Section7}>
      <div className={styles.기술특징ContainerLeft}>
        <h2>소제목 1</h2>
        <p>내용 1</p>
      </div>
      <div className={styles.기술특징ContainerRight}>
        <h2>소제목 2</h2>
        <p>내용 2</p>
      </div>
      <div className={styles.기술특징ContainerLeft}>
        <h2>소제목 3</h2>
        <p>내용 3</p>
      </div>
      <div className={styles.기술특징ContainerRight}>
        <h2>소제목 4</h2>
        <p>내용 4</p>
      </div>
    </div>
  );
};

export default Section7;
