import React, {Component} from 'react'
import {addNode} from '../../store/node'
import {me} from '../../store/user'
import {connect} from 'react-redux'
import NodeForm from './NodeForm'

const defaultState = {
  name: '',
  description: '',
  nodeTag: '',
  voteCount: 0,
  isPrivate: false,
  userId: null
}

class AddHub extends Component {
  constructor(props) {
    super()
    this.state = {
      ...defaultState,
      hubId: props.hubId
    }
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
    const defaultHub = defaultState
    await this.props.addNode({...this.state}).then(this.setState({defaultHub}))
  }

  render() {
    console.log(this.props)
    return (
      <NodeForm
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
      addNode: node => dispatch(addNode(node)),
      getUser: () => dispatch(me())
    }
  }
)(AddHub)
