import {Link} from 'react-router-dom'
import {Component} from 'react'
import {IoIosClose, IoIosSearch} from 'react-icons/io'
import {BsDot} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

// Helper function to calculate time difference
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

class Home extends Component {
  state = {
    userSearch: '',
    videosList: [],
    isBanner: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {userSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${userSearch}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchedData = await fetch(apiUrl, option)
    const response = await fetchedData.json()
    try {
      const updateData = response.videos.map(eachvideo => ({
        id: eachvideo.id,
        publishedAt: eachvideo.published_at,
        thumbnailUrl: eachvideo.thumbnail_url,
        title: eachvideo.title,
        viewCount: eachvideo.view_count,
        channelName: eachvideo.channel.name,
        channelprofileImg: eachvideo.channel.profile_image_url,
      }))
      this.setState({
        videosList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  // if video not found then try again container
  retryContainer = () => this.setState({userSearch: ''})

  // remove Banner card
  removeBanner = () => this.setState({isBanner: false})

  noSearchFound = () => (
    <div className="no-search-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-video-img-style"
      />
      <h1 className="contact-title">No Search results found</h1>
      <p className="no-found-description">
        Try different key words or remove search filter
      </p>
      <button
        type="button"
        className="retry-btn-style"
        onClick={this.retryContainer}
      >
        Retry
      </button>
    </div>
  )

  userSearchedInput = event => {
    this.setState({userSearch: event.target.value})
  }

  videosContainer = () => {
    const {videosList, userSearch, isBanner} = this.state

    // Filter videos based on the search input
    const filteredVideos = videosList.filter(eachvideo =>
      eachvideo.title.toLowerCase().includes(userSearch.toLowerCase()),
    )

    // Conditionally render based on whether filteredVideos has any results
    return (
      <div className="videos-container" data-testid="banner">
        {isBanner ? (
          <div className="banner-container">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
                className="header-logo-style"
              />
              <p className="buy-title">
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button
                type="button"
                className="get-it-btn-style"
                data-testid="close"
              >
                GET IT NOW
              </button>
            </div>
            <IoIosClose
              className="close-icon-style"
              onClick={this.removeBanner}
            />
          </div>
        ) : null}

        <div className="search-videos-container">
          <div className="search-card">
            <input
              type="search"
              placeholder="Search"
              className="search-input-style"
              value={userSearch}
              onChange={this.userSearchedInput}
            />
            <button
              type="button"
              className="search-btn-style"
              data-testid="searchButton"
            >
              <IoIosSearch className="search-icon-style" />
            </button>
          </div>

          {filteredVideos.length > 0 ? (
            <ul className="videos-order-list">
              {filteredVideos.map(eachvideo => (
                <li key={eachvideo.id} className="list-item-style">
                  <Link
                    to={`/videoitem/${eachvideo.id}`}
                    className="link-style"
                  >
                    <img
                      src={eachvideo.thumbnailUrl}
                      alt="video thumbnail"
                      className="thumbnail-img-style"
                    />
                  </Link>
                  <div className="video-description-card">
                    <img
                      src={eachvideo.channelprofileImg}
                      alt="channel logo"
                      className="chanal-logo-style"
                    />
                    <div className="video-detail-card">
                      <p>{eachvideo.title}</p>
                      <p className="chanal-name-style">
                        {eachvideo.channelName}
                      </p>
                      <div className="views-card">
                        <p>{eachvideo.viewCount} views</p>
                        <BsDot className="dot-style" />
                        <p>{timeSince(eachvideo.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            this.noSearchFound()
          )}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="video-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
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
        onClick={this.getAllVideos}
      >
        Retry
      </button>
    </div>
  )

  renderAllFunctionality = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.videosContainer()
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
        <div className="home-route-main-container">
          <SideBar />
          {this.renderAllFunctionality()}
        </div>
      </>
    )
  }
}
export default Home
