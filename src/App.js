import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import './App.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/?page=1')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results.slice(0, 20)));
  }, []);

  const handleOpen = (character) => {
    setSelectedCharacter(character);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div className="character-list">
      <h1>Rick and Morty Characters</h1>
      <div className="characters">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <Button variant="contained" onClick={() => handleOpen(character)}>
              View Details
            </Button>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box">
            <img src={selectedCharacter.image} alt={selectedCharacter.name} style={{ width: '100%' }} />
            <Typography variant="h6">{selectedCharacter.name}</Typography>
            <Typography variant="body1">Status: {selectedCharacter.status}</Typography>
            <Typography variant="body1">Species: {selectedCharacter.species}</Typography>
            <Typography variant="body1">Gender: {selectedCharacter.gender}</Typography>
            <Typography variant="body1">Location: {selectedCharacter.location.name}</Typography>
            <Button variant="contained" onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CharacterList;