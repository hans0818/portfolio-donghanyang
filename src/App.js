import React from 'react';
import styles from './App.module.css';
import Section1 from './ScrollContainer/Section/Section1';
import Section2 from './ScrollContainer/Section/Section2';
import Section3 from './ScrollContainer/Section/Section3';
import Section3One from './ScrollContainer/Section/Section3One';
import Section4 from './ScrollContainer/Section/Section4';
import Section5 from './ScrollContainer/Section/Section5';
import Section6 from './ScrollContainer/Section/Section6';
import Section7 from './ScrollContainer/Section/Section7';
import Section8 from './ScrollContainer/Section/Section8';
import Section9 from './ScrollContainer/Section/Section9';
import Section10 from './ScrollContainer/Section/Section10';
function App() {
  return (
    <div className={styles.App}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section3One />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
      <Section10 />
    </div>
  );
}

export default App;
