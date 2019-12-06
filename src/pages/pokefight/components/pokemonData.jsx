import { makeStyles, Typography, createStyles } from "@material-ui/core";
import theme from "../../../utils/theme";

const useStyles = makeStyles(theme =>
  createStyles({
    pokemonData: {
      position: "absolute",
      backgroundColor: "#E5E4C8",
      borderRadius: 10,
      border: "2px solid black",
      padding: "5px 5px",
      [theme.breakpoints.up("md")]: {
        padding: "10px 15px",
        width: "35%",
        height: 80,
        border: "5px solid black"
      }
    },
    leftPokemonData: {
      bottom: "5%",
      right: "5%",
      [theme.breakpoints.up("md")]: {
        bottom: 20,
        right: 50
      }
    },
    rightPokemonData: {
      left: "5%",
      top: "5%",
      [theme.breakpoints.up("md")]: {
        left: 50,
        top: 20
      }
    },
    innerPokemonDataBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    nameText: {
      textTransform: "uppercase",
      flex: 2,
      fontSize: "1.5vw",
      [theme.breakpoints.up("md")]: {
        fontSize: 14
      }
    },
    levelText: {
      textTransform: "uppercase",
      flex: 1,
      textAlign: "end",
      fontSize: "1.5vw",
      [theme.breakpoints.up("md")]: {
        fontSize: 14
      }
    },
    healthbarBox: {
      backgroundColor: "black",
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
      padding: "2px 5px",
      [theme.breakpoints.up("md")]: {
        marginLeft: 50
      }
    },
    hpText: {
      fontSize: "1.5vw",
      color: "#E1AA43",
      [theme.breakpoints.up("md")]: {
        fontSize: 14
      }
    },
    hpBar: {
      transition: "1000ms",
      height: 3,
      marginTop: 1,
      [theme.breakpoints.up("sm")]: {
        height: 7,
        marginTop: 4
      },
      [theme.breakpoints.up("md")]: {
        height: 10,
        marginTop: 5
      }
    }
  })
);

const PokemonData = props => {
  const classes = useStyles();
  const { rightPokemon, data, health } = props;
  const HP = health ? health : 100;
  return (
    <div
      className={`${classes.pokemonData} ${
        rightPokemon ? classes.rightPokemonData : classes.leftPokemonData
      }`}
    >
      <div className={classes.innerPokemonDataBox}>
        <Typography className={classes.nameText}>
          <strong>{data.name}</strong>
        </Typography>
        <Typography className={classes.levelText}>
          <strong>LV.100</strong>
        </Typography>
      </div>
      <div className={classes.healthbarBox}>
        <Typography className={classes.hpText}>
          <strong>HP:</strong>
        </Typography>
        <div style={{ width: "100%" }}>
          <div
            className={classes.hpBar}
            style={{
              width: `${HP}%`,
              backgroundColor: `${
                HP > 60 ? "green" : HP > 30 ? "yellow" : "red"
              }`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
