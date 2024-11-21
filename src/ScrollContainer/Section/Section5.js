import React from 'react';
import styles from './Section5.module.css';

import posLogin from '../../assets/images/pos로그인.png';
import posSignup from '../../assets/images/pos회원가입.png';
import posMain from '../../assets/images/pos메인.png';
import posQuickButton from '../../assets/images/pos퀵버튼.png';
import posSettings from '../../assets/images/pos설정.png';
import posTableEdit from '../../assets/images/pos테이블편집.png';
import posMenuEdit1 from '../../assets/images/pos메뉴편집.png'; // 메뉴편집 이미지 마지막으로 이동

const Section5 = () => {
  return (
    <div className={styles.posSection5}>
      <h1>POS 화면요소</h1>
      <div className={styles.posImageContainer}>
        <div className={styles.posImageBox}>
          <img src={posLogin} alt="POS 로그인" />
          <p>POS 로그인</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posSignup} alt="POS 회원가입" />
          <p>POS 회원가입</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posMain} alt="POS 메인" />
          <p>POS 메인</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posQuickButton} alt="POS 퀵버튼" />
          <p>POS 퀵버튼</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posSettings} alt="POS 설정" />
          <p>POS 설정</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posTableEdit} alt="POS 테이블편집" />
          <p>POS 테이블편집</p>
        </div>
        <div className={styles.posImageBox}>
          <img src={posMenuEdit1} alt="POS 메뉴편집" />
          <p>POS 메뉴편집</p>
        </div>
      </div>
      <div className={styles.posVideoContainer}>
        {/* 유튜브 동영상 임베드 */}
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/stwp4vslnmc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Section5;
