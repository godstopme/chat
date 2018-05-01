import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChatRoom from './ChatRoom'

class MainPage extends Component {
  render() {
    return (
     <ChatRoom/>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(MainPage)