import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import {BsDot} from 'react-icons/bs'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'

const timeSince = date => {
  const now = new Date()
  const publishedDate = new Date(date)
  const seconds = Math.floor((now - publishedDate) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) return `${interval} years ago`

  interval = Math.floor(seconds / 2592000)
  if (interval > 1) return `${interval} months ago`

  interval = Math.floor(seconds / 86400)
  if (interval > 1) return `${interval} days ago`

  interval = Math.floor(seconds / 3600)
  if (interval > 1) return `${interval} hours ago`

  interval = Math.floor(seconds / 60)
  if (interval > 1) return `${interval} minutes ago`

  return `${Math.floor(seconds)} seconds ago`
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingVideoList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getTrendingVideo()
  }

  getTrendingVideo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: eachVideo.published_at,
        channelName: eachVideo.channel.name,
        channelLogoUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        trendingVideoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideoList} = this.state
    return (
      <div className="trending-videos-main-container">
        <div className="trending-banner-container">
          <div className="icon-card">
            <HiFire className="trending-icon-style" />
          </div>
          <h1 className="trending-title">Trending</h1>
        </div>
        <ul className="trending-videos-list">
          {trendingVideoList.map(eachTrendVideo => (
            <li
              key={eachTrendVideo.id}
              className="trending-video-list-item-main"
            >
              <Link
                to={`/videoitem/${eachTrendVideo.id}`}
                className="trending-link-style"
              >
                <img
                  src={eachTrendVideo.thumbnailUrl}
                  alt="thumbnail"
                  className="thumbnail-img-url"
                />
              </Link>
              <div>
                <p className="video-title-style">{eachTrendVideo.title}</p>
                <p>{eachTrendVideo.channelName}</p>
                <div className="view-time-card">
                  <p>{eachTrendVideo.viewsCount} views</p>
                  <BsDot />
                  <p>{timeSince(eachTrendVideo.publishedAt)}</p>
                </div>
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
        onClick={this.getTrendingVideo}
      >
        Retry
      </button>
    </div>
  )

  renderAllFunctionality = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
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

export default Trending
