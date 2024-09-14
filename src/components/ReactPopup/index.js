import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const ReactPopup = props => {
  const onClickLogout = close => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    close()
  }

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="logout-btn-style">
            Logout
          </button>
        }
      >
        {close => (
          <div className="popup-warning-card">
            <p>Are you sure you want to exit?</p>
            <div>
              <button type="button" className="cancel-button" onClick={close}>
                Cancel
              </button>
              <button
                type="button"
                className="confirm-button"
                onClick={() => {
                  onClickLogout(close)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}

export default withRouter(ReactPopup)
