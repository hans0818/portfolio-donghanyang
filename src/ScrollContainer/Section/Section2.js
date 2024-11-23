import React, { useEffect, useRef } from 'react';
import styles from './Section2.module.css';
import profileImage from '../../assets/images/donghanImage.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section2Content = React.forwardRef(({ isIntroduction }, ref) => (
  <>
    {isIntroduction ? (
      <div className={styles.selfIntroductionContainer} ref={ref}>
        <p>
          <span className={styles.highlight}>목표</span>가 보이면 어떻게든 도달하고<br />
          문제가 보이면 <span className={styles.highlight}>열정</span>이 불타고<br />
          <span className={styles.highlight}>기회</span>가 보이면 놓치지 않으며<br />
          배움이 보이면 <span className={styles.highlight}>깊이</span> 파고들고<br />
          <span className={styles.highlight}>성과</span>가 보이면 함께 나누고<br />
          더 나은 길이 보이면 바로 <span className={styles.highlight}>도전</span>합니다.<br /><br />
          항상 이러한 태도로 살아왔으며,<br />
          끊임없는 성장과 팀워크를 통해<br />
          <span className={styles.highlight}>가치</span>를 더하는 개발자가 되고자 합니다.
        </p>
      </div>
    ) : (
      <div className={styles.careerContainer} ref={ref}>
        <p>1991.08.18</p>
        <p>Full stack Developer</p>
        <p>donghany0818@naver.com</p>
        <p>부경대학교 소방공학과(중퇴)</p>
        <hr className={styles.divider} />
        <p>2018.02 ~ 2019.06 동양생명 영업팀장</p>
        <p>2019.08 ~ 2020.08 피플라이프 팀장</p>
        <p>2020.09 ~ 2024.10 굿리치 RP</p>
      </div>
    )}
  </>
));

const Section2 = () => {
  const containerRef = useRef(null);
  const careerRef = useRef(null);
  const introRef = useRef(null);
  const profileImageRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !careerRef.current || !introRef.current || !profileImageRef.current) {
      console.error('필요한 참조가 초기화되지 않았습니다.');
      return;
    }

    // 초기 상태 설정
    gsap.set(careerRef.current, { opacity: 1 });
    gsap.set(introRef.current, { opacity: 0 });
    gsap.set(profileImageRef.current, { filter: 'grayscale(0%)' });
    gsap.set(containerRef.current, {
      background: 'black',
    });

    // GSAP 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    // 경력 섹션 사라짐
    tl.to(careerRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // 자기소개 섹션 나타남
    tl.to(introRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5');

    // 프로필 이미지 흑백으로 변경
    tl.to(profileImageRef.current, {
      filter: 'grayscale(100%)',
      duration: 1,
      ease: 'power3.out',
    }, '-=1');

    // 배경색 변경
    tl.to(containerRef.current, {
      background: 'linear-gradient(to bottom, #000003 20%, #202020 50%, #000003 80%)',
      duration: 1,
      ease: 'power3.out',
    }, '-=1');

    // 클린업
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.section2}>
        <div className={styles.profileContainer}>
          <img
            src={profileImage}
            alt="양동한 프로필"
            className={styles.profileImage}
            ref={profileImageRef}
          />
        </div>
        <div className={styles.experienceContainer}>
          <div className={styles.nameContainer}>
            <span className={styles.highlightName}>양동한</span>
            <span className={styles.smallText}> 은</span>
          </div>
          <Section2Content isIntroduction={false} ref={careerRef} />
          <Section2Content isIntroduction={true} ref={introRef} />
        </div>
      </div>
    </div>
  );
};

export default Section2;
