import React, { useState } from 'react';
import './App.css';
import ListDigimons from './components/List';
import FormDigiPoke from './components/Form';
import { Pokemon, Digimon } from './types';

function App() {
  const [digimons, setDigimons] = useState<Array<Digimon>>([]);
  const handleNewDigimon = (newDigimon: Digimon): void => {
    setDigimons(digimons => [...digimons, newDigimon]);
  }

  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const handleNewPokemon = (newPokemon: Pokemon): void => {
    setPokemons(pokemons => [...pokemons, newPokemon]);
  }

  return (
    <div className="App">
      <h1>Find your Digimon or Pokemon here</h1>
      <ListDigimons digimons={digimons} pokemons={pokemons} />
      <FormDigiPoke onNewDigimon={handleNewDigimon} onNewPokemon={handleNewPokemon} />
    </div>
  );
}

export default App;
