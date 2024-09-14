import {Link} from 'react-router-dom'
import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
import {BsDot} from 'react-icons/bs'
import Header from '../Header'
import SideBar from '../SideBar'
import SavedVideosContext from '../../Context/SavedVideosContext'
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

class SavedVideos extends Component {
  noSavedVideo = () => (
    <div className="no-videos-found-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="saved-img-style"
      />
      <h1>No saved videos found</h1>
      <p>Save your videos by clicking a button</p>
      <p>You can save your videos while watching them</p>
    </div>
  )

  rendersavedVideosList = () => {
    const {savedVideosList} = this.context

    return (
      <ul className="saved-videos-main-list">
        {savedVideosList.map(video => (
          <li key={video.id} className="saved-video-lists">
            <Link to={`/videoitem/${video.id}`} className="saved-video-image">
              <img src={video.thumbnailUrl} alt={video.title} />
            </Link>
            <div>
              <p>{video.title}</p>
              <p>{video.channelName}</p>
              <div className="saved-views-time-card">
                <p>{video.viewsCount}</p>
                <BsDot />
                <p>{timeSince(video.publishedAt)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {savedVideosList} = this.context

    return (
      <>
        <Header />
        <div className="saved-videos-main-container">
          <SideBar />
          <div className="render-saved-videos-card">
            <div className="trending-banner-container">
              <div className="icon-card">
                <MdPlaylistAdd className="trending-icon-style" />
              </div>
              <h1 className="trending-title">Saved Videos</h1>
            </div>
            {savedVideosList && savedVideosList.length > 0
              ? this.rendersavedVideosList()
              : this.noSavedVideo()}
          </div>
        </div>
      </>
    )
  }
}

export default SavedVideos
