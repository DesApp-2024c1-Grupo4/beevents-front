import React from "react";

const HeroPattern = ({ numRows, numColumns }) => {
  const containerStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexWrap: "wrap",
  };

  const hexagonStyle = {
    width: "100px" /* Ajustar según el tamaño que desees */,
    height: "115px" /* Ajustar según el tamaño que desees */,
    backgroundColor: "#3f51b5" /* Color del hexágono */,
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  };

  const hexagons = [];

  // Generar los hexágonos
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      const hexagonKey = `${row}-${col}`;
      hexagons.push(<div key={hexagonKey} style={hexagonStyle} />);
    }
  }

  return <div style={containerStyle}>{hexagons}</div>;
};

export default HeroPattern;
