import React, { useEffect, useState, useRef } from "react";
import BackgroundImage from "../assets/img/homebanner.png";
import { getAllEvents } from "../services/EventService";
import InputSearch from "../components/InputSearch";
import HexagonalCard from "./HexagonalCard";

const HeroImage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.children[0];
        carouselRef.current.style.transition = "transform 1s ease";
        carouselRef.current.style.transform = `translateX(-${firstChild.clientWidth}px)`;

        const handleTransitionEnd = () => {
          carouselRef.current.style.transition = "none";
          carouselRef.current.style.transform = "translateX(0)";
          carouselRef.current.appendChild(firstChild);
          carouselRef.current.removeEventListener(
            "transitionend",
            handleTransitionEnd
          );
        };

        carouselRef.current.addEventListener(
          "transitionend",
          handleTransitionEnd
        );
      }
    }, 3000); // Intervalo de tiempo para el desplazamiento (3 segundos)

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredEvents(filteredData);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "90vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "90vh",
          width: "100%",
          background: `url(${BackgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
          zIndex: -2,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <InputSearch
            options={events.map((event) => event.name)}
            onSearch={handleSearch}
          />
        </div>
        <div
          ref={carouselRef}
          style={{
            marginTop: "20px",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            display: "flex",
            flexWrap: "nowrap",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {(searchTerm === "" ? events : filteredEvents).map((event) => (
            <HexagonalCard
              key={event.id}
              id={event.id}
              artist={event.artist}
              imageUrl={event.image}
              style={{ flex: "0 0 auto", margin: "0 20px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
