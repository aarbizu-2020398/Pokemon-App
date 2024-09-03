
import { useState, useEffect } from 'react';
import {reqPokemon} from '../services/pokemon'

const usePokemonSearch = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    reqPokemon().then(data => {
      const fetches = data.results.map(p =>
        fetch(p.url).then(res => res.json())
      );
      Promise.all(fetches).then(details => setPokemonList(details));
    });
  }, []);

  return pokemonList;
};

export default usePokemonSearch;
