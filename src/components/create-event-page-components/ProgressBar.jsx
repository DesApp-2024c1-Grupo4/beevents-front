import { Box, Slider, Stack } from "@mui/material";
import { customMuiTheme } from "../../config/customMuiTheme";

function ProgressBar({ currentStep }) {
  const { contrastGreen } = customMuiTheme.colors;
  const getStepValue = (step) => {
    switch (step) {
      case 1:
        return 0;
      case 2:
        return 33;
      case 3:
        return 66;
      case 4:
        return 100
      default:
        return 0;
    }
  };

  const getStepColor = (step, targetStep) => {
    return step === targetStep ? contrastGreen : "lightslategray";
  };

  const sliderValue = getStepValue(currentStep);

  return (
    <Stack
      sx={{ width: { xs: "200px", sm: "300px", md: "400px" } }}
      justifyContent="center"
      alignItems="center"
      spacing={0.7}
      >
      <Slider
        size="small"
        value={sliderValue}
        aria-label="Small"
        valueLabelDisplay="off"
        sx={{
          margin: 0,
          padding: 0,
          color: contrastGreen,
          "& .MuiSlider-track": {
            color: contrastGreen,
          },
          "& .MuiSlider-thumb": {
            color: contrastGreen,
          },
          "& .MuiSlider-rail": {
            color: "lightslategray",
          },
          "@media (max-width: 600px)": {
            margin: 0,
            padding: 0,
          },
          width: "85%"
        }}
      />
      <Box
        sx={{
          width: "100%",
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: getStepColor(1, currentStep),
          }}
        >
          PASO 1
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: getStepColor(2, currentStep),
          }}
        >
          PASO 2
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: getStepColor(3, currentStep),
          }}
        >
          PASO 3
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: getStepColor(4, currentStep),
          }}
        >
          PASO <span className="special-font">4</span>
        </p>
      </Box>
    </Stack>
  );
}

export default ProgressBar;