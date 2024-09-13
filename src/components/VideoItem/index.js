import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player' // Import ReactPlayer
import Header from '../Header'
import SideBar from '../SideBar'
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

class VideoItem extends Component {
  state = {
    videoDescription: '',
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
    isSaved: false,
  }

  componentDidMount = () => {
    this.getSpecificVideo()
  }

  getFormattedData = data => ({
    description: data.description,
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    videoUrl: data.video_url,
    viewsCount: data.view_count,
    channelName: data.channel.name,
    channelProfileImg: data.channel.profile_image_url,
    subscriptionCount: data.channel.subscriber_count,
  })

  getSpecificVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = this.getFormattedData(fetchedData.video_details)
      this.setState({
        videoDescription: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="video-loader-container">
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
        onClick={this.getSpecificVideo}
      >
        Retry
      </button>
    </div>
  )

  handleLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  handleDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  handleSaved = () =>
    this.setState(prevState => ({isSaved: !prevState.isSaved}))

  videoDetail = () => {
    const {videoDescription, isDisliked, isLiked, isSaved} = this.state
    const {
      videoUrl,
      title,
      viewsCount,
      publishedAt,
      channelProfileImg,
      description,
      channelName,
      subscriptionCount,
    } = videoDescription

    return (
      <div>
        <ReactPlayer url={videoUrl} width="100%" height="450px" />
        <p>{title}</p>
        <div className="views-like-dislike-container">
          <div className="views-time-card">
            <p>{viewsCount} views</p>
            <BsDot className="dot-style" />
            <p>{timeSince(publishedAt)}</p>
          </div>
          <div className="likes-container">
            <button
              type="button"
              className={`like-dislike-card ${isLiked ? 'liked' : ''}`}
              onClick={this.handleLike}
            >
              <BiLike />
              <p>Like</p>
            </button>
            <button
              type="button"
              className={`like-dislike-card ${isDisliked ? 'liked' : ''}`}
              onClick={this.handleDislike}
            >
              <BiDislike />
              <p>Dislike</p>
            </button>
            <button
              type="button"
              className={`like-dislike-card ${isSaved ? 'liked' : ''}`}
              onClick={this.handleSaved}
            >
              <MdPlaylistAdd />
              <p>Save</p>
            </button>
          </div>
        </div>
        <div className="channel-detail-container">
          <img
            src={channelProfileImg}
            alt="channel logo"
            className="channel-logo-style-v"
          />
          <div>
            <div>
              <p className="channelName-style">{channelName}</p>
              <p>{subscriptionCount}</p>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderVideoActivity = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.videoDetail()
      case apiStatusConstants.loader:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="VideoItem-main-container">
          <SideBar />
          <div className="video-card">{this.renderVideoActivity()}</div>
        </div>
      </>
    )
  }
}

export default VideoItem
