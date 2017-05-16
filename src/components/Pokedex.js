import React from 'react'
import styled from 'styled-components'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`

const TrainerQuery = gql`
  query TrainerQuery {
    Trainer(name: "Iurii Kyrylenko") {
      id
      name
    }
  }
`

class Pokedex extends React.Component {
  render () {
    const { data: { loading, error, Trainer } } = this.props
    if (loading) {
      return (<div>Loading...</div>)
    }
    if (error) {
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Hey, { Trainer.name }, there are 0 Pokemons in your pokedex
        </Title>
      </div>
    )
  }
}

Pokedex.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.boolean,
    error: PropTypes.object,
    Trainer: PropTypes.object
  }).isRequired
}

const PokedexWithData = graphql(TrainerQuery)(Pokedex)

export default PokedexWithData
