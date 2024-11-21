import React from 'react';
import styles from './Section6.module.css';

import kioskMain from '../../assets/images/키오스크 메인.jpg';
import kioskBeverage from '../../assets/images/키오스크 음료.jpg';
import kioskPreviousOrder from '../../assets/images/키오스크 기본주문.jpg';
import kioskOptionOrder from '../../assets/images/키오스크 옵션주문.jpg';
import kioskOrderComplete from '../../assets/images/키오스크 주문완료.jpg';

const Section6 = () => {
  return (
    <div className={styles.kioskSection6}>
      <h1>KIOSK 화면요소</h1>
      <div className={styles.kioskImageContainer}>
        <div className={styles.kioskImageBox}>
          <img src={kioskMain} alt="KIOSK MAIN" />
          <p>KIOSK MAIN</p>
        </div>
        <div className={styles.kioskImageBox}>
          <img src={kioskBeverage} alt="KIOSK BEVERAGE" />
          <p>KIOSK BEVERAGE</p>
        </div>
        <div className={styles.kioskImageBox}>
          <img src={kioskPreviousOrder} alt="KIOSK PREVIOUS ORDER" />
          <p>KIOSK PREVIOUS ORDER</p>
        </div>
        <div className={styles.kioskImageBox}>
          <img src={kioskOptionOrder} alt="KIOSK OPTION ORDER" />
          <p>KIOSK OPTION ORDER</p>
        </div>
        <div className={styles.kioskImageBox}>
          <img src={kioskOrderComplete} alt="KIOSK ORDER COMPLETE" />
          <p>KIOSK ORDER COMPLETE</p>
        </div>
      </div>
      <div className={styles.kioskVideoContainer}>
        동영상 추가 컨테이너
      </div>
    </div>
  );
};

export default Section6;
