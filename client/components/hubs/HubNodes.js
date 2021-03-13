import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNodes} from '../../store/node'
import {Link} from 'react-router-dom'

class HubNodes extends Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    this.props.loadNodes()
  }
  render() {
    return (
      <div className="node-container">
        {this.props.nodes.map(node => (
          <div className="node-card" key={node.id}>
            <Link to={`/nodes/${node.id}`}>
              <h2 className="node-name">{node.name}</h2>
            </Link>
            <hr />
            <h4 className="node-description">{node.description}</h4>
            <br />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadNodes: () => dispatch(getNodes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubNodes)
