import actions from "../actions";

export const pokemonsInitialState = {
  data: {
    pokemons: [],
    page: 0,
    pokemonFighters: [],
    error: {}
  }
};

export default (state = pokemonsInitialState, action) => {
  switch (action.type) {
    case actions.INIT_POKEMONS:
      return {
        ...state,
        data: {
          ...state.data,
          pokemons: []
        }
      };
    case actions.GET_POKEMONS:
      return {
        ...state,
        data: {
          ...state.data,
          pokemons: [...state.data.pokemons, ...action.pokemons],
          page: (action.page += 1)
        }
      };
    case actions.GET_POKEMONS_FIGHT:
      return {
        ...state,
        data: {
          ...state.data,
          pokemonFighters: action.pokemonFighters
        }
      };
    case actions.GET_POKEMONS_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          error: action.error
        }
      };
    case actions.GET_POKEMON:
      return { ...state, pokemon: action.pokemon };

    default:
      return state;
  }
};
