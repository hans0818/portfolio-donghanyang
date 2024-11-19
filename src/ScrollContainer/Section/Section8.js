import React from 'react';
import styles from './Section8.module.css';

const Section8 = () => {
  return (
    <div className={styles.개발과정Section8}>
      <div className={styles.개발과정Container}>
        <h2>소제목 1</h2>
        <p>내용 1</p>
      </div>
      <div className={styles.개발과정Container}>
        <h2>소제목 2</h2>
        <p>내용 2</p>
      </div>
      <div className={styles.개발과정Container}>
        <h2>소제목 3</h2>
        <p>내용 3</p>
      </div>
    </div>
  );
};

export default Section8;
