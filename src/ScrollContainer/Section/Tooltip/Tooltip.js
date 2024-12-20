// src/components/Tooltip/Tooltip.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Tooltip.module.css';

const Tooltip = ({ visible, x, y, title, text }) => {
  return ReactDOM.createPortal(
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ''}`}
      style={{ left: x, top: y }}
    >
      {title && <h3 className={styles.tooltipTitle}>{title}</h3>}
      <p className={styles.tooltipText}>{text}</p>
    </div>,
    document.body
  );
};

export default Tooltip;
