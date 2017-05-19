import React from 'react'
import styled from 'styled-components'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PokemonPreview from './PokemonPreview'
import AddPokemonPreview from './AddPokemonPreview'
import PageNavigation from './PageNavigation'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`

const TrainerQuery = gql`
  query TrainerQuery($name: String!, $skip: Int!, $first: Int!) {
    Trainer(name: $name) {
      id
      name
      ownedPokemons(skip: $skip, first: $first) {
        id
        name
        url
      }
      _ownedPokemonsMeta {
        count
      }
    }
  }
`

const POKEMONS_PER_PAGE = 3

class Pokedex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      Trainer: PropTypes.object
    }).isRequired
  }

  constructor (props) {
    super(props)
    this._nextPage = this._nextPage.bind(this)
    this._previousPage = this._previousPage.bind(this)
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
    const total = Trainer._ownedPokemonsMeta.count
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Hey, { Trainer.name }, there are { total } Pokemons in your pokedex
        </Title>
        <div className='flex flex-wrap justify-center center w-75'>
          <AddPokemonPreview trainerId={ Trainer.id } />
          { !this._isFirstPage && <PageNavigation onClick={ this._previousPage } isPrevious={ true } /> }
          {
            pokemons.map(pokemon => <PokemonPreview key={pokemon.id} pokemon={pokemon} />)
          }
          { !this._isLastPage && <PageNavigation onClick={ this._nextPage } isPrevious={ false } /> }
        </div>
      </div>
    )
  }

  _nextPage () {
    this.props.history.replace(`/${+this.props.match.params.page + 1}`)
  }

  _previousPage () {
    this.props.history.replace(`/${+this.props.match.params.page - 1}`)
  }

  get _isFirstPage () {
    // eslint-disable-next-line
    return (this.props.match.params.page == 1)
  }

  get _isLastPage () {
    return (this.props.match.params.page * POKEMONS_PER_PAGE >=
      this.props.data.Trainer._ownedPokemonsMeta.count)
  }
}

const PokedexWithData = graphql(TrainerQuery, {
  options: (ownProps) => ({
    variables: {
      name: 'Iurii Kyrylenko',
      skip: (ownProps.match.params.page - 1) * POKEMONS_PER_PAGE,
      first: POKEMONS_PER_PAGE
    },
    fetchPolicy: 'network-only'
  })
})(Pokedex)

export default PokedexWithData
