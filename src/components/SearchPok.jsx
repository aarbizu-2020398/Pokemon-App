import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchPok = ({ onSearchClick }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearchClick(query.toLowerCase());
    }
  };

  return (
    <Form className="d-flex mb-4">
      <Form.Control
        type="text"
        placeholder="Buscar Pokémon"
        value={query}
        onChange={handleInputChange}
        className="form controll me-2"
      />
      <Button variant="primary" onClick={handleSearchClick}>
        Buscar
      </Button>
    </Form>
  );
};

export default SearchPok;
