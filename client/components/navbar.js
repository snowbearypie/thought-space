import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {useTrail, a, config} from 'react-spring'

function Trail({open, children, ...props}) {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: {mass: 2, tension: 50, friction: 16},
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: {opacity: 0, x: 20, height: 0}
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trail.map(({x, height, ...rest}, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <a.div style={{height}}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

const Navbar = ({handleClick, isLoggedIn}) => {
  const [open, set] = useState(true)
  return (
    <div className="navbar">
      <h1 className="navbar1">Thought-Space</h1>
      <nav>
        {isLoggedIn ? (
          <div className="navbar-buttons">
            {/* The navbar will show these links after you log in */}
            <Trail open={open} onClick={() => set(state => !state)}>
              <span className="navbar-animations">Welcome Back</span>
              <span className="navbar-animations">Traveler</span>
            </Trail>
            <Link to="/hubs">My Hubs</Link>
            <Link to="/">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="navbar-buttons">
            {/* The navbar will show these links before you log in */}
            <Trail open={open} onClick={() => set(state => !state)}>
              <span className="navbar-animations">Welcome</span>
              <span className="navbar-animations">Traveler</span>
            </Trail>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
