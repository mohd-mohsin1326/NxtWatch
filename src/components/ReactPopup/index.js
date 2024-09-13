import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const ReactPopup = ({onConfirm, onCancel}) => (
  <div className="popup-container">
    <Popup
      modal
      trigger={
        <button type="button" className="trigger-button">
          Trigger
        </button>
      }
    >
      {close => (
        <>
          <div>
            <p>Are you sure you want to exit?</p>
            <button
              type="button"
              className="confirm-button"
              onClick={() => {
                onConfirm()
                close()
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                onCancel()
                close()
              }}
            >
              No
            </button>
          </div>
        </>
      )}
    </Popup>
  </div>
)

export default ReactPopup
