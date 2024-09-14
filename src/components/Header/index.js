import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import ReactPopup from '../ReactPopup'
import './index.css'

const Header = () => (
  <nav className="navbar-main-container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website logo"
        className="header-logo-style"
      />
    </Link>
    <div className="logout-container">
      <FaMoon className="mode-icon-style" />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt="profile"
        className="profile-icon-style"
      />
      <ReactPopup />
    </div>
  </nav>
)

export default withRouter(Header)
