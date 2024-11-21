import React, { useRef, useEffect } from 'react';
import styles from './Section8.module.css';
import kioskIssueImage from '../../assets/images/키오스크 문제해결.jpg'; // 첫 번째 이미지
import firebaseLogo from '../../assets/logo/firebase.svg'; // Firebase 로고
import openAILogo from '../../assets/logo/openai.svg'; // OpenAI 로고
import { gsap } from 'gsap'; // GSAP 임포트

const Section8 = () => {
  // GSAP 애니메이션을 적용할 요소들을 참조하기 위한 useRef
  const viewportImageRef = useRef(null);
  const firebaseLogoRef = useRef(null);
  const openAILogoRef = useRef(null);

  useEffect(() => {
    // "뷰포트 문제(css)" 이미지 애니메이션 설정 (확대 및 축소)
    gsap.to(viewportImageRef.current, {
      scale: 1.1, // 10% 확대
      duration: 1.5, // 애니메이션 지속 시간 (초)
      ease: 'power1.inOut', // 애니메이션 타이밍 함수
      repeat: -1, // 무한 반복
      yoyo: true, // 애니메이션을 반복할 때 반대로 재생
    });

    // Firebase 로고 애니메이션 설정 (30도 회전)
    gsap.to(firebaseLogoRef.current, {
      rotation: 30, // 30도 회전
      duration: 2, // 애니메이션 지속 시간 (초)
      ease: 'power1.inOut', // 애니메이션 타이밍 함수
      repeat: -1, // 무한 반복
      yoyo: true, // 애니메이션을 반복할 때 반대로 재생
    });

    // OpenAI 로고에 흔들림(Shaking) 애니메이션 설정
    gsap.to(openAILogoRef.current, {
      x: 10, // x축으로 10px 이동
      duration: 0.5, // 애니메이션 지속 시간 (초)
      ease: 'power1.inOut', // 애니메이션 타이밍 함수
      repeat: -1, // 무한 반복
      yoyo: true, // 애니메이션을 반복할 때 반대로 재생
    });
  }, []);

  return (
    <div className={styles.개발과정Section8}>
      {/* "뷰포트 문제(css)" 섹션 */}
      <div className={styles.개발과정Container}>
        <h2>뷰포트 문제(css)</h2>
        <div className={styles.내용Wrapper}>
          <img
            src={kioskIssueImage}
            alt="키오스크 문제해결"
            className={styles.문제이미지}
            ref={viewportImageRef} // GSAP 애니메이션을 적용할 요소에 ref 할당
          />
          <p>
            반응형 디자인을 만들 때 뷰포트는 항상 어려웠습니다. <br />
            포기하지 않고 유튜브, 구글링으로 해당 문제 원인을 파악하고 <br />
            rootmargin 값을 수정하여 문제를 해결했습니다.<br />
            css, 레이아웃 관련 문제 해결하는데 향후 많은 도움을 받았습니다.
          </p>
        </div>
      </div>

      {/* "Firebase 연결문제" 섹션 */}
      <div className={styles.개발과정Container}>
        <h2>Firebase 연결문제</h2>
        <div className={styles.내용Wrapper}>
          <img
            src={firebaseLogo}
            alt="Firebase 로고"
            className={styles.문제이미지}
            ref={firebaseLogoRef} // GSAP 애니메이션을 적용할 요소에 ref 할당
          />
          <p>
            Firebase의 경우 독학을 해야 하는 상황이라서 어려움이 많았습니다. <br />
            다행히 공식문서가 잘 되어 있어서 쉽게 따라갈 수 있었고 <br />
            실시간으로 연결하는 아키텍처를 구상할 수 있었습니다.
          </p>
        </div>
      </div>

      {/* "GPT 환각문제" 섹션 */}
      <div className={styles.개발과정Container}>
        <h2>GPT 환각문제</h2>
        <div className={styles.내용Wrapper}>
          <img
            src={openAILogo}
            alt="OpenAI 로고"
            className={styles.문제이미지}
            ref={openAILogoRef} // GSAP 애니메이션을 적용할 요소에 ref 할당
          />
          <p>
            LLM 모델을 활용하여 코드 작성하면서 항상 환각효과가 문제였습니다. <br />
            '피그잼', '노션', '프롬프트 기법 향상'으로 환각효과를 해결했습니다. <br />
            이후 어떤 라이브러리, 프레임워크라도 자신 있게 접근할 수 있게 되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section8;
