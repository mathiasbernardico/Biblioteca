import React from "react";
import { Digimon, Pokemon } from "../types";

interface PropsDigi {
    digimons?: Array<Digimon>;
    pokemons?: Array<Pokemon>;
}

const ListDigimons = ({ digimons, pokemons }: PropsDigi) => {
    return (
        <ul>
            {digimons && digimons.map(digi => (
                <li key={digi.name}>
                    <h2>My name is {digi.name}</h2>
                    <img src={digi.img} alt={`Image of ${digi.name}`} />
                    <p>I am level {digi.level}</p>
                </li>
            ))}
            {pokemons && pokemons.map(poke => (
                <li key={poke.name}>
                    <h2>My name is {poke.name}</h2>
                    <img src={poke.img} alt={`Image of ${poke.name}`} />
                    <br />
                    <br />
                    <br />
                </li>
            ))}
        </ul>
    );
}

export default ListDigimons;