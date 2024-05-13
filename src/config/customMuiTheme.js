import { createTheme } from "@mui/material";
import { blue, blueGrey, grey, lightBlue } from "@mui/material/colors";

export const customMuiTheme = createTheme({
  typography: {
    footerFont: {
      fontSize: '0.8rem',
      color: "whitesmoke"
    },
    footerTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: "#01BB89"
    },
    h4: {
      fontWeight: 'bold',
      color: lightBlue[700],
    },
    h5: {
      fontWeight: 'bold',
      color: blue[800],
      fontSize: '1.5rem',
    },
    subtitle2: {
      fontSize: '1.2rem'
    },
    button: {
      textTransform: 'none',
    },
    topMenu: {
      color: blueGrey[50],
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    topMenuSelected: {
      color: blueGrey[200],
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          fontSize: '1rem',
          color: lightBlue[900]
        }
      }
    }
  },
  colors: {
    softGrey: "#414F60",
    contrastGreen: "#01BB89",
    iconGrey: grey[300]
  }
});
