import React from 'react';

const Defs = () => (
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
);

export default Defs;
