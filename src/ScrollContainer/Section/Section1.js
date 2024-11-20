import React from 'react';
import styles from './Section1.module.css';

const Section1 = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.section1Container}>
        <h1>portfolio</h1>
        <div className={styles.info}>
          <p className={styles.name}>Yang Donghan</p>
          <p className={styles.title}>Full Stack Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
