import React, { useState } from "react";
import availableIcon from "../../assets/img/available-seat.png";
import notAvailableIcon from "../../assets/img/notavailable-seat.png";
import preReservedIcon from "../../assets/img/prereserved-seat.png";
import noPermissionCursor from "../../assets/img/ReservedCursor.png";
import preReservedByAdminIcon from "../../assets/img/reservedByAdmin-seat.png";
import UserService from "../../services/userService";

const getSeatStatus = (seat) => {
  if (seat.available == "true" && seat.reservedBy != "pre-reserved") {
    return "Disponible";
  } else if (seat.available === "preReserved" || seat.available === "false") {
    return "Reservado";
  } else if (seat.available == "true" && seat.reservedBy == "pre-reserved") {
    return "Pre-Reservado";
  }
};

const SeatCard = ({ seat }) => {
  return (
    <>
      {seat.available != "eliminated" && (
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
          <p style={{ fontSize: "9px", margin: "0.5px", color: "white" }}>
            <b>Estado:</b> {getSeatStatus(seat)}
          </p>
          <p style={{ fontSize: "9px", margin: "0.5px", color: "white" }}>
            <b>Asiento:</b> {seat.displayId}
          </p>
        </div>
      )}
    </>
  );
};

const Seat = ({ seat, onSeatClick }) => {
  const [hovered, setHovered] = useState(false);
  const userService = new UserService();

  const loggedUser = userService.getUserFromLocalStorage();

  const handleClick = () => {
    onSeatClick(seat);
  };

  const getSeatStyle = (seat) => {
    let backgroundStyle = {
      minWidth: "6px",
      minHeight: "6px",
      margin: "4px",
      padding: "4px",
      cursor:
        seat.available === "eliminated"
          ? "default"
          : seat.available === "true" || seat.reservedBy === "pre-reserved"
          ? "pointer"
          : `url(${noPermissionCursor}), not-allowed`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#100E0C",
      textShadow:
        seat.available === "eliminated"
          ? "none"
          : "1px 1px 2px rgba(0,0,0,0.7)",
      borderRadius: "5px",
      transition: "all 0.3s ease-in-out",
      transform:
        hovered && seat.available !== "eliminated" ? "scale(1.1)" : "scale(1)",
      boxShadow:
        hovered && seat.available !== "eliminated"
          ? "0 4px 8px rgba(0, 0, 0, 0.3)"
          : "none",
    };

    if (seat.available === "eliminated") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundColor: "transparent",
      };
    } else if (seat.reservedBy === "pre-reserved") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage: `url(${preReservedIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else if (seat.available === "preReserved" || seat.available === "false") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage:
          loggedUser.role == "admin" && seat.available === "preReserved"
            ? `url(${preReservedByAdminIcon})`
            : `url(${notAvailableIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else if (seat.reservedBy === "vacio") {
      backgroundStyle = {
        ...backgroundStyle,
        backgroundImage: `url(${availableIcon})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    }

    return {
      ...backgroundStyle,
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
