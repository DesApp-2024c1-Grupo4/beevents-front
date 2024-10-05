import { Box, Button, Slider, Stack } from "@mui/material";
import { customMuiTheme } from "../../config/customMuiTheme";

function ProgressBar({ currentStep, setStep }) {
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

  const SliderButton = ({ step }) => {
    return (
      <Button
        onClick={() => setStep(Number(step))}
        sx={{
          fontSize: "13px",
          fontWeight: "500",
          color: getStepColor(Number(step), currentStep),
          "&:hover": {
            backgroundColor: "inherit",
            borderBottom: `1px solid ${contrastGreen}`,
            p: 0
          },
          minWidth: 0,
          p: 0,
          borderRadius: "5px 5px 0px 0px"
        }}
      >
        {`PASO ${step}`}
      </Button>
    )
  }

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
        <SliderButton step={"1"} />
        <SliderButton step={"2"} />
        <SliderButton step={"3"} />
        <SliderButton step={"4"} />
      </Box>
    </Stack>
  );
}

export default ProgressBar;