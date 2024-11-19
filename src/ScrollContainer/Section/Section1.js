import React from 'react';
import styles from './Section1.module.css';

const Section1 = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.section1Container}>
        <h1>portfolio</h1>
        <div className={styles.info}>
          <p>Yang Donghan</p>
          <p>Full Stack Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Section1;
