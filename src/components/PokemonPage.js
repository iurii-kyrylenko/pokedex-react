import React from 'react'
import PropTypes from 'prop-types'
// When using withRouter, you can have only 1 HoC per file
// http://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4
// import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import PokemonCard from './PokemonCard'

const PokemonQuery = gql`
  query PokemonQuery($id: ID!) {
    Pokemon(id: $id) {
      id
      name
      url
    }
  }
`

class PokemonPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
      Pokemon: PropTypes.object
    }).isRequired
  }
  
  constructor () {
    super()
    this.goBack = this.goBack.bind(this)
  }
  render () {
    const { data: { loading, error, Pokemon } } = this.props
    if (loading) {
      return (<div>Loading...</div>)
    }
    if (error) {
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <PokemonCard pokemon={ Pokemon } handleCancel={ this.goBack } />
    )
  }
  goBack () {
    this.props.history.replace('/')
  }
}

const PokemonPageWithQuery = graphql(PokemonQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.match.params.pokemonId
    }
  })
// })(withRouter(PokemonPage))
})(PokemonPage)

export default PokemonPageWithQuery
