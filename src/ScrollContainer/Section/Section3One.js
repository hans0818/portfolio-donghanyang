import React from 'react';
import styles from './Section3One.module.css';
import FigmaLogo from '../../assets/logo/figma.svg'; // Figma 로고 import
import JSLogo from '../../assets/logo/JS.png'; // JavaScript PNG 로고 import
import ReactLogo from '../../assets/logo/react.png'; // React 로고 import
import NodeLogo from '../../assets/logo/Node.js.png'; // Node.js PNG 로고 import
import FirebaseLogo from '../../assets/logo/firebase.png'; // Firebase PNG 로고 import
import VSCodeLogo from '../../assets/logo/vscode.png'; // VSCode PNG 로고 import
import OpenAILogo from '../../assets/logo/openai.png'; // OpenAI PNG 로고 import
import NotionLogo from '../../assets/logo/notion.png'; // Notion PNG 로고 import
import CursorLogo from '../../assets/logo/cursor.png'; // Cursor PNG 로고 import

const Section3One = () => {
  return (
    <div className={styles.section3One}>
      <div className={styles.projectNameContainer}>
        <h1>OrderIn</h1> {/* 큰 글자로 프로젝트 이름 */}
      </div>
      <div className={styles.developmentPeriodContainer}>
        <p>개발시작 2024-08-01</p> {/* 개발 기간 텍스트 */}
      </div>
      <div className={styles.developmentStackContainer}>
        <div className={styles.stackBox}>
          design
          <img src={FigmaLogo} alt="Figma 로고" className={styles.logo} />
        </div>
        <div className={`${styles.stackBox} ${styles.frontendStackBox}`}>
          frontend
          <div className={styles.logoRow}>
            <img src={JSLogo} alt="JavaScript 로고" className={styles.logo} />
            <img src={ReactLogo} alt="React 로고" className={styles.logo} />
          </div>
        </div>
        <div className={`${styles.stackBox} ${styles.backendStackBox}`}>
          backend
          <div className={styles.logoRow}>
            <img src={NodeLogo} alt="Node.js 로고" className={styles.logo} />
            <img src={FirebaseLogo} alt="Firebase 로고" className={styles.logo} />
          </div>
        </div>
        <div className={`${styles.stackBox} ${styles.toolStackBox}`}>
          development tool
          <div className={styles.logoGrid}>
            <img src={VSCodeLogo} alt="VSCode 로고" className={styles.logo} />
            <img src={OpenAILogo} alt="OpenAI 로고" className={styles.logo} />
            <img src={NotionLogo} alt="Notion 로고" className={styles.logo} />
            <img src={CursorLogo} alt="Cursor 로고" className={styles.logo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3One;
