import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-main-container">
      <SideBar />
      <div className="not-found-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="not-found-img-style"
        />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you are requested could not be found
        </p>
      </div>
    </div>
  </>
)
export default NotFound
