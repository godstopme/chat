import React, {Component} from 'react'
import {connect} from 'react-redux'
import Channel from './channel'

class MainPage extends Component {
  render() {
    return (
     <Channel/>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(MainPage)