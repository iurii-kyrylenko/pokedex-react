import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class AddPokemonPreview extends React.Component {
  static propTypes = {
    trainerId: PropTypes.string.isRequired
  }

  render () {
    const { trainerId } = this.props
    return (
      <Link to={'/create/' + trainerId }
            className="link dim mw4 ma2 ba b--dashed bw3 b--silver flex justify-center items-center"
            style={{ minWidth: 200 }}>
        <div className='silver tc v-mid fw4 f1'>+</div>
      </Link>
    )
  }
}

export default AddPokemonPreview