import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchHub} from '../../store/singleHub'
import {Link} from 'react-router-dom'
import AddNode from './AddNode'
import {deleteHub} from '../../store/hub'

class SingleHub extends Component {
  constructor() {
    super()
    this.state = {
      renderForm: false
    }
    this.renderFormChange = this.renderFormChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  renderFormChange() {
    if (this.state.renderForm) {
      this.setState({renderForm: false})
    }
    this.setState({renderForm: true})
  }

  handleDelete(evt) {
    evt.preventDefault()
    console.log(this.props)
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
        <button className="button" type="button" onClick={this.handleDelete}>
          Delete Hub
        </button>
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
