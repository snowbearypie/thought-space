import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useSpring, animated} from 'react-spring'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const animatedProps = useSpring({opacity: 1, from: {opacity: 0}, delay: 1500})
  return (
    <animated.div style={animatedProps}>Welcome back, {email}</animated.div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
