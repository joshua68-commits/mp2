import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

type PokemonDetails = {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
}

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load Pokémon details.')
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!pokemon) {
    return <p>Pokémon not found.</p>
  }

  const handlePrevious = () => {
    if (pokemon.id > 1) {
      navigate(`/pokemon/${pokemon.id - 1}`)
    }
  }

  const handleNext = () => {
    if (pokemon.id < 151) {
      navigate(`/pokemon/${pokemon.id + 1}`)
    }
  }

  return (
    <div>
      <Link to="/">← Back to List</Link>

      <h1>{pokemon.name}</h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <p>ID: #{pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <h2>Types</h2>
      <ul>
        {pokemon.types.map((item) => (
          <li key={item.type.name}>{item.type.name}</li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((item) => (
          <li key={item.ability.name}>{item.ability.name}</li>
        ))}
      </ul>

      <div className="detail-navigation">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={pokemon.id === 1}
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={pokemon.id === 151}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

export default DetailPage