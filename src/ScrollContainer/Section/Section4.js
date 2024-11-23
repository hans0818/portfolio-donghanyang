import React, { useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "./Section4.module.css";

// GSAP 플러그인 등록
gsap.registerPlugin(MotionPathPlugin);

const Section4 = () => {
  const svgRef = useRef(null);

  // 노드 데이터 메모이제이션
  const nodes = useMemo(() => [
    { id: 1, label: "음식점", x: -550, y: 350, width: 200, height: 200, color: "#00a06a", fontSize: 30 },
    { id: 2, label: "Firebase", x: 0, y: 0, width: 250, height: 250, color: "#e74800", fontSize: 45 },
    { id: 3, label: "POS", x: -550, y: 0, width: 200, height: 200, color: "#4f75ff", fontSize: 30 },
    { id: 4, label: "NFC", x: -550, y: -350, width: 200, height: 200, color: "#00a06a", fontSize: 30 },
    { id: 5, label: "KIOSK", x: 550, y: 0, width: 200, height: 200, color: "#4f75ff", fontSize: 30 },
    { id: 6, label: "휴대폰", x: 550, y: -350, width: 200, height: 200, color: "#00a06a", fontSize: 30 },
  ], []);

  // 엣지 데이터 메모이제이션
  const edges = useMemo(() => [
    { id: 1, from: 1, to: 3, label: "pos 데이터 제작", bidirectional: false },
    { id: 2, from: 2, to: 3, label: "pos 데이터 전달\n주문 데이터 전달", bidirectional: true },
    { id: 3, from: 4, to: 6, label: "테이블 데이터 전달", bidirectional: false },
    { id: 4, from: 6, to: 5, label: "실행", bidirectional: false },
    { id: 5, from: 2, to: 5, label: "주문 데이터 전달\n데이터로 키오스크 렌더링", bidirectional: true },
    { id: 6, from: 3, to: 4, label: "키오스크 URL 전달", bidirectional: false },
  ], []);

  // SVG 마커 정의 메모이제이션
  const defs = useMemo(() => (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="5"
        markerHeight="3.5"
        refX="5"
        refY="1.75"
        orient="auto"
      >
        <polygon points="0 0, 5 1.75, 0 3.5" fill="#808080" />
      </marker>
      <marker
        id="reverseArrowhead"
        markerWidth="5"
        markerHeight="3.5"
        refX="5"
        refY="1.75"
        orient="auto"
      >
        <polygon points="0 0, 5 1.75, 0 3.5" fill="#808080" />
      </marker>
    </defs>
  ), []);

  // 노드 ID로 노드 찾기 함수
  const getNodeById = (id) => nodes.find((node) => node.id === id);

  // 선의 방향에 수직인 오프셋 계산 함수
  const calculateOffset = (from, to, offset) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: 0, y: 0 };
    const ux = -dy / length;
    const uy = dx / length;
    return { x: ux * offset, y: uy * offset };
  };

  // 라벨 위치 매핑
  const labelPositions = useMemo(() => ({
    1: ['left'], // 'pos 데이터 제작' - left
    2: ['top', 'current'], // 'pos 데이터 전달' - top, '주문 데이터 전달' - current
    3: ['current'], // '테이블 데이터 전달' - current
    4: ['right'], // '실행' - right
    5: ['current', 'top'], // '주문 데이터 전달' - current, '데이터로 키오스크 렌더링' - top
    6: ['left'], // '키오스크 URL 전달' - left
  }), []);

  // 라벨 렌더링 함수 (인라인 스타일 적용)
  const renderLabel = (edge, line, index) => {
    const positionClass = labelPositions[edge.id] ? labelPositions[edge.id][index] || 'current' : 'current';

    // 기본 위치 계산
    let x = (getNodeById(edge.from).x + getNodeById(edge.to).x) / 2;
    let y = (getNodeById(edge.from).y + getNodeById(edge.to).y) / 2;

    // 라벨 위치에 따른 오프셋 조정
    switch (positionClass) {
      case 'left':
        x -= 40; // 왼쪽으로 이동
        break;
      case 'right':
        x += 40; // 오른쪽으로 이동
        break;
      case 'top':
        y -= 40; // 위로 이동
        break;
      case 'current':
      default:
        y += 40; // 아래로 이동
        break;
    }

    // 텍스트 앵커 설정
    let textAnchor = 'middle';
    if (positionClass === 'left') textAnchor = 'end';
    if (positionClass === 'right') textAnchor = 'start';

    // 인라인 스타일 정의 (하이라이트 제거)
    const labelStyle = {
      fontSize: '1.7rem',
      fontWeight: 'bold', // 모든 라벨을 굵게 설정
      fill: '#c4c4c4', // 동일한 색상
      pointerEvents: 'none',
      dominantBaseline: positionClass === 'top' ? 'hanging' :
                        positionClass === 'current' ? 'baseline' : 'auto',
      textAnchor: textAnchor,
    };

    return (
      <text
        key={index}
        style={labelStyle}
        x={x}
        y={y}
      >
        {line}
      </text>
    );
  };

  // 엣지 렌더링 함수
  const renderEdges = () => {
    return edges.map((edge) => {
      const fromNode = getNodeById(edge.from);
      const toNode = getNodeById(edge.to);

      if (!fromNode || !toNode) return null;

      const lineColor = "#808080"; // 선 색상
      const edgeId = `edge-${edge.id}`; // 고유 ID

      const isNfcToPhone = edge.from === 4 && edge.to === 6; // NFC → 휴대폰 조건
      const isBidirectional = edge.bidirectional;

      // 화살표 개수를 다섯 개로 설정
      const numArrowsForward = 5; // Forward 화살표 개수
      const numArrowsReverse = isBidirectional ? 5 : 0; // Reverse 화살표 개수 (양방향일 때만)

      // 애니메이션 화살표 색상 정의
      const forwardArrowColor = isNfcToPhone ? "#BAE1FF" : "#FFB3BA";
      const reverseArrowColor = "#BAE1FF";

      if (isBidirectional) {
        const offset = 80;
        const { x: ox, y: oy } = calculateOffset(fromNode, toNode, offset);
        const reverseEdgeId = `reverse-${edgeId}`;

        return (
          <g key={edge.id}>
            {/* Forward Path */}
            <path
              id={edgeId}
              d={`M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`}
              stroke={lineColor}
              strokeWidth="10"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Reverse Path */}
            <path
              id={reverseEdgeId}
              d={`M ${toNode.x + ox},${toNode.y + oy} L ${fromNode.x + ox},${fromNode.y + oy}`}
              stroke={lineColor}
              strokeWidth="10"
              fill="none"
              markerEnd="url(#reverseArrowhead)"
            />

            {/* Forward Arrows */}
            {[...Array(numArrowsForward)].map((_, i) => (
              <polygon
                key={`forward-${edge.id}-arrow-${i}`}
                className="moving-arrow"
                data-path={edgeId}
                points="0 0, 20 10, 0 20"
                fill={forwardArrowColor}
                pointerEvents="none"
              />
            ))}

            {/* Reverse Arrows */}
            {[...Array(numArrowsReverse)].map((_, i) => (
              <polygon
                key={`reverse-${edge.id}-arrow-${i}`}
                className="moving-arrow"
                data-path={reverseEdgeId}
                points="0 0, 20 10, 0 20"
                fill={reverseArrowColor}
                pointerEvents="none"
              />
            ))}

            {/* 라벨 추가 */}
            {edge.label.split("\n").map((line, index) => renderLabel(edge, line, index))}
          </g>
        );
      } else {
        return (
          <g key={edge.id}>
            {/* 단방향 Path */}
            <path
              id={edgeId}
              d={`M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`}
              stroke={lineColor}
              strokeWidth="10"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            {/* Forward Arrows */}
            {[...Array(numArrowsForward)].map((_, i) => (
              <polygon
                key={`forward-${edge.id}-arrow-${i}`}
                className="moving-arrow"
                data-path={edgeId}
                points="0 0, 20 10, 0 20"
                fill={forwardArrowColor}
                pointerEvents="none"
              />
            ))}

            {/* 라벨 추가 */}
            {edge.label.split("\n").map((line, index) => renderLabel(edge, line, index))}
          </g>
        );
      }
    });
  };

  useEffect(() => {
    const speed = 400; // 기본 속도 (픽셀/초)
    const fastSpeed = 600; // NFC → 휴대폰 속도 (픽셀/초)
    const numArrows = 5; // 화살표 개수

    const arrows = svgRef.current.querySelectorAll(".moving-arrow");

    arrows.forEach((arrow, index) => {
      const pathId = arrow.getAttribute("data-path");
      const path = document.getElementById(pathId);
      if (path) {
        const pathLength = path.getTotalLength();
        const isFast = pathId === "edge-3"; // edge-3은 NFC → 휴대폰

        const currentSpeed = isFast ? fastSpeed : speed;
        const duration = pathLength / currentSpeed;

        // 화살표 간격을 경로 길이를 화살표 개수로 나눈 값으로 설정
        const start = index / numArrows;
        const end = 1 + (index / numArrows);

        gsap.to(arrow, {
          duration,
          repeat: -1,
          ease: "linear",
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: start,
            end: end,
          },
        });
      }
    });
  }, [edges]);

  return (
    <div className={styles.section4}>
      <div className={styles.diagramContainer}>
        <svg
          ref={svgRef}
          viewBox="-600 -600 1200 1200"
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
                fill="#fff"
                fontWeight="900"
                pointerEvents="none"
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
