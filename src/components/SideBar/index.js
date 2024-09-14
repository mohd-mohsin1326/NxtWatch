import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import './index.css'

class SideBar extends Component {
  state = {selectedIcon: ''}

  handleIconClick = iconName => {
    this.setState({selectedIcon: iconName})
  }

  render() {
    const {selectedIcon} = this.state

    return (
      <div className="selection-container">
        <div className="all-link-container">
          <Link
            to="/"
            className="link-style"
            onClick={() => this.handleIconClick('Home')}
          >
            <button
              className={`selection-card ${
                selectedIcon === 'Home' ? 'selected' : ''
              }`}
              type="button"
              data-testid="home"
            >
              <MdHome
                className={`selection-icon ${
                  selectedIcon === 'Home' ? 'icon-selected' : ''
                }`}
              />
              <p>Home</p>
            </button>
          </Link>

          <Link
            to="/trending"
            className="link-style"
            onClick={() => this.handleIconClick('Trending')}
          >
            <button
              className={`selection-card ${
                selectedIcon === 'Trending' ? 'selected' : ''
              }`}
              type="button"
              data-testid="trending"
            >
              <HiFire
                className={`selection-icon ${
                  selectedIcon === 'Trending' ? 'icon-selected' : ''
                }`}
              />
              <p>Trending</p>
            </button>
          </Link>

          <Link
            to="/gaming"
            className="link-style"
            onClick={() => this.handleIconClick('Gaming')}
          >
            <button
              className={`selection-card ${
                selectedIcon === 'Gaming' ? 'selected' : ''
              }`}
              type="button"
              data-testid="gaming"
            >
              <SiYoutubegaming
                className={`selection-icon ${
                  selectedIcon === 'Gaming' ? 'icon-selected' : ''
                }`}
              />
              <p>Gaming</p>
            </button>
          </Link>

          <Link
            to="/saved-videos"
            className="link-style"
            onClick={() => this.handleIconClick('Saved videos')}
          >
            <button
              className={`selection-card ${
                selectedIcon === 'Saved videos' ? 'selected' : ''
              }`}
              type="button"
              data-testid="saved videos"
            >
              <MdPlaylistAdd
                className={`selection-icon ${
                  selectedIcon === 'Saved videos' ? 'icon-selected' : ''
                }`}
              />
              <p>Saved videos</p>
            </button>
          </Link>
        </div>
        <div>
          <p className="contact-title">CONTACT US</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="contact-logo-style"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="contact-logo-style"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="contact-logo-style"
          />
          <p className="contact-description">
            Enjoy! Now to see your channels and recommendations!
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SideBar)
