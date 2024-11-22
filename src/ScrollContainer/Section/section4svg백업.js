import React, { useState, useRef, useEffect } from "react";
import styles from "./Section4.module.css";

const Section4 = () => {
  const svgRef = useRef(null);

  const [nodes] = useState([
    {
      id: 1,
      label: "음식점",
      x: -300,
      y: 100,
      width: 150,
      height: 100,
      color: "#FFC0CB",
      fontSize: 30,
      borderRadius: 20,
    },
    {
      id: 2,
      label: "Firebase",
      x: 0,
      y: 0,
      width: 250,
      height: 250,
      color: "#98FB98",
      fontSize: 45,
      borderRadius: 20,
    },
    {
      id: 3,
      label: "POS",
      x: -300,
      y: 0,
      width: 150,
      height: 100,
      color: "#D8BFD8",
      fontSize: 30,
      borderRadius: 20,
    },
    {
      id: 4,
      label: "NFC",
      x: -300,
      y: -200,
      width: 150,
      height: 100,
      color: "#FFC0CB",
      fontSize: 30,
      borderRadius: 20,
    },
    {
      id: 5,
      label: "KIOSK",
      x: 300,
      y: 0,
      width: 150,
      height: 100,
      color: "#D8BFD8",
      fontSize: 30,
      borderRadius: 20,
    },
    {
      id: 6,
      label: "휴대폰",
      x: 300,
      y: -200,
      width: 150,
      height: 100,
      color: "#FFC0CB",
      fontSize: 30,
      borderRadius: 20,
    },
  ]);

  const [edges] = useState([
    {
      id: 1,
      from: 1,
      to: 3,
      label: "pos 데이터 제작",
      bidirectional: false,
    },
    {
      id: 2,
      from: 2,
      to: 3,
      label: "pos 데이터 전달\n주문 데이터 전달",
      bidirectional: true,
    },
    {
      id: 3,
      from: 4,
      to: 6,
      label: "테이블 데이터 전달",
      bidirectional: false,
    },
    {
      id: 4,
      from: 6,
      to: 5,
      label: "실행",
      bidirectional: false,
    },
    {
      id: 5,
      from: 2,
      to: 5,
      label: "주문 데이터 전달\n데이터로 키오스크 렌더링",
      bidirectional: true,
    },
    {
      id: 6,
      from: 3,
      to: 4,
      label: "키오스크 URL 전달",
      bidirectional: false,
    },
  ]);

  // <defs>를 React가 관리하지 않도록 DOM 조작
   useEffect(() => {
    const svg = svgRef.current;
    if (svg && !svg.querySelector("defs")) {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  
      // <marker> 정의 추가
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      marker.setAttribute("id", "arrowhead");
      marker.setAttribute("markerWidth", "10");
      marker.setAttribute("markerHeight", "7");
      marker.setAttribute("refX", "10");
      marker.setAttribute("refY", "3.5");
      marker.setAttribute("orient", "auto");
  
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
      polygon.setAttribute("fill", "#87CEFA");
  
      marker.appendChild(polygon);
      defs.appendChild(marker);
  
      svg.insertBefore(defs, svg.firstChild); // <svg>의 첫 번째 자식으로 추가
    }
  }, []);

  const getNodeById = (id) => nodes.find((node) => node.id === id);

  const renderEdges = () => {
    return edges.map((edge) => {
      const fromNode = getNodeById(edge.from);
      const toNode = getNodeById(edge.to);
      if (!fromNode || !toNode) return null;

      const arrowColor = edge.bidirectional ? "#87CEFA" : "#FFB6C1";
      const reverseArrowColor = edge.bidirectional ? "#FFDAB9" : null;

      return (
        <g key={`edge-${edge.id}`}>
          <line
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={arrowColor}
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
          />
          {edge.bidirectional && (
            <line
              x1={toNode.x}
              y1={toNode.y}
              x2={fromNode.x}
              y2={fromNode.y}
              stroke={reverseArrowColor}
              strokeWidth={2}
              markerEnd="url(#reverseArrowhead)"
            />
          )}
          <text
            x={(fromNode.x + toNode.x) / 2}
            y={(fromNode.y + toNode.y) / 2 - 10}
            fill="#DEDEDE"
            fontSize="18"
            textAnchor="middle"
          >
            {edge.label.split("\n").map((line, index) => (
              <tspan
                key={`edge-${edge.id}-line-${index}`}
                x={(fromNode.x + toNode.x) / 2}
                dy={index === 0 ? 0 : "1.2em"}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    });
  };

  return (
    <div className={styles.section4}>
      <svg
        ref={svgRef}
        className={styles.diagramContainer}
        viewBox="-500 -500 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderEdges()}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            style={{ cursor: "default" }}
          >
            <rect
              x={-node.width / 2}
              y={-node.height / 2}
              width={node.width}
              height={node.height}
              rx={node.borderRadius}
              ry={node.borderRadius}
              fill={node.color}
              stroke="#333333"
              strokeWidth={1}
              style={{
                transition: "none",
              }}
            />
            <text
              x={0}
              y={0}
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#333333"
              fontSize={node.fontSize}
              fontWeight="bold"
              fontFamily="'Pretendard', sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Section4;
