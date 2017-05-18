import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql, compose } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : props.delete ? '#ba2626' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

class PokemonCard extends React.Component {

  static fragments = {
    pokemon: gql`
      fragment PokemonCardPokemon on Pokemon {
        id
        name
        url
      }
    `
  }

  static propTypes = {
    pokemon: propType(PokemonCard.fragments.pokemon).isRequired,
    handleCancel: PropTypes.func.isRequired,
    afterChange: PropTypes.func.isRequired,
    updatePokemon: PropTypes.func.isRequired,
    deletePokemon: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const { name, url } = props.pokemon
    this.state = { name, url }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render () {
    return (
      <div className="w-100 pa4 flex justify-center">
        <Card style={{ maxWidth: 400 }}>
          <input
            className="w-100 pa3 mv2"
            value={ this.state.name }
            placeholder="Name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />
          <input
            className="w-100 pa3 mv2"
            value={ this.state.url }
            placeholder="Image Url"
            onChange={ (e) => this.setState({ url: e.target.value }) }
          />
          <ImageContainer>
            { this.state.url &&
              <img src={ this.state.url } alt={ this.state.name } className="w-100 mv3 pa4" />
            }
          </ImageContainer>
          <div className='flex justify-between'>
            <Button delete onClick={ this.handleDelete }>Delete</Button>
            <Button onClick={ this.props.handleCancel }>Cancel</Button>
            { this.canUpdate
              ? <Button save onClick={ this.handleUpdate }>Update</Button>
              : <Button disabled>Update</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  get canUpdate () {
    return this.state.name && this.state.url &&
      (this.props.pokemon.name !== this.state.name || this.props.pokemon.url !== this.state.url)
  }

  handleUpdate () {
    const { id } = this.props.pokemon
    const { name, url } = this.state
    this.props.updatePokemon({ variables: { id, name, url } })
    .then(this.props.afterChange)
  }

  handleDelete () {
    const { id } = this.props.pokemon
    this.props.deletePokemon({ variables: { id } })
    .then(this.props.afterChange)
  }
}

const updatePokemon = gql`
  mutation updatePokemon($id: ID!, $name: String, $url: String) {
    updatePokemon(id: $id, name: $name, url: $url) {
      ...PokemonCardPokemon
    }
  }
  ${ PokemonCard.fragments.pokemon }
`

const deletePokemon = gql`
  mutation deletePokemon($id: ID!) {
    deletePokemon(id: $id) {
      id
    }
  }
`

const PokemonCardWithMutations = compose(
  graphql(updatePokemon, {
    name: 'updatePokemon'
  }),
  graphql(deletePokemon, {
    name: 'deletePokemon'
  })
)(PokemonCard)

export default PokemonCardWithMutations
