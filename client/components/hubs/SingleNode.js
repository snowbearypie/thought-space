import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNode} from '../../store/singleNode'
import {Link} from 'react-router-dom'

class SingleNode extends Component {
  // constructor() {
  //   super()
  //   }
  // }
  componentDidMount() {
    this.props.fetchNode(this.props.match.params.nodeId)
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
    const node = this.props.singleNode || {}
    console.log(node)
    if (!node) {
      return <div>Loading...</div>
    }
    return (
      <div className="singleNode-container">
        <h3 className="singleNode-name">{node.name}</h3>
        <p className="singleNode-description">{node.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleNode: state.singleNode
})

const mapDispatchToProps = dispatch => ({
  fetchNode: id => dispatch(fetchNode(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleNode)
