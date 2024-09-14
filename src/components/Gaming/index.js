import {Link} from 'react-router-dom'
import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gameVideoList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchedData = await fetch(apiUrl, option)
    const response = await fetchedData.json()
    try {
      const updatedData = response.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewsCount: eachVideo.view_count,
      }))
      this.setState({
        gameVideoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingVideos = () => {
    const {gameVideoList} = this.state
    return (
      <div className="gaming-main-container">
        <div className="trending-banner-container">
          <div className="icon-card">
            <SiYoutubegaming className="trending-icon-style" />
          </div>
          <h1 className="trending-title">Gaming</h1>
        </div>
        <ul className="Gaming-videos-list">
          {gameVideoList.map(eachGameVideo => (
            <li key={eachGameVideo.id} className="gmaing-video-list-item">
              <Link
                to={`/videoitem/${eachGameVideo.id}`}
                className="link-style"
              >
                <img
                  src={eachGameVideo.thumbnailUrl}
                  alt="thumbnail"
                  className="game-image-style"
                />
              </Link>
              <p>{eachGameVideo.title}</p>
              <div className="view-count-card">
                <p>{eachGameVideo.viewsCount}</p>
                <p>Watching Worldwide</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="video-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failure-view-container-main">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-img-style"
      />
      <h1 className="contact-title">Oops! Something Went Wrong</h1>
      <p className="no-found-description">
        We are having some trouble to complete your request
      </p>
      <p className="no-found-description">Please try again.</p>
      <button
        type="button"
        className="retry-btn-style"
        onClick={this.getGamingVideo}
      >
        Retry
      </button>
    </div>
  )

  renderAllFunctionality = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="trending-video-container">
          <SideBar />
          {this.renderAllFunctionality()}
        </div>
      </>
    )
  }
}

export default Gaming
