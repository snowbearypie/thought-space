import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHub} from '../../store/singleHub'
import {Link} from 'react-router-dom'
import AddNode from './AddNode'
import UpdateHub from './UpdateHub'
import {deleteHub} from '../../store/hub'

class SingleHub extends Component {
  constructor() {
    super()
    this.state = {
      renderAddForm: false,
      renderUpdateForm: false
    }
    this.renderAddFormChange = this.renderAddFormChange.bind(this)
    this.renderUpdateFormChange = this.renderUpdateFormChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  renderAddFormChange() {
    if (this.state.renderAddForm) {
      this.setState({renderAddForm: false})
    }
    this.setState({renderAddForm: true})
  }

  renderUpdateFormChange() {
    if (this.state.renderUpdateForm) {
      this.setState({renderUpdateForm: false})
    }
    this.setState({renderUpdateForm: true})
  }

  handleDelete(evt) {
    evt.preventDefault()
    const deletedHub = this.props.singleHub
    this.props.deleteHub(deletedHub)
  }

  componentDidMount() {
    this.props.fetchHub(this.props.match.params.hubId)
  }

  render() {
    const hub = this.props.singleHub || {}
    const nodes = this.props.singleHub.nodes || []
    const author = hub.user || {}
    if (!hub) {
      return <div>Loading...</div>
    }
    return (
      <div className="singleHub-container">
        <div className="hub-card">
          <h3 className="singleHub-name">{hub.name}</h3>
          <h4 className="singleHub-name">By: {author.displayName}</h4>
          <p className="singleHub-description">{hub.description}</p>
          <h2 className="node-title">Nodes:</h2>
          {nodes.map(node => (
            <div className="node-card" key={node.id}>
              <Link to={`/nodes/${node.id}`}>
                <h3 className="node-name">{node.name}</h3>
              </Link>
            </div>
          ))}
          {this.state.renderAddForm ? (
            <AddNode hubId={hub.id} />
          ) : (
            <button type="button" onClick={this.renderAddFormChange}>
              Add Node
            </button>
          )}
          {this.state.renderUpdateForm ? (
            <UpdateHub hub={hub} hubId={hub.id} />
          ) : (
            <button type="button" onClick={this.renderUpdateFormChange}>
              Update Hub
            </button>
          )}
          <button className="button" type="button" onClick={this.handleDelete}>
            Delete Hub
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleHub: state.singleHub
})

const mapDispatchToProps = dispatch => ({
  fetchHub: id => dispatch(fetchHub(id)),
  deleteHub: hub => dispatch(deleteHub(hub))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleHub)
