import React from 'react'
import styled from 'styled-components'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PokemonPreview from './PokemonPreview'
import AddPokemonPreview from './AddPokemonPreview'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`

const TrainerQuery = gql`
  query TrainerQuery($name: String!) {
    Trainer(name: $name) {
      id
      name
      ownedPokemons {
        id
        name
        url
      }
    }
  }
`

class Pokedex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      Trainer: PropTypes.object
    }).isRequired
  }

  render () {
    const { data: { loading, error, Trainer } } = this.props
    if (loading) {
      return (<div>Loading...</div>)
    }
    if (error) {
      return (<div>An unexpected error occurred</div>)
    }
    const pokemons = Trainer.ownedPokemons
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Hey, { Trainer.name }, there are { pokemons.length } Pokemons in your pokedex
        </Title>
        <div className='flex flex-wrap justify-center center w-75'>
          <AddPokemonPreview trainerId={ Trainer.id } />
          {
            pokemons.map(pokemon => <PokemonPreview key={pokemon.id} pokemon={pokemon} />)
          }
        </div>
      </div>
    )
  }
}

const PokedexWithData = graphql(TrainerQuery, {
  options: {
    variables: {
      name: "Iurii Kyrylenko"
    }
  }
})(Pokedex)

export default PokedexWithData
