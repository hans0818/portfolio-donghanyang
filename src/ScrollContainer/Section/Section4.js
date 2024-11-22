import React, { useMemo } from "react";
import styles from "./Section4.module.css";

const Section4 = () => {
  const nodes = [
    { id: 1, label: "음식점", x: -550, y: 350, width: 200, height: 200, color: "#00a06a", fontSize: 30 },
    { id: 2, label: "Firebase", x: 0, y: 0, width: 250, height: 250, color: "#e74800", fontSize: 45 },
    { id: 3, label: "POS", x: -550, y: 0, width: 200, height: 200, color: "#4f75ff", fontSize: 30 },
    { id: 4, label: "NFC", x: -550, y: -350, width: 200, height: 200, color: "#00a06a", fontSize: 30 },
    { id: 5, label: "KIOSK", x: 550, y: 0, width: 200, height: 200, color: "#4f75ff", fontSize: 30 },
    { id: 6, label: "휴대폰", x: 550, y: -350, width: 200, height: 200, color: "#00a06a", fontSize: 30,},
  ];

  const edges = [
    { id: 1, from: 1, to: 3, label: "pos 데이터 제작", bidirectional: false },
    { id: 2, from: 2, to: 3, label: "pos 데이터 전달\n주문 데이터 전달", bidirectional: true },
    { id: 3, from: 4, to: 6, label: "테이블 데이터 전달", bidirectional: false },
    { id: 4, from: 6, to: 5, label: "실행", bidirectional: false },
    { id: 5, from: 2, to: 5, label: "주문 데이터 전달\n데이터로 키오스크 렌더링", bidirectional: true },
    { id: 6, from: 3, to: 4, label: "키오스크 URL 전달", bidirectional: false },
  ];

  const defs = useMemo(() => (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#87CEFA" />
      </marker>
      <marker
        id="reverseArrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="10"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#FFDAB9" />
      </marker>
    </defs>
  ), []);

  const getNodeById = (id) => nodes.find((node) => node.id === id);

  const renderEdges = () => {
    return edges.map((edge) => {
      const fromNode = getNodeById(edge.from);
      const toNode = getNodeById(edge.to);

      if (!fromNode || !toNode) return null;

      const arrowColor = edge.bidirectional ? "#87CEFA" : "#FFB6C1";

      return (
        <g key={edge.id}>
          <line
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={arrowColor}
            strokeWidth={10}
            markerEnd="url(#arrowhead)"
          />
        </g>
      );
    });
  };

  return (
    <div className={styles.section4}>
      <div className={styles.diagramContainer}>
        <svg
          viewBox="-500 -500 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          {defs}
          {renderEdges()}
          {nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <rect
                x={-node.width / 2}
                y={-node.height / 2}
                width={node.width}
                height={node.height}
                rx={20}
                ry={20}
                fill={node.color}
                stroke="none"
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontSize={node.fontSize}
                className={styles.textStyle}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Section4;
