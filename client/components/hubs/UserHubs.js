import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHubs, addHub} from '../../store/hub'
import {HubForm} from './HubForm'
import {Link} from 'react-router-dom'

class UserHubs extends Component {
  componentDidMount() {
    this.props.loadHubs()
  }

  render() {
    const hubs = this.props.hubs || []
    const nodes = hubs.nodes || []
    console.log(hubs)
    if (!hubs) {
      return <div>Loading...</div>
    }
    return (
      <div className="hub-container">
        {this.props.hubs.map(hub => (
          <div className="hub-card" key={hub.id}>
            <Link to={`/hubs/${hub.id}`}>
              <h2 className="hub-name">{hub.name}</h2>
            </Link>
            <br />
            <h4 className="hub-description">{hub.description}</h4>
            {nodes.map(node => (
              <div className="node-card" key={node.id}>
                <h2>Nodes:</h2>
                <Link to={`/nodes/${node.id}`}>
                  <h3 className="node-name">{node.name}</h3>
                </Link>
              </div>
            ))}
            <hr />
          </div>
        ))}
        <Link to="/hubs/add">
          <button className="button" type="button">
            Add Hub
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    hubs: state.hubs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadHubs: () => dispatch(getHubs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHubs)
