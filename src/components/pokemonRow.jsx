import { useState } from "react";
import { Typography } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

const styles = createStyles(() => ({
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
          src="https://uc1453dfb63fb8e3ee14a89cafb7.dl.dropboxusercontent.com/cd/0/inline/AthMyQonitJoab7MPUabZOspOWtMesz4o5aR25iiIZtkJKhH6BMOgyfBWNxc3Kvkx7QfYo89TuyzLrOlqf6IYfhDfxkfqSXNOC5FT5uIzcrn1GRwMEkMP0Z8w4TXyZ4qNqU/file#"
          alt="Loading"
        />
      )}
      <Typography
        style={{ textTransform: "capitalize" }}
        onClick={() => setDidLoad(!didLoad)}
      >
        {props.name}
      </Typography>
    </div>
  );
};
export const PokemonRow = withStyles(styles)(PokemonRowComponent);
