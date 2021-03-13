import React, {Component} from 'react'
import {addHub} from '../../store/hub'
import {me} from '../../store/user'
import {connect} from 'react-redux'
import HubForm from './HubForm'

const defaultState = {
  name: '',
  description: '',
  hubTag: '',
  voteCount: 0,
  isPrivate: false,
  userId: null
}

class AddHub extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUser()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.setState({
      userId: this.props.user.id
    })
    if (this.state.isPrivate === 'public') {
      this.state.isPrivate = false
    }
    this.state.isPrivate = true
    const defaultHub = defaultState
    await this.props.addHub({...this.state}).then(this.setState({defaultHub}))
  }

  render() {
    return (
      <HubForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  state => {
    return {user: state.user}
  },
  dispatch => {
    return {
      addHub: hub => dispatch(addHub(hub)),
      getUser: () => dispatch(me())
    }
  }
)(AddHub)
