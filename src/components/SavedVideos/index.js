import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

class SavedVideos extends Component {
  state = {savedVideosList: []}

  noSavedVideo = () => (
    <div className="no-videos-found-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="saved-img-style"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  rendersavedVideosList = () => {
    const {savedVideosList} = this.state
    return (
      <ul>
        {savedVideosList.map(video => (
          <li key={video.id}>
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {savedVideosList} = this.state

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
