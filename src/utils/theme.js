import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336"
    },
    secondary: {
      main: "#9ccc65"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 14
  }
});

export default theme;
