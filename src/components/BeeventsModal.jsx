import {
  Box,
  CircularProgress,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import Logo from "../assets/img/logo.png";
import { customMuiTheme } from "../config/customMuiTheme";

export default function BeeventsModal({
  open,
  handleClose,
  message,
  processMessageIncludes,
  errorMessageIncludes,
  tryAgainMessage,
  subMessage,
  onConfirm,
}) {
  const contrastGreen = customMuiTheme.colors;
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "380px",
    bgcolor: "#13273D",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  };

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      hideBackdrop={message.includes(processMessageIncludes) ? true : false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box sx={style}>
        <img src={Logo} alt="Logo" style={{ width: 100, marginBottom: 5 }} />
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            textAlign: "center",
            fontWeight: 500,
            color: message.includes(errorMessageIncludes)
              ? "red"
              : contrastGreen,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {message}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 1,
            mb: 3,
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {" "}
          {message.includes(errorMessageIncludes)
            ? tryAgainMessage
            : isNonEmptyString(subMessage)
            ? subMessage
            : "Solo tomará un momento"}
        </Typography>
        {message.includes(processMessageIncludes) ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={30} />
          </Box>
        ) : (
          <></>
        )}
        {onConfirm && (
          <Box display="flex" justifyContent="space-evenly" width="100%">
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Confirmar
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
