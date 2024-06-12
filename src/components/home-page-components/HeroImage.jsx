import React, { useEffect, useState, useRef } from "react";
import BackgroundImage from "../../assets/img/homebanner.png";
import { getAllEvents } from "../../services/EventService";
import InputSearch from "../../components/InputSearch";
import logo from "../../assets/img/abreviatura.png";
import Box from "@mui/material/Box";
import HeroImageCard from "../../components/home-page-components/HeroImageCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingIndicator from "../LoadingIndicator";

const HeroImage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const allEvents = await getAllEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.children[0];
        const cardWidth = firstChild.clientWidth;
        const cardMargin = 12;
        carouselRef.current.style.transition = "transform 1s ease";
        carouselRef.current.style.transform = `translateX(-${
          cardWidth + cardMargin * 2
        }px)`;

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
    }, 2500);
  };

  const stopCarousel = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (searchTerm === "") {
      startCarousel();
    } else {
      stopCarousel();
    }
    return () => clearInterval(intervalRef.current);
  }, [searchTerm]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter((item) =>
      item.artist.toLowerCase().includes(lowercasedFilter)
    );
    const uniqueFilteredData = filteredData.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.artist === event.artist)
    );
    setFilteredEvents(uniqueFilteredData);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: isTablet ? "60vh" : "90vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
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
          position: "relative",
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
            marginTop: isMobile ? "0px" : "40px",
            marginBottom: isMobile ? "0px" : "10px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Box sx={{ maxWidth: { xs: 60, sm: 100 }, m: 4 }}>
            <img src={logo} alt="brandLogo" style={{ maxWidth: "100%" }} />
          </Box>
          <InputSearch
            options={events.map((event) => event.artist)}
            onSearch={handleSearch}
          />
        </div>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingIndicator />
          </Box>
        ) : (
          <div
            ref={carouselRef}
            style={{
              marginTop: isMobile ? "0px" : "20px",
              paddingTop: isMobile ? "1rem" : "2rem",
              paddingBottom: isMobile ? "1rem" : "2rem",
              display: "flex",
              flexWrap: "nowrap",
              overflow: "hidden",
              width: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            {(searchTerm === "" ? events : filteredEvents).map((event) => (
              <HeroImageCard
                key={event._id}
                id={event._id}
                artist={event.artist}
                imageUrl={event.image}
                style={{ flex: "0 0 auto", margin: "0 20px" }}
              />
            ))}
          </div>
        )}
      </div>
    </Box>
  );
};

export default HeroImage;
