import React, { useState } from "react";

const SeatCard = ({ seat }) => {
  console.log(seat.available);
  return (
    <div
      style={{
        position: "absolute",
        top: seat.reservedBy ? "-70px" : "-40px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#145362",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
        zIndex: 999,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      <p style={{ fontSize: "10px", margin: "0.5px", color: "white" }}>
        <b>Estado:</b> {seat.available ? "Disponible" : "Reservado"}
      </p>
      <p style={{ fontSize: "10px", margin: "0.5px", color: "white" }}>
        <b>Asiento:</b> {seat.displayId}
      </p>
      {/* {seat.reservedBy && (
        <p style={{ fontSize: "10px", margin: "0.5px", color: "white" }}>
          <b>Reservado por:</b> {seat.reservedBy.email}
        </p>
      )}
      {seat.reservedBy && (
        <p style={{ fontSize: "10px", margin: "0.5px", color: "white" }}>
          <b>Id usuario:</b> {seat.reservedBy.id}
        </p>
      )} */}
    </div>
  );
};

const Seat = ({ seat, onSeatClick }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onSeatClick(seat);
  };

  const getSeatStyle = (status, salable) => {
    let backgroundColor = "#606060";
    if (status === "Reservado") {
      backgroundColor = "#F79530";
    } else if (!salable) {
      backgroundColor = "#606060";
    }

    return {
      width: "10px",
      height: "10px",
      margin: "4px",
      padding: "4px",
      cursor: "pointer",
      border: "2px solid #01BB89",
      backgroundColor: backgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#100E0C",
      textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
      borderRadius: "5px",
      transition: "all 0.3s ease-in-out",
      transform: hovered ? "scale(1.2)" : "scale(1)",
      boxShadow: hovered
        ? "0 4px 8px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.2)",
    };
  };

  return (
    <div
      style={{
        position: "relative",
        ...getSeatStyle(seat.status, seat.salable),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {hovered && <SeatCard seat={seat} />}
      {/* <div
        style={{
          fontSize: "13px",
          color: "greens",
          display: "flex",
          padding: "0.5px",
        }}
      >
        {seat.displayId}
      </div> */}
    </div>
  );
};

export default Seat;
