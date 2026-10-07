import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

type PokemonDetails = {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    type: {
      name: string
    }
  }[]
}

function GalleryPage() {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([])
  const [selectedType, setSelectedType] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const requests = []

        for (let id = 1; id <= 151; id++) {
          requests.push(
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          )
        }

        const responses = await Promise.all(requests)

        const pokemonData = responses.map((response) => response.data)

        setPokemon(pokemonData)
      } catch {
        setError('Failed to load Pokémon gallery.')
      } finally {
        setLoading(false)
      }
    }

    loadPokemon()
  }, [])

  const filteredPokemon =
    selectedType === 'all'
      ? pokemon
      : pokemon.filter((item) =>
          item.types.some((typeInfo) => typeInfo.type.name === selectedType),
        )

  if (loading) {
    return <p>Loading gallery...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Pokémon Gallery</h1>

      <div className="gallery-controls">
        <label htmlFor="type-filter">Filter by type:</label>

        <select
          id="type-filter"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
        </select>
      </div>

      <div className="pokemon-gallery">
        {filteredPokemon.map((item) => (
          <Link
            key={item.id}
            to={`/pokemon/${item.id}`}
            className="pokemon-card"
          >
            <img
              src={item.sprites.other['official-artwork'].front_default}
              alt={item.name}
            />

            <h2>{item.name}</h2>

            <p>#{item.id}</p>

            <div className="pokemon-types">
              {item.types.map((typeInfo) => (
                <span key={typeInfo.type.name}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GalleryPage