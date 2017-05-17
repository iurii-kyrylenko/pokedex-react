import React from 'react'
import { gql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
  max-width: 400px;
  margin-top: 50px;
`

class PokemanCardHeader extends React.Component {

  static fragments = {
    pokemon: gql`
      fragment PokemonCardHeaderPokemon on Pokemon {
        name
        trainer {
          name
        }
      }
    `
  }

  static propTypes = {
    pokemon: propType(PokemanCardHeader.fragments.pokemon).isRequired
  }
 
  render () {
    const { name, trainer } = this.props.pokemon
    return (
      <div className='w-100 flex justify-center'>
        <Title>{ name } owned by { trainer.name }</Title>
      </div>
    )
  }
}

export default PokemanCardHeader
