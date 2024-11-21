import React from 'react';
import styles from './Section9.module.css';

const Section8 = () => {
  return (
    <div className={styles.section8}>
      <div className={styles.outcomeContainer}>
        <h2>현재까지 성과</h2>
        <p>Firebase를 통해서 실시간 렌더링으로 UI를 완성.</p>
      </div>
      <div className={styles.futurePlanContainer}>
        <h2>확장계획</h2>
        <p>React 코드 관리를 위해 Redux, Context API 활용, MariaDB 매출 관리, 직원 관리 시스템 제작, 페이지 렌더링 최적화.</p>
      </div>
      <div className={styles.reflectionContainer}>
        <p>
          이번 프로젝트를 진행하면서 느낀 점은 ‘생각하고 실천하면 다 해결되었다’는 사실입니다.<br /> 
          ‘과연 이게 될까?’라는 의문보다는 ‘왜’라는 질문이 문제 해결에 큰 도움이 되었습니다.<br /> 
          그리고 문제점을 해결하고 기능을 하나하나 추가할 때마다 코딩의 가능성과 무한한 잠재력을 다시 한번 깨달을 수 있었습니다.
        </p>
      </div>
    </div>
  );
};

export default Section8;
