import { Component, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { Typography, Button, createStyles } from "@material-ui/core";
import Layout from "../../components/layout";
import PokemonData from "./components/pokemonData";
import { getPokemonFighters } from "../../redux/actions/pokemonActions";

const styles = theme =>
  createStyles({
    container: {
      height: 500,
      position: "relative",
      backgroundImage:
        'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dccf9b3c-e552-4a19-ba30-2b86db58123e/dcewmcd-61655f8d-e893-45cc-9886-c8d1c9503371.png/v1/fill/w_1024,h_527,q_80,strp/forest_battle_background_by_aamatniekss_dcewmcd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTI3IiwicGF0aCI6IlwvZlwvZGNjZjliM2MtZTU1Mi00YTE5LWJhMzAtMmI4NmRiNTgxMjNlXC9kY2V3bWNkLTYxNjU1ZjhkLWU4OTMtNDVjYy05ODg2LWM4ZDFjOTUwMzM3MS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.5dxJyWYKf42J-QDbSwroSssDATAqhLtnHsYLc-XBHNo")'
    },
    pokemonImage: {
      height: 300,
      position: "absolute"
    },
    leftPokemonImage: {
      top: 200,
      left: 150
    },
    rightPokemonImage: {
      top: 55,
      right: 60
    },
    interactiveBox: {
      backgroundColor: "black",
      padding: "10px"
    },
    innerInteractiveBackground: {
      backgroundColor: "#D04635",
      borderRadius: 5,
      padding: "5px 15px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    textInteractiveBox: {
      backgroundColor: "#62AAA4",
      width: "60%",
      borderRadius: 5
    },
    textInteractive: {
      color: "white",
      textAlign: "left",
      margin: 10
    },
    actionBox: {
      backgroundColor: "white",
      borderRadius: 5,
      height: 120,
      width: 300,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around"
    }
  });
class PokeFightComponent extends Component {
  constructor(props) {
    super(props);
    const pokemonA = this.props.pokemonFighters.pokemonA;
    const baseActionText = `What ${pokemonA.name.toUpperCase()} should do?`;
    this.state = {
      baseActionText,
      actionText: "",
      pokemonBHealth: 100,
      fightState: "standby"
    };
  }

  randomNumber(maxNumber) {
    return Math.floor(Math.random() * (maxNumber - 1 + 1)) + 1;
  }

  battleResult = async moveName => {
    const { pokemonA, pokemonB } = this.props.pokemonFighters;
    const maxDmg = 99;
    const randomDmg = this.randomNumber(maxDmg);
    const remainingHealth = this.state.pokemonBHealth - randomDmg;
    if (remainingHealth <= 0) {
      // 0.1 because 0% on div width doesn't work
      this.setState({
        pokemonBHealth: 0.1,
        fightState: "standby",
        actionText: `${pokemonB.name.toUpperCase()} fainted!`
      });
      this.faintPokemonHandle();
    } else {
      this.setState({
        actionText: `${pokemonA.name.toUpperCase()} used ${moveName} doing ${randomDmg} of damage.`,
        pokemonBHealth: remainingHealth,
        fightState: "standby"
      });
    }
  };

  faintPokemonHandle() {
    const maxPokemonNumberToReach = 700;
    const pokemonAId = this.props.pokemonFighters.pokemonA.id;
    const pokemonBId = this.randomNumber(maxPokemonNumberToReach);
    this.props.getPokemonFighters({ pokemonAId, pokemonBId });
    setTimeout(() => {
      this.setState({ pokemonBHealth: 100, actionText: "" });
    }, 2000);
  }

  render() {
    const { classes, pokemonFighters } = this.props;
    const { fightState } = this.state;
    const { pokemonA, pokemonB } = pokemonFighters;

    return (
      <Layout containerSize={"md"}>
        <div className={classes.container}>
          <PokemonData data={pokemonFighters.pokemonA} />
          <PokemonData
            rightPokemon
            data={pokemonFighters.pokemonB}
            health={this.state.pokemonBHealth}
          />
          <img
            className={`${classes.pokemonImage} ${classes.leftPokemonImage}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonA.id}.png`}
          />
          <img
            className={`${classes.pokemonImage} ${classes.rightPokemonImage}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonB.id}.png`}
          />
        </div>
        <div className={classes.interactiveBox}>
          <div className={classes.innerInteractiveBackground}>
            <div className={classes.textInteractiveBox}>
              <Typography className={classes.textInteractive} variant="h5">
                {this.state.actionText
                  ? this.state.actionText
                  : this.state.baseActionText}
              </Typography>
            </div>
            <div className={classes.actionBox}>
              {fightState === "standby" && (
                <>
                  <Button
                    style={{ margin: "10px 15px" }}
                    color="primary"
                    variant="contained"
                    onClick={() => this.setState({ fightState: "fight" })}
                  >
                    Fight!
                  </Button>
                  <Button style={{ margin: "10px 15px" }}>Items</Button>
                  <Button style={{ margin: "10px 15px" }}>Pokemon</Button>
                  <Button style={{ margin: "10px 15px" }}>Run</Button>
                </>
              )}
              {fightState === "fight" &&
                pokemonA.moves.splice(0, 4).map(({ move }, index) => {
                  return (
                    <Button
                      key={index}
                      style={{ fontSize: "0.5vw", margin: "5px 5px" }}
                      onClick={() => {
                        this.battleResult(move.name);
                      }}
                    >
                      {move.name}
                    </Button>
                  );
                })}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

PokeFightComponent.getInitialProps = async ctx => {
  const query = ctx.query;
  let pokemonAId, pokemonBId;
  if (query && query.pokemonA && query.pokemonB) {
    pokemonAId = Number(query.pokemonA);
    pokemonBId = Number(query.pokemonB);
  } else {
    const maxPokemonNumberToReach = 700;
    pokemonAId =
      Math.floor(Math.random() * (maxPokemonNumberToReach - 1 + 1)) + 1;
    pokemonBId =
      Math.floor(Math.random() * (maxPokemonNumberToReach - 1 + 1)) + 1;
  }
  const { fightPokemons } = await ctx.store.dispatch(
    getPokemonFighters({ pokemonAId, pokemonBId })
  );
  return { fightPokemons };
};

const mapDistpatchToProps = dispatch => ({
  getPokemonFighters: ({ pokemonAId, pokemonBId }) =>
    dispatch(getPokemonFighters({ pokemonAId, pokemonBId }))
});

const mapStateToProps = state => ({
  pokemonFighters: state.pokemonsReducer.data.pokemonFighters
});

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(withStyles(styles)(PokeFightComponent));
