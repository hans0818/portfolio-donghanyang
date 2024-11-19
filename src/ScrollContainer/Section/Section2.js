import React from 'react';
import styles from './Section2.module.css';
import profileImage from '../../assets/images/donghanImage.png';

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <div className={styles.profileContainer}>
        <img 
          src={profileImage} 
          alt="양동한 프로필" 
          className={styles.profileImage}
        />
      </div>
      <div className={styles.experienceContainer}>
        <h2>프로필</h2>
        <p className={styles.highlightName}>양동한</p> {/* 글자를 크게 나타내기 위해 클래스 추가 */}
        <p>1991.08.18</p>
        <p>울산광역시 중구 학성공원 4길 49, 602호</p>
        <p>donghany0818@naver.com</p>
        <p>부경대학교 소방공학과(중퇴)</p>
      </div>
      <div className={styles.careerContainer}>
        <h2>경력사항</h2>
        <p>2018.02 ~ 2019.06 동양생명 영업팀장</p>
        <p>2019.08 ~ 2020.08 피플라이프 팀장</p>
        <p>2020.09 ~ 2024.10 굿리치 RP</p>
      </div>
    </div>
  );
};

export default Section2;
