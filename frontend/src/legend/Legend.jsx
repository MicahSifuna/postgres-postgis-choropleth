import React from "react";
import "../legend/legend.css";

const Legend = () => {
  const grades = [0, 50000, 100000, 200000, 500000, 1000000, 2000000];

  const getColor = (pop) => {
    return pop > 2000000
      ? "#800026"
      : pop > 1000000
      ? "#BD0026"
      : pop > 500000
      ? "#E31A1C"
      : pop > 200000
      ? "#FC4E2A"
      : pop > 100000
      ? "#FD8D3C"
      : pop > 50000
      ? "#FEB24C"
      : "#FFEDA0";
  };

  return (
    <div className="map-legend">
      <h4>Population</h4>

      {grades.map((g, i) => (
        <div key={i} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: getColor(g + 1) }}
          ></span>
          <span className="legend-label">
            {g.toLocaleString()}
            {grades[i + 1] ? ` - ${grades[i + 1].toLocaleString()}` : "+"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
