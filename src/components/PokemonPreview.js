import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class PokemonPreview extends React.Component {
  static propTypes = {
    pokemon: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  }

  render () {
    const { pokemon } = this.props
    return (
      <Link to={'/view/' + pokemon.id }
            className="link dim grow mw4 bg-white ma2 pa3 shadow-1"
            style={{ minWidth: 200 }}>
        <img src={ pokemon.url } alt={ pokemon.name } />
        <div className='gray tc'>{ pokemon.name }</div>
      </Link>
    )
  }
}

export default PokemonPreview
