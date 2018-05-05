import React, {Component} from 'react'
import {connect} from 'react-redux'
import Channel from './channel'
import {authenticateUser} from '../actions/login'

class MainPage extends Component {
  componentDidMount() {
    this.props.authenticate()
  }

  render() {
    return (
     <Channel/>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticateUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)