import {
  Container,
  AppBar,
  Toolbar,
  Button,
  NoSsr,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const Layout = props => {
  const classes = useStyles();
  const { selectedPokemon } = props;
  return (
    <>
      <NoSsr>
        <AppBar position="sticky">
          <Toolbar>
            <Link href="/">
              <Typography variant="h6" className={classes.title}>
                Pokémon
              </Typography>
            </Link>
            <Link href="/pokefight">
              <Button
                color="inherit"
                variant="contained"
                style={{ marginRight: 6, color: "black" }}
              >
                Random Battle
              </Button>
            </Link>

            {selectedPokemon && selectedPokemon.length === 2 && (
              <Link
                href={`/pokefight?pokemonA=${selectedPokemon[0]}&pokemonB=${selectedPokemon[1]}`}
              >
                <Button color="inherit" variant="contained" color="secondary">
                  Selected Battle
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth={props.containerSize}>{props.children}</Container>
      </NoSsr>
    </>
  );
};

export default Layout;
