import { useState } from "react";
import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  NoSsr,
  Typography,
  Hidden,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

const Layout = function(props) {
  const classes = useStyles();
  const { selectedPokemon } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const { t } = useTranslation();

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
            <Hidden smUp>
              <Button
                color="inherit"
                variant="contained"
                style={{ marginRight: 6, color: "black" }}
                onClick={handleClick}
              >
                <Trans i18nKey="actions"></Trans>
              </Button>
            </Hidden>
            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} keepMounted>
              <MenuItem>
                <Link href="/">
                  <span>Home</span>
                </Link>
              </MenuItem>

              <Link href="/pokefight">
                <MenuItem>Random Battle</MenuItem>
              </Link>
              {selectedPokemon && selectedPokemon.length === 2 && (
                <Link
                  href={`/pokefight?pokemonA=${selectedPokemon[0]}&pokemonB=${selectedPokemon[1]}`}
                >
                  <MenuItem>Selected Battle</MenuItem>
                </Link>
              )}
            </Menu>
            <Hidden xsDown>
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
            </Hidden>
          </Toolbar>
        </AppBar>
        <Container maxWidth={props.containerSize}>
          <Typography style={{ margin: "10px 0" }}>
            {t("instructionsOne")}
            <br />
            {t("scrollDownInstructions")}
          </Typography>
          {props.children}
        </Container>
      </NoSsr>
    </>
  );
};

export default Layout;
