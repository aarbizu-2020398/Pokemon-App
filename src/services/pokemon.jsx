const apiKey = 'Poke_dex'; 
const apiURL = 'https://pokeapi.co/api/v2/pokemon/';

export const reqPokemon = async (name) => {
  try {

    const response = await fetch(`${apiURL}${name}`);

    const data = await response.json();
    
    const pokemon = {
      id: data.id,
      name: data.name,
      types: data.types.map(typeInfo => typeInfo.type.name) 
    }
    
    return pokemon;

  } catch (err) {
    console.error(err);
  }
}
