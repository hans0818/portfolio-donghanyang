import React from 'react';
import styles from './App.module.css';
import Section1 from './ScrollContainer/Section/Section1';
import Section2 from './ScrollContainer/Section/Section2';
import Section3 from './ScrollContainer/Section/Section3';
import Section3One from './ScrollContainer/Section/Section3One';
import Section4 from './ScrollContainer/Section/Section4';
import Section4Video from './ScrollContainer/Section/Section4Video';
import Section4VideoNext from './ScrollContainer/Section/Section4VideoNext';
import Section5 from './ScrollContainer/Section/Section5';
import Section5Video from './ScrollContainer/Section/Section5Video';
import Section6 from './ScrollContainer/Section/Section6';
import Section6Video from './ScrollContainer/Section/Section6Video';
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
      <Section4Video />
      <Section4VideoNext />
      <Section5 />
      <Section5Video />
      <Section6 />
      <Section6Video />
      <Section8 />
      <Section9 />
      <Section10 />
    </div>
  );
}

export default App;
