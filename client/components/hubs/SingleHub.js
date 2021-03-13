import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHub} from '../../store/singleHub'
import {Link} from 'react-router-dom'
import AddNode from './AddNode'

class SingleHub extends Component {
  constructor() {
    super()
    this.state = {
      renderForm: false
    }
    this.renderFormChange = this.renderFormChange.bind(this)
  }
  renderFormChange() {
    if (this.state.renderForm) {
      this.setState({renderForm: false})
    }
    this.setState({renderForm: true})
  }
  componentDidMount() {
    this.props.fetchHub(this.props.match.params.hubId)
  }
  // handleChange(evt) {
  //   this.setState({
  //     [evt.target.name]: evt.target.value
  //   })
  // }
  // handleSubmit(evt) {
  //   evt.preventDefault()
  // }
  render() {
    const hub = this.props.singleHub || {}
    const nodes = this.props.singleHub.nodes || []
    const author = hub.user || {}
    console.log(hub)
    if (!hub) {
      return <div>Loading...</div>
    }
    return (
      <div className="singleHub-container">
        <h3 className="singleHub-name">{hub.name}</h3>
        <h4>By: {author.displayName}</h4>
        <p className="singleHub-description">{hub.description}</p>
        {nodes.map(node => (
          <div className="node-card" key={node.id}>
            <h2>Nodes:</h2>
            <Link to={`/nodes/${node.id}`}>
              <h3 className="node-name">{node.name}</h3>
            </Link>
          </div>
        ))}
        {this.state.renderForm ? (
          <AddNode hubId={hub.id} />
        ) : (
          <button type="button" onClick={this.renderFormChange}>
            Add Node
          </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleHub: state.singleHub
})

const mapDispatchToProps = dispatch => ({
  fetchHub: id => dispatch(fetchHub(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleHub)
