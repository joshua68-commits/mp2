import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Pokemon = {
  name: string
  url: string
}

type SortProperty = 'name' | 'id'
type SortOrder = 'asc' | 'desc'

function ListPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const [sortProperty, setSortProperty] = useState<SortProperty>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => {
        setPokemon(response.data.results)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load Pokémon.')
        setLoading(false)
      })
  }, [])

  const getPokemonId = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
  }

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    let comparison = 0

    if (sortProperty === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortProperty === 'id') {
      comparison = getPokemonId(a.url) - getPokemonId(b.url)
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Pokémon List</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={sortProperty}
        onChange={(event) =>
          setSortProperty(event.target.value as SortProperty)
        }
      >
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>

      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value as SortOrder)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <ul>
        {sortedPokemon.map((item) => (
            <li key={item.name}>
                <Link to={`/pokemon/${getPokemonId(item.url)}`}>
                    #{getPokemonId(item.url)} {item.name}
                </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ListPage