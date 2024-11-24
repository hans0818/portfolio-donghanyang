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

  // 엣지 데이터 메모이제이션 (양방향 엣지를 단방향 엣지 두 개로 분리)
  const edges = useMemo(() => [
    { id: 1, from: 1, to: 3, label: "pos 데이터 제작" }, // 단방향
    { id: 2, from: 2, to: 3, label: "주문 데이터 전달" }, // Firebase → POS
    { id: 8, from: 3, to: 2, label: "식당 데이터 전달" }, // POS → Firebase
    { id: 3, from: 4, to: 6, label: "URL 데이터로 키오스크 렌더링" },
    { id: 4, from: 6, to: 5, label: "실행" },
    { id: 6, from: 3, to: 4, label: "키오스크 URL 전달" },
    { id: 7, from: 5, to: 2, label: "Firebase로의 데이터 전달" }, // KIOSK → Firebase
  ], []);

  // SVG 마커 정의 메모이제이션
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
        <polygon points="0 0, 10 3.5, 0 7" fill="#808080" />
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
    2: ['bottom'], // '주문 데이터 전달' - bottom
    8: ['top'], // '식당 데이터 전달' - top
    3: ['top'], // 'URL 데이터로 키오스크 렌더링' - top
    4: ['right'], // '실행' - right
    6: ['left'], // '키오스크 URL 전달' - left
    7: ['top'], // 'Firebase로의 데이터 전달' - top
  }), []);

  // 라벨 렌더링 함수 (중앙 정렬)
  const renderLabel = (edge, line, index) => {
    const positionClass = labelPositions[edge.id] ? labelPositions[edge.id][index] || 'current' : 'current';

    // 기본 위치 계산 (중앙)
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
      case 'bottom':
        y += 60; // 아래로 이동
        break;
      case 'current':
      default:
        break; // 중앙에 위치
    }

    // 텍스트 앵커 설정
    let textAnchor = 'middle';
    if (positionClass === 'left') textAnchor = 'end';
    if (positionClass === 'right') textAnchor = 'start';

    // 인라인 스타일 정의
    const labelStyle = {
      fontSize: '1.7rem',
      fontWeight: 'bold',
      fill: '#c4c4c4',
      pointerEvents: 'none',
      dominantBaseline: 'middle',
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
    // 밝은 파스텔 톤 색상 정의
    const pastelPink = "#FFB6C1"; // 밝은 파스텔 핑크
    const pastelBlue = "#89CFF0"; // 밝은 파스텔 블루

    return edges.map((edge) => {
      const fromNode = getNodeById(edge.from);
      const toNode = getNodeById(edge.to);

      if (!fromNode || !toNode) return null;

      const edgeId = `edge-${edge.id}`;
      const isBlueEdge = [2, 7].includes(edge.id); // Edge 2 (Firebase→POS), Edge 7 (KIOSK→Firebase) are blue
      const arrowColor = isBlueEdge ? pastelBlue : pastelPink; // 파랑 또는 핑크 색상

      let pathD = `M ${fromNode.x},${fromNode.y} L ${toNode.x},${toNode.y}`;
      if (edge.id === 8) {
        // Offset Edge 8 to prevent overlap with Edge 2
        const { x: ox, y: oy } = calculateOffset(fromNode, toNode, 20); // 20px 오프셋
        pathD = `M ${fromNode.x + ox},${fromNode.y + oy} L ${toNode.x + ox},${toNode.y + oy}`;
      }

      // Determine the number of arrows for this edge
      const numArrows = edge.id === 3 ? 8 : 5; // Edge id 3 (NFC → 휴대폰) has 8 arrows

      return (
        <g key={edge.id}>
          {/* Path */}
          <path
            id={edgeId}
            d={pathD}
            stroke="#808080"
            strokeWidth="10"
            fill="none"
            markerEnd="url(#arrowhead)"
          />

          {/* Moving Arrows */}
          {[...Array(numArrows)].map((_, i) => (
            <polygon
              key={`forward-${edge.id}-arrow-${i}`}
              className="moving-arrow"
              data-path={edgeId}
              points="0 0, 20 10, 0 20"
              fill={arrowColor}
              pointerEvents="none"
            />
          ))}

          {/* 라벨 추가 */}
          {edge.label.split("\n").map((line, index) => renderLabel(edge, line, index))}
        </g>
      );
    });
  };

  // GSAP 애니메이션
  useEffect(() => {
    const speed = 400; // 기본 속도 (픽셀/초)

    edges.forEach(edge => {
      const edgeId = `edge-${edge.id}`;
      const path = document.getElementById(edgeId);

      if (path) {
        const arrows = svgRef.current.querySelectorAll(`.moving-arrow[data-path="${edgeId}"]`);
        const pathLength = path.getTotalLength();
        const numArrows = edge.id === 3 ? 8 : 5; // Edge id 3 (NFC → 휴대폰) has 8 arrows
        const duration = pathLength / speed;

        arrows.forEach((arrow, index) => {
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
              start,
              end,
            },
          });
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
