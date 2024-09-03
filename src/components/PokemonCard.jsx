import React from 'react';
import { Card, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card style={{ width: '70%', margin: '0 auto', backgroundColor: '#fffaf0', borderRadius: '8px' }}>
      <Card.Img variant="top" src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
      <Card.Body>
        <Card.Title style={{ textTransform: 'capitalize', fontSize: '1.5rem' }}>{pokemon.name}</Card.Title>
        <Card.Text>
          <strong>Altura:</strong> {pokemon.height / 10} m<br />
          <strong>Peso:</strong> {pokemon.weight / 10} kg<br />
          <strong>Experiencia base:</strong> {pokemon.base_experience} XP
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <strong>Tipo:</strong> {pokemon.types.map(type => type.type.name).join(', ')}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Habilidades:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
        </ListGroupItem>
        <ListGroupItem>
          <strong>Estadísticas base:</strong>
          <div>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name}>
                <strong>{stat.stat.name.toUpperCase()}:</strong>
                <ProgressBar now={stat.base_stat} label={`${stat.base_stat}`} max={150} style={{ marginBottom: '10px' }} />
              </div>
            ))}
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <strong>Movimientos principales:</strong>
          <ul>
            {pokemon.moves.slice(0, 5).map(move => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default PokemonCard;
