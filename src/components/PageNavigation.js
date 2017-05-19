import React from 'react'
import PropTypes from 'prop-types'

export default class PageNavigation extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isPrevious: PropTypes.bool.isRequired,
  }

  render () {
    return (
      <div
        onClick={ this.props.onClick }
        style={{ minWidth: 200 }}
        className='link dim mw4 ma2 flex justify-center items-center'
      >
        <div className='silver tc v-mid fw4 f1 pointer'>{ this.props.isPrevious ? '<' : '>' }</div>
      </div>
    )
  }
}
