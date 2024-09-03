import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import SearchPok from "./SearchPok";
import PokemonCard from "./PokemonCard";
import NatureList from "./NatureList";

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

class PokemonApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: null,
      error: null,
      selectedNature: null,
      relatedPokemons: [],
      natureList: Object.keys(natureTranslations)
    };
  }

  handleSearchClick = async (query) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      const data = await response.json();
      this.setState({ pokemonData: data, error: null });
    } catch (error) {
      this.setState({ pokemonData: null, error: error.message });
    }
  };

  handleNatureSelect = async (nature) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/nature/${nature}`);
      if (!response.ok) {
        throw new Error("Error al buscar la naturaleza.");
      }
      const data = await response.json();
      const relatedPokemons = await Promise.all(
        data.pokemon.map(async (p) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemonData.name,
            types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
            spriteUrl: pokemonData.sprites.front_default,
          };
        })
      );
      this.setState({ selectedNature: nature, relatedPokemons });
    } catch (error) {
      console.error("Error fetching related pokemons:", error);
    }
  };

  renderRelatedPokemons() {
    return (
      <div>
        <h5 className="mt-3">
          Pokémones Relacionados con la Naturaleza {natureTranslations[this.state.selectedNature]}
        </h5>
        <ListGroup>
          {this.state.relatedPokemons.length > 0 ? (
            this.state.relatedPokemons.slice(0, 5).map((pokemon, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <img
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  className="mr-2"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <span style={{ textTransform: "capitalize" }}>{pokemon.name}</span>
                  <br />
                  <small>Tipo: {pokemon.types.join(", ")}</small>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No hay Pokémon relacionados.</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <Container className="p-4" style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}>
        <Row>
          <Col md={8}>
            <div className="d-flex flex-row justify-content-center align-items-center mb-4">
              <img src="https://fontmeme.com/permalink/240903/b9d6d1009286df593008320eca7eec92.png" alt="Poke"/>
              <img src="https://fontmeme.com/permalink/240903/7b3b1b7657c2597569de61bd2ccf4d4a.png" alt="Dex"/>
            </div>
            <SearchPok onSearchClick={this.handleSearchClick} />
            {this.state.error && (
              <div className="text-center text-danger">
                {this.state.error}
              </div>
            )}
            {this.state.pokemonData && (
              <PokemonCard pokemon={this.state.pokemonData} />
            )}
          </Col>
          <Col md={4}>
            <NatureList onNatureSelect={this.handleNatureSelect} />
            {this.renderRelatedPokemons()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PokemonApp;
