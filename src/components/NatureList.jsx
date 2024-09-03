import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Image } from 'react-bootstrap';

const natureTranslations = {
  hardy: "Fuerte",
  lonely: "Huraña",
  brave: "Audaz",
  adamant: "Firme",
  naughty: "Pícara",
  bold: "Osada",
  docile: "Dócil",
  relaxed: "Plácida",
  impish: "Agitada",
  lax: "Floja",
  timid: "Miedosa",
  hasty: "Activa",
  serious: "Seria",
  jolly: "Alegre",
  naive: "Ingenua",
  modest: "Modesta",
  mild: "Afable",
  quiet: "Mansa",
  bashful: "Tímida",
  rash: "Alocada",
  calm: "Serena",
  gentle: "Amable",
  sassy: "Grosera",
  careful: "Cauta",
  quirky: "Rara"
};

const NatureList = ({ onNatureSelect }) => {
  const [natures, setNatures] = useState([]);
  const [selectedNature, setSelectedNature] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchNatures = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/nature/');
        const data = await response.json();
        setNatures(data.results);
      } catch (error) {
        console.error("Error fetching natures:", error);
      }
    };
    fetchNatures();
  }, []);

  const handleNatureClick = async (natureUrl) => {
    try {
      const response = await fetch(natureUrl);
      const data = await response.json();
      setSelectedNature(data);
      onNatureSelect(data);

      const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
      const pokemonResult = await pokemonData.json();
      setPokemonList(pokemonResult.results.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching nature details or Pokémon:", error);
    }
  };

  return (
    <div>
      <h3 className="mt-4">Buscar por Naturaleza</h3>
      <ListGroup className="mb-4">
        {natures.map(nature => (
          <ListGroup.Item 
            key={nature.name} 
            action 
            onClick={() => handleNatureClick(nature.url)}
            style={{ cursor: 'pointer', textTransform: 'capitalize' }}
          >
            {natureTranslations[nature.name] || nature.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedNature && (
        <div>
          <h4>{natureTranslations[selectedNature.name] || selectedNature.name}</h4>
          <p>Increased Stat: {selectedNature.increased_stat?.name || 'None'}</p>
          <p>Decreased Stat: {selectedNature.decreased_stat?.name || 'None'}</p>
          <p>Likes Flavor: {selectedNature.likes_flavor?.name || 'None'}</p>
          <p>Hates Flavor: {selectedNature.hates_flavor?.name || 'None'}</p>
          <Button 
            variant="primary" 
            onClick={() => setSelectedNature(null)}
            style={{ marginTop: '10px' }}
          >
            Limpiar Selección
          </Button>

          <div className="mt-3">
            <h5>Pokémon Relacionados:</h5>
            <ListGroup>
              {pokemonList.map(pokemon => (
                <ListGroup.Item key={pokemon.name} className="d-flex align-items-center">
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[pokemon.url.split('/').length - 2]}.png`}
                    alt={pokemon.name}
                    rounded
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  <span style={{ textTransform: 'capitalize' }}>{pokemon.name}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default NatureList;
