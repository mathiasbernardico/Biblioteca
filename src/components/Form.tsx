import React, { useState, useEffect } from "react";
import ListDigimons from "./List";
import { Digimon, Pokemon, ResponseDigimonApi, ResponsePokemonApi } from "../types";

interface FormProps {
    onNewDigimon: (newDigimon: Digimon) => void;
    onNewPokemon: (newPokemon: Pokemon) => void;
}

const FormDigiPoke = ({ onNewDigimon, onNewPokemon }: FormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [digimons, setDigimons] = useState<Array<Digimon>>([]);
    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    useEffect(() => {
        if (!formSubmitted) return;

        if (inputValue.trim() === '') {
            return;
        }

        const fetchPokemon = (): Promise<ResponsePokemonApi> => {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
                .then(res => res.json())
        }

        fetchPokemon()

            .then((apiResponse: ResponsePokemonApi) => {
                const pokemonName = apiResponse.name;
                const pokemonId = apiResponse.id;
                const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                const newPokemon: Pokemon = {
                    name: pokemonName,
                    img: pokemonImg
                };
                onNewPokemon(newPokemon);
            })
            .catch(error => {
                console.error('Error fetching Pokemon data:', error);
            })
            .finally(() => {
                setInputValue('');
                setFormSubmitted(false);
            });
    }, [formSubmitted, inputValue, onNewPokemon]);

    useEffect(() => {
        if (!formSubmitted) return;

        const fetchDigi = (): Promise<ResponseDigimonApi> => {
            return fetch(`https://digimon-api.vercel.app/api/digimon/name/${inputValue}`)
                .then(res => res.json());
        };

        fetchDigi()
            .then((apiResponse: ResponseDigimonApi) => {
                if (apiResponse.length === 0) {
                    console.error('No se encontró ningún Digimon con el nombre:', {inputValue});
                    return;
                }

                // Verificar si la respuesta de la API contiene datos válidos antes de agregar el Digimon a la lista
                const digimonFromApi = apiResponse[0];
                if (digimonFromApi && digimonFromApi.img && digimonFromApi.level && digimonFromApi.name) {
                    // Convertir la respuesta de la API en un Digimon
                    const newDigimon: Digimon = {
                        img: digimonFromApi.img,
                        level: digimonFromApi.level,
                        name: digimonFromApi.name,
                    };
                    onNewDigimon(newDigimon);
                } else {
                    console.error('La respuesta de la API no contiene datos válidos:', digimonFromApi);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setInputValue('');
                setFormSubmitted(false);
            });
    }, [formSubmitted, inputValue, onNewDigimon]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValue} name="name" type="text" placeholder="Input the name" />
                <button type="submit">Search</button>
            </form>
            {digimons.length > 0 && (
                <ListDigimons digimons={digimons} />
            )}
        </div>
    );
}

export default FormDigiPoke;
