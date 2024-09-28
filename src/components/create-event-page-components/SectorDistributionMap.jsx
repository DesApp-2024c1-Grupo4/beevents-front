import React, { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { customStyles } from "../../config/customMuiTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import availableIcon from "../../assets/img/available-seat.png";
import eliminatedIcon from "../../assets/img/eliminated-seat.png";
import reservedIcon from "../../assets/img/notavailable-seat.png";
import { Stack, Tooltip, Typography } from "@mui/material";
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

export function HelpTips({ reserving }) {
  return <>
    <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
      Toca una vez para {reserving ? "reservar" : "eliminar"} el asiento
    </Typography>
    <Typography sx={{ fontSize: { xs: "10px", sm: "12px" } }}>
      Toca otra vez para resetear el asiento
    </Typography>
  </>
}

const SectorDistributionMap = ({ rows, sectorName, onSeatClick, reserving, statuses }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const ref = useRef();
  const isOverflow = useIsOverflow(ref);
  const seatIcon = (status) => {
    var icon = availableIcon
    if (status === "Reservado") {
      icon = reservedIcon
    } else if (status === "Eliminado") {
      icon = eliminatedIcon
    }
    return icon;
  }

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
          {reserving? "Reservar asientos" : "Distribución del sector" }
        </Typography>
        <Typography>{sectorName}</Typography>
        <Tooltip
          title={<HelpTips reserving={reserving} />}
          placement="right-start"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: "#000000",
                color: "white",
                fontSize: { xs: "10px", sm: "12px" },
                borderRadius: "4px",
                p: 1,
              },
            },
            arrow: {
              sx: {
                color: "#000000",
              },
            },
          }}
          arrow
        >
          <HelpCenter
            fontSize="small"
            sx={{
              position: "absolute",
              top: "-11px",
              left: "5px",
              cursor: "pointer"
            }}
          />
        </Tooltip>
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
        {statuses.map((status) => (
          <Typography
            display="flex"
            alignItems="end"
            sx={{ fontSize: isMobile ? "10px" : "12px" }}
          >
            <img src={seatIcon(status)} style={customStyles.seat} />
            {status}
          </Typography>
        ))
        }

      </Stack>
    </Box>
  );
};

export default SectorDistributionMap;
