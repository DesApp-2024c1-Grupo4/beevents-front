import React, { useState } from "react";
import availableIcon from "../../assets/img/available-seat.png";
import notAvailableIcon from "../../assets/img/notavailable-seat.png";
import preReservedIcon from "../../assets/img/prereserved-seat.png";

const getSeatStatus = (seat) => {
  if (seat.available) {
    return "Disponible";
  } else if (!seat.available) {
    return "Reservado";
  } else if (seat.available == "pre-reserved") {
    return "Pre-Reservado";
  }
};

const SeatCard = ({ seat }) => {
  console.log(seat.available);
  return (
    <div
      style={{
        position: "absolute",
        top: "-40px",
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
        <b>Estado:</b> {getSeatStatus(seat)}
      </p>
      <p style={{ fontSize: "10px", margin: "0.5px", color: "white" }}>
        <b>Asiento:</b> {seat.displayId}
      </p>
    </div>
  );
};

const Seat = ({ seat, onSeatClick }) => {
  console.log(seat);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    onSeatClick(seat);
  };

  const getSeatStyle = (seat) => {
    let backgroundStyle = {
      width: "10px",
      height: "10px",
      margin: "3px",
      padding: "4px",
      cursor: "pointer",
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
    if (!seat.available && seat.reservedBy == "pre-reserved") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage: `url(${preReservedIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else if (!seat.available) {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage: `url(${notAvailableIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else if (seat.available && seat.reservedBy == "vacio") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage: `url(${availableIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    }

    let backgroundColor = "transparent";
    // if (seat.preReserved) {
    //   backgroundColor = "#51DD99";
    // }

    return {
      ...backgroundStyle,
      backgroundColor: backgroundColor,
    };
  };

  return (
    <div
      style={{
        position: "relative",
        ...getSeatStyle(seat),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {hovered && <SeatCard seat={seat} />}
    </div>
  );
};

export default Seat;
