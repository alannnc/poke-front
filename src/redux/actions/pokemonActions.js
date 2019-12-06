import { Http } from "../../Api/Http";
import actions from "./index";

const httpService = new Http();

export const getPokemons = ({ page, isServer } = {}) => async dispatch => {
  if (isServer) {
    dispatch({ type: actions.INIT_POKEMONS });
  }
  let currentPage = page ? page : 0;
  let response;
  try {
    response = await httpService.get(`/pokemons`, {
      params: { page: currentPage }
    });
  } catch (error) {
    return dispatch(retrieveGetPokemonsError(error));
  }
  return dispatch({
    type: actions.GET_POKEMONS,
    pokemons: response.results,
    page: currentPage
  });
};

export const getPokemonFighters = ({
  pokemonAId,
  pokemonBId
}) => async dispatch => {
  const response = await httpService.get(
    `/fight?A=${pokemonAId}&B=${pokemonBId}`
  );
  return dispatch({
    type: actions.GET_POKEMONS_FIGHT,
    pokemonFighters: response.results
  });
};

export const getPokemon = id => async dispatch => {
  const response = await httpService.get(`/${id}`);
  return dispatch({ type: actions.GET_POKEMON, pokemon: response.results });
};

export const retrieveGetPokemonsError = error => ({
  type: actions.GET_POKEMONS_ERROR,
  error
});
