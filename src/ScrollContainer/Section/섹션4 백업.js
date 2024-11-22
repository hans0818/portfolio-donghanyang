import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import styles from "./Section4.module.css";
import firebaseImage from '../../assets/icons/데이터.png';

const Section4 = () => {
  const diagramContainer = useRef(null);

  useEffect(() => {
    const container = diagramContainer.current;
    let network = null;
    let animationFrameId = null;
    let animate = null; // 상위 스코프에 'animate' 변수 선언

    // 노드 데이터 설정
    const nodes = new DataSet([
      {
        id: 1,
        label: "음식점",
        shape: "box",
        color: "#FFC0CB", // 핑크색
        x: -400,
        y: -300,
        font: {
          size: 30,
          face: "sans-serif",
          color: "#333333", // 진한 글자 색상
          mod: "bold", // 글자 굵게
        },
        widthConstraint: { minimum: 150 },
        heightConstraint: { minimum: 100 },
        shapeProperties: {
          borderRadius: 20,
        },
      },
      {
        id: 3,
        label: "POS",
        shape: "box",
        color: "#D8BFD8", // 연보라색
        x: 0,
        y: -300,
        font: {
          size: 30,
          face: "sans-serif",
          color: "#333333",
          mod: "bold",
        },
        widthConstraint: { minimum: 150 },
        heightConstraint: { minimum: 100 },
        shapeProperties: {
          borderRadius: 20,
        },
      },
      {
        id: 2,
        label: "",
        shape: "image",
        image: firebaseImage,
        size: 100,
        x: 0,
        y: 0,
        font: {
          size: 45,
          face: "sans-serif",
          color: "#333333",
          mod: "bold",
        },
        borderWidth: 3,
        borderWidthSelected: 5,
        brokenImage: undefined,
        chosen: true,
        widthConstraint: { minimum: 250 },
        heightConstraint: { minimum: 150 },
        shapeProperties: {
          useBorderWithImage: true,
          borderRadius: 30,
          interpolation: true,
        },
      },
      {
        id: 7,
        label: "KIOSK",
        shape: "box",
        color: "#D8BFD8", // 연보라색
        x: 0,
        y: 300,
        font: {
          size: 30,
          face: "sans-serif",
          color: "#333333",
          mod: "bold",
        },
        widthConstraint: { minimum: 150 },
        heightConstraint: { minimum: 100 },
        shapeProperties: {
          borderRadius: 20,
        },
      },
      {
        id: 4,
        label: "NFC",
        shape: "box",
        color: "#FFC0CB", // 핑크색
        x: 400,
        y: -300,
        font: {
          size: 30,
          face: "sans-serif",
          color: "#333333",
          mod: "bold",
        },
        widthConstraint: { minimum: 150 },
        heightConstraint: { minimum: 100 },
        shapeProperties: {
          borderRadius: 20,
        },
      },
      {
        id: 8,
        label: "휴대폰",
        shape: "box",
        color: "#FFC0CB", // 핑크색
        x: 400,
        y: 300,
        font: {
          size: 30,
          face: "sans-serif",
          color: "#333333",
          mod: "bold",
        },
        widthConstraint: { minimum: 150 },
        heightConstraint: { minimum: 100 },
        shapeProperties: {
          borderRadius: 20,
        },
      },
    ]);

    // 엣지 데이터 설정
    const edges = new DataSet([
      {
        id: 1,
        from: 1,
        to: 3,
        arrows: "to",
        label: "pos 데이터 제작",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
      {
        id: 2,
        from: 2,
        to: 3,
        arrows: "to, from",
        label: "pos 데이터 전달\n주문 데이터 전달",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
      {
        id: 3,
        from: 4,
        to: 8,
        arrows: "to",
        label: "테이블 데이터 전달",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
      {
        id: 4,
        from: 8,
        to: 7,
        arrows: "to",
        label: "실행",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
      {
        id: 5,
        from: 2,
        to: 7,
        arrows: "to, from",
        label: "주문 데이터 전달\n데이터로 키오스크 렌더링",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
      {
        id: 6,
        from: 3,
        to: 4,
        arrows: "to",
        label: "키오스크 URL 전달",
        font: { color: "#DEDEDE", size: 18, bold: true, strokeWidth: 0 },
      },
    ]);
    


    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      physics: {
        enabled: false,
      },
      layout: {
        randomSeed: 42,
      },
      interaction: {
        dragNodes: true, // 노드 드래그 허용
        dragView: false,
        zoomView: false,
        selectable: false,
        hover: true, // 마우스 호버 기능 활성화
      },
      manipulation: {
        enabled: false,
      },
      edges: {
        width: 6,
        smooth: {
          type: "cubicBezier",
          forceDirection: "horizontal",
          roundness: 0.4,
        },
        color: {
          color: "#696969", // 짙은 회색
          highlight: "#696969",
          hover: "#696969",
          inherit: false,
        },
        arrows: {
          to: { enabled: true, scaleFactor: 2 },
          from: { enabled: true, scaleFactor: 2 },
        },
      },
    };

    const initializeNetwork = () => {
      network = new Network(container, data, options);

      // 노드의 원래 위치와 스타일 저장
      const originalPositions = {};
      const originalStyles = {};
      nodes.forEach((node) => {
        originalPositions[node.id] = { x: node.x, y: node.y };
        originalStyles[node.id] = {
          color: node.color,
          font: { ...node.font },
          size: node.size || 25,
        };
      });

      // 애니메이션 관련 변수 설정
      const edgeIds = edges.getIds();
      let animationProgress = {};
      let reverseAnimationProgress = {};

      // 양방향 엣지 식별
      const bidirectionalEdges = [2, 5]; // 양방향 엣지의 ID 목록

      edgeIds.forEach((id) => {
        animationProgress[id] = 0;
        if (bidirectionalEdges.includes(id)) {
          reverseAnimationProgress[id] = 1; // 반대 방향 진행 상태 초기화
        }
      });

      // 애니메이션 진행 상태 업데이트 함수
      const updateAnimation = () => {
        if (!network) return;

        edgeIds.forEach((id) => {
          animationProgress[id] += 0.005; // 속도를 느리게 하기 위해 증가값을 줄임
          if (animationProgress[id] > 1) {
            animationProgress[id] = 0;
          }

          if (bidirectionalEdges.includes(id)) {
            reverseAnimationProgress[id] -= 0.005;
            if (reverseAnimationProgress[id] < 0) {
              reverseAnimationProgress[id] = 1;
            }
          }
        });

        network.redraw();
        animationFrameId = requestAnimationFrame(updateAnimation);
      };

      // 'animate' 함수 정의 및 상위 스코프에 할당
      animate = (ctx) => {
        ctx.save();
        // 애니메이션 화살표 그리기
        edgeIds.forEach((id) => {
          const edge = network.body.edges[id];
          if (edge) {
            const progress = animationProgress[id];
            const point1 = edge.edgeType.getPoint(progress);
            const point2 = edge.edgeType.getPoint(progress + 0.01);

            // 움직이는 화살표 그리기 (파스텔 톤 색상 적용)
            drawArrow(
              ctx,
              point1.x,
              point1.y,
              point2.x,
              point2.y,
              bidirectionalEdges.includes(id) ? "#FFB6C1" : "#87CEFA", // 파스텔톤 색상
              6, // 선 두께
              20 // 화살촉 길이
            );

            // 양방향 엣지의 경우 반대 방향 화살표 추가
            if (bidirectionalEdges.includes(id)) {
              const reverseProgress = reverseAnimationProgress[id];
              const reversePoint1 = edge.edgeType.getPoint(reverseProgress);
              const reversePoint2 = edge.edgeType.getPoint(
                reverseProgress - 0.01
              );

              drawArrow(
                ctx,
                reversePoint1.x,
                reversePoint1.y,
                reversePoint2.x,
                reversePoint2.y,
                "#FFDAB9", // 다른 파스텔톤 색상
                4, // 선 두께
                15 // 화살촉 길이
              );
            }
          }
        });
        ctx.restore();

        // 노드 다시 그리기
        Object.values(network.body.nodes).forEach((node) => {
          node.draw(ctx);
        });
      };

      // 화살표 그리기 함수
      const drawArrow = (
        ctx,
        fromX,
        fromY,
        toX,
        toY,
        color,
        lineWidth = 2,
        headlen = 10
      ) => {
        const angle = Math.atan2(toY - fromY, toX - fromX);

        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // 화살촉 그리기
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
          toX - headlen * Math.cos(angle - Math.PI / 6),
          toY - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          toX - headlen * Math.cos(angle + Math.PI / 6),
          toY - headlen * Math.sin(angle + Math.PI / 6)
        );
        ctx.lineTo(toX, toY);
        ctx.lineTo(
          toX - headlen * Math.cos(angle - Math.PI / 6),
          toY - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.fillStyle = color;
        ctx.fill();
      };

      // 'afterDrawing' 이벤트 등록
      network.on("afterDrawing", (ctx) => {
        animate(ctx);
      });

      // 'dragEnd' 이벤트 핸들러 추가
      network.on("dragEnd", (params) => {
        params.nodes.forEach((nodeId) => {
          const originalPosition = originalPositions[nodeId];
          if (originalPosition) {
            nodes.update({
              id: nodeId,
              x: originalPosition.x,
              y: originalPosition.y,
            });
          }
        });
      });

      // 'hoverNode' 이벤트 핸들러 추가
      network.on("hoverNode", (params) => {
        const nodeId = params.node;
        const node = nodes.get(nodeId);

        // 노드의 스타일 변경 (예: 크기 증가, 테두리 색상 변경)
        nodes.update({
          id: nodeId,
          font: { ...node.font, size: node.font.size + 5 },
          borderWidth: 3,
          borderWidthSelected: 3,
          color: {
            ...node.color,
            border: "#DEDEDE", 
          },
        });
      });

      // 'blurNode' 이벤트 핸들러 추가
      network.on("blurNode", (params) => {
        const nodeId = params.node;
        const originalStyle = originalStyles[nodeId];

        // 노드의 스타일을 원래대로 복구
        nodes.update({
          id: nodeId,
          font: originalStyle.font,
          borderWidth: 1,
          borderWidthSelected: 2,
          color: {
            ...originalStyle.color,
            border: undefined,
          },
        });
      });

      // 애니메이션 시작
      updateAnimation();
    };

    initializeNetwork();

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      if (network) {
        network.off("afterDrawing", animate);
        network.off("dragEnd");
        network.off("hoverNode");
        network.off("blurNode");
        network.destroy();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={styles.section4}>
      <div ref={diagramContainer} className={styles.diagramContainer}></div>
    </div>
  );
};

export default Section4;
