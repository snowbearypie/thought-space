import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNode} from '../../store/singleNode'
import {Link} from 'react-router-dom'
import UpdateNode from './UpdateNode'
import {deleteNode} from '../../store/node'

class SingleNode extends Component {
  constructor() {
    super()
    this.state = {
      renderUpdateForm: false
    }
    this.renderUpdateFormChange = this.renderUpdateFormChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchNode(this.props.match.params.nodeId)
  }

  renderUpdateFormChange() {
    if (this.state.renderUpdateForm) {
      this.setState({renderUpdateForm: false})
    }
    this.setState({renderUpdateForm: true})
  }

  handleDelete(evt) {
    evt.preventDefault()
    const deletedNode = this.props.singleNode
    this.props.deleteNode(deletedNode)
  }

  render() {
    const node = this.props.singleNode || {}
    if (!node) {
      return <div>Loading...</div>
    }
    return (
      <div className="singleNode-container">
        <h3 className="singleNode-name">{node.name}</h3>
        <p className="singleNode-description">{node.description}</p>
        {this.state.renderUpdateForm ? (
          <UpdateNode node={node} nodeId={node.id} />
        ) : (
          <button type="button" onClick={this.renderUpdateFormChange}>
            Update Node
          </button>
        )}
        <button className="button" type="button" onClick={this.handleDelete}>
          Delete Node
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleNode: state.singleNode
})

const mapDispatchToProps = dispatch => ({
  fetchNode: id => dispatch(fetchNode(id)),
  deleteNode: node => dispatch(deleteNode(node))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleNode)
