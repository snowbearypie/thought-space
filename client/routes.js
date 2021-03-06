import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import {
  UserHubs,
  HubNodes,
  SingleHub,
  SingleNode,
  AddHub,
  UpdateHub,
  LandingPage
} from './components/index'

import AnimationTest from './components/parallax-backgrounds/AnimationTest'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/test" component={AnimationTest} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/hubs" component={UserHubs} />
        <Route exact path="/hubs/add" component={AddHub} />
        <Route exact path="/hubs/:hubId" component={SingleHub} />
        <Route exact path="/nodes" component={HubNodes} />
        <Route exact path="/nodes/:nodeId" component={SingleNode} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/hubs" component={UserHubs} />
            <Route exact path="/hubs/add" component={AddHub} />
            <Route exact path="/hubs/:hubId" component={SingleHub} />
            <Route exact path="/hubs/:hubId/update" component={UpdateHub} />
            <Route exact path="/nodes" component={HubNodes} />
            <Route exact path="/nodes/:nodeId" component={SingleNode} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
