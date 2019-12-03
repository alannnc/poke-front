import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  pokemonData: {
    backgroundColor: "#E5E4C8",
    borderRadius: 10,
    width: "35%",
    height: 80,
    border: "5px solid black",
    position: "absolute",
    padding: "10px 15px"
  },
  leftPokemonData: {
    bottom: 20,
    right: 50
  },
  rightPokemonData: {
    left: 50,
    top: 20
  },
  healthbarBox: {
    backgroundColor: "black",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    marginLeft: 50,
    marginTop: 5,
    padding: "2px 5px"
  },
  innerPokemonDataBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameText: {
    textTransform: "uppercase",
    flex: 2
    // fontSize: "0.9vw"
  },
  levelText: {
    textTransform: "uppercase",
    flex: 1,
    // fontSize: "0.9vw",
    textAlign: "end"
  }
});

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
        <Typography style={{ color: "#E1AA43" }}>
          <strong>HP:</strong>
        </Typography>
        <div style={{ width: "100%" }}>
          <div
            style={{
              transition: "1000ms",
              marginTop: 6,
              width: `${HP}%`,
              backgroundColor: `${
                HP > 60 ? "green" : HP > 30 ? "yellow" : "red"
              }`,
              height: 10
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
