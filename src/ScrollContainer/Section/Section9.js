import React from 'react';
import styles from './Section9.module.css';

const Section8 = () => {
  return (
    <div className={styles.section8}>
      <div className={styles.outcomeContainer}>
        <h2>Outcome</h2>
        <p>Details about the outcome...</p>
      </div>
      <div className={styles.futurePlanContainer}>
        <h2>Future Plan</h2>
        <p>Details about the future plan...</p>
      </div>
      <div className={styles.reflectionContainer}>
        <h2>Reflection</h2>
        <p>Details about the reflection...</p>
      </div>
    </div>
  );
};

export default Section8;
