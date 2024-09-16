import React, { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { customStyles } from "../../config/customMuiTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import availableIcon from "../../assets/img/available-seat.png";
import eliminatedIcon from "../../assets/img/eliminated-seat.png";
import preReservedIcon from "../../assets/img/prereserved-seat.png";
import { IconButton, Stack, Typography } from "@mui/material";
import SectorDistributionSeat from "./SectorDistributionSeat";
import { ArrowDropUp, HelpCenter } from "@mui/icons-material";

export const useIsOverflow = (ref, callback) => {
  const [isOverflow, setIsOverflow] = useState(undefined);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      setIsOverflow(hasOverflow);
      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};

export function HelpTips({ isMobile }) {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "3px",
        right: "20px",
        backgroundColor: "#145362",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
      alignItems="end"
    >
      <Typography sx={{ fontSize: isMobile ? "10px" : "12px" }}>
        Toca una vez para reservar el asiento
      </Typography>
      <Typography sx={{ fontSize: isMobile ? "10px" : "12px" }}>
        Toca dos veces para eliminar el asiento
      </Typography>
      <Typography sx={{ fontSize: isMobile ? "10px" : "12px" }}>
        Toca otra vez para resetear el asiento
      </Typography>
    </Stack>
  );
}

const SectorDistributionMap = ({ rows, sectorName, onSeatClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = useRef();
  const isOverflow = useIsOverflow(ref);
  const [askedForHelp, setAskedForHelp] = useState(false);

  const handleHelp = () => {
    setAskedForHelp(!askedForHelp);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      p={1}
    >
      <Stack
        spacing={2}
        sx={{
          color: "#fff",
          fontSize: "18px",
          letterSpacing: "2px",
          marginBottom: "1rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #01BB89",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#01BB89",
            fontWeight: 600,
          }}
        >
          Distribución del sector
        </Typography>
        <Typography>{sectorName}</Typography>
        <IconButton
          size="small"
          onClick={handleHelp}
          sx={{
            position: "absolute",
            top: "-14px",
            right: "2px",
          }}
        >
          <HelpCenter fontSize="small" />
        </IconButton>
        {askedForHelp && <HelpTips isMobile={isMobile} />}
      </Stack>
      <Grid
        alignItems="center"
        justifyContent="center"
        ref={ref}
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          maxWidth: "70vw",
          maxHeight: "50vh",
          py: "1rem",
        }}
      >
        {rows.map((rowBlock) => (
          <Grid
            item
            xs={12}
            key={rowBlock[0]._id}
            sx={{
              minWidth: "max-content",
              overflow: "visible",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              width="auto"
              sx={{
                marginLeft: "1rem",
                marginRight: "1rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
              }}
            >
              {rowBlock &&
                rowBlock.map((seat) => {
                  const seatWithPreReserved = {
                    ...seat,
                  };
                  return (
                    <SectorDistributionSeat
                      key={seatWithPreReserved._id}
                      seat={seatWithPreReserved}
                      onSeatClick={onSeatClick}
                      reservedBy={seatWithPreReserved.reservedBy}
                    />
                  );
                })}
            </Box>
          </Grid>
        ))}
      </Grid>
      {isOverflow && (
        <Stack justifyContent="center" alignItems="center" pb={2}>
          <ArrowDropUp />
          <Typography sx={{ fontSize: isMobile ? "10px" : "12px" }}>
            Usa la barra para ver más
          </Typography>
        </Stack>
      )}
      <Stack direction="row" spacing={1.5}>
        <Typography
          display="flex"
          alignItems="center"
          sx={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          <img src={availableIcon} style={customStyles.seat} />
          Existente
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          sx={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          <img src={eliminatedIcon} style={customStyles.seat} />
          Eliminado
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          sx={{ fontSize: isMobile ? "10px" : "12px" }}
        >
          <img src={preReservedIcon} style={customStyles.seat} />
          Pre-reservado
        </Typography>
      </Stack>
    </Box>
  );
};

export default SectorDistributionMap;
