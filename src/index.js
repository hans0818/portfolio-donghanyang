import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css'; // 전역 스타일 파일로 수정
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 앱 성능 측정을 원한다면 reportWebVitals에 함수를 전달하세요 (예: reportWebVitals(console.log))
reportWebVitals();
