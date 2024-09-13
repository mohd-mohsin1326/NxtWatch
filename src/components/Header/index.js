import {Component} from 'react'
import {FaMoon} from 'react-icons/fa'
import ReactPopup from '../ReactPopup'
import './index.css'

class Header extends Component {
  state = {showPopup: false}

  handleLogoutClick = () => {
    this.setState({showPopup: true})
  }

  handleConfirm = () => {
    this.handleLogout()
  }

  handleCancel = () => {
    this.setState({showPopup: false})
  }

  handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out')
    // Redirect or perform additional logout actions
  }

  render() {
    const {showPopup} = this.state
    return (
      <div className="navbar-main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="watch logo"
          className="header-logo-style"
        />
        <div className="logout-container">
          <FaMoon className="mode-icon-style" />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="profile-icon-style"
          />
          <button
            type="button"
            className="logout-btn-style"
            onClick={this.handleLogoutClick}
          >
            Logout
          </button>
          {showPopup && (
            <ReactPopup
              onConfirm={this.handleConfirm}
              onCancel={this.handleCancel}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Header
