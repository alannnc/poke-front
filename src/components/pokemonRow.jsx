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
          src="https://docs.google.com/uc?id=1gGXXRzJSs21X8AjMzVhxOpH6lzZIuWjq"
          alt="Loading"
        />
      )}
      <Typography className={classes.pokemonName}>{props.name}</Typography>
    </div>
  );
};
export const PokemonRow = withStyles(styles)(PokemonRowComponent);
