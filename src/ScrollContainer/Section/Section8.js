import React, { useRef, useEffect } from 'react';
import styles from './Section8.module.css';
import kioskIssueImage from '../../assets/images/키오스크 문제해결.jpg'; // 첫 번째 이미지
import firebaseLogo from '../../assets/logo/firebase.svg'; // Firebase 로고
import openAILogo from '../../assets/logo/openai.svg'; // OpenAI 로고
import { gsap } from 'gsap'; // GSAP 임포트

const Section8 = () => {
  const viewportImageRef = useRef(null);
  const firebaseLogoRef = useRef(null);
  const openAILogoRef = useRef(null);

  useEffect(() => {
    gsap.to(viewportImageRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(firebaseLogoRef.current, {
      rotation: 30,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    gsap.to(openAILogoRef.current, {
      x: 10,
      duration: 0.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className={styles.developmentSection}>
      {/* 섹션 제목 */}
      <h1 className={styles.sectionTitle}>문제를 양분으로 피어난 성장의 꽃</h1>
      
      {/* "뷰포트 문제(css)" 섹션 */}
      <div className={styles.developmentContainer}>
        <h2>뷰포트 문제(css)</h2>
        <div className={styles.contentWrapper}>
          <img
            src={kioskIssueImage}
            alt="키오스크 문제해결"
            className={styles.problemImage}
            ref={viewportImageRef}
          />
          <p>
            반응형 디자인을 만들 때 뷰포트는 항상 어려웠습니다. <br />
            포기하지 않고 유튜브, 구글링으로 해당 문제 원인을 파악하고 <br />
            rootmargin 값을 수정하여 문제를 해결했습니다.<br />
            이번 문제 해결로 <span className={styles.emphasis}> css, 레이아웃을 이해</span>하게 되었습니다.
          </p>
        </div>
      </div>

      {/* "Firebase 연결문제" 섹션 */}
      <div className={styles.developmentContainer}>
        <h2>Firebase 연결문제</h2>
        <div className={styles.contentWrapper}>
          <img
            src={firebaseLogo}
            alt="Firebase 로고"
            className={styles.problemfirebaseImage}
            ref={firebaseLogoRef}
          />
          <p>
            Firebase의 경우 독학을 해야 하는 상황이라서 어려움이 많았습니다. <br />
            다행히 공식문서가 잘 되어 있어서 쉽게 따라갈 수 있었습니다. <br />
            어떠한 문제가 발생하더라도 해결해 나갈 수 있으며<br />
            <span className={styles.emphasis}>필요한 정보를 찾아내는 능력</span>을 기를 수 있었습니다.
          </p>
        </div>
      </div>

      {/* "GPT 환각문제" 섹션 */}
      <div className={styles.developmentContainer}>
        <h2>GPT 환각문제</h2>
        <div className={styles.contentWrapper}>
          <img
            src={openAILogo}
            alt="OpenAI 로고"
            className={styles.problemImage}
            ref={openAILogoRef}
          />
          <p>
            LLM 모델을 활용하여 코드 작성하면서 항상 환각효과가 문제였습니다. <br />
            <span className={styles.emphasis}>피그잼, 노션, 프롬프트 기법 향상</span>으로 환각효과를 해결했습니다. <br />
            이후 어떤 라이브러리, 프레임워크라도 <span className={styles.emphasis}>자신 있게 접근</span>할 수 있게 되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section8;
