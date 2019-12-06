import { useState } from "react";
import { Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

const styles = createStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  hidden: {
    visibility: "hidden"
  },
  whileLoadingImage: {
    width: 50,
    height: 50,
    margin: 20,
    alignSelf: "center"
  },
  itemImage: {
    alignSelf: "center"
  },
  pokemonName: {
    textTransform: "capitalize",
    fontSize: 12,
    [theme.breakpoints.up("sm")]: {
      fontSize: 14
    }
  }
}));

const PokemonRowComponent = props => {
  const { classes } = props;
  const [didLoad, setDidLoad] = useState(false);
  return (
    <div className={classes.container}>
      <img
        className={`${classes.itemImage} ${!didLoad ? classes.hidden : ""}`}
        src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${props.index}.png?raw=true`}
        onLoad={() => setDidLoad(true)}
      />
      {!didLoad && (
        <img
          className={classes.whileLoadingImage}
          src="https://uccacd4e71ecbab123e4d4688837.dl.dropboxusercontent.com/cd/0/inline/AtvOw5oTB-yxY9LcWNPzRvDaibmHEtT0GKP8HUzvA6TIWQRpmAN7su1eNi4xpeDVUR6qm14vE3e_tzBLF5_l5MoVq5JluB0ovRIiZcK-POJqw5IorQnkNy4ohlxL0lVMd7A/file#"
          alt="Loading"
        />
      )}
      <Typography className={classes.pokemonName}>{props.name}</Typography>
    </div>
  );
};
export const PokemonRow = withStyles(styles)(PokemonRowComponent);
