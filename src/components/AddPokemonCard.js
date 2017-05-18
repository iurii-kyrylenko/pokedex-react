import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'

const Button = styled.div`
  background-color: ${props => props.save ? '#2BC3A1' : ''};
  color: ${props => props.save ? 'white' : '#A3A3A3'};
  height: 48px;
  line-height: 1;
  font-size: 18px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 300;
  border-radius: 4px
`

const ImageContainer = styled.div`
  width: 100%;
  background-color: #F7F7F7;
  min-height: 250px;
  margin-bottom: 20px;
`

const Card = styled.div`
  background-color: white;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 20px;
`

const AddPokemonMutation = gql`
  mutation AddPokemon($trainerId: ID, $name: String, $url: String) {
    createPokemon(name: $name, url: $url, trainerId: $trainerId) {
      trainer {
        id
        ownedPokemons {
          id
        }
      }
    }
  }
`

class AddPokemonCard extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {
      name: '',
      url: ''
    }
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
              <img src={ this.state.url } alt={ this.state.name } className="w-100 mv3" />
            }
          </ImageContainer>
          <div className="flex justify-between">
            <Button onClick={ this.handleCancel }>Cancel</Button>
            { this.canSave
              ? <Button save onClick={ this.handleSave }>Save</Button>
              : <Button disabled>Save</Button>
            }
          </div>
        </Card>
      </div>
    )
  }

  get canSave () {
    return this.state.name && this.state.url
  }

  handleSave () {
    const { mutate } = this.props
    const { trainerId } = this.props.match.params
    const { name, url } = this.state
    mutate({
      variables: {
        trainerId,
        name,
        url
      }
    })
    .then(() => {
      this.props.history.replace('/')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  handleCancel () {
    this.props.history.replace('/')
  }
}

const AddPokemonCardWithMutation = graphql(AddPokemonMutation)(AddPokemonCard)

export default AddPokemonCardWithMutation
