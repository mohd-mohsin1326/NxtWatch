import {createContext, useState} from 'react'

const SavedVideosContext = createContext()

export const SavedVideosProvider = ({children}) => {
  const [savedVideosList, setSavedVideosList] = useState([])

  const addVideoToSavedList = video => {
    setSavedVideosList(prevList => [...prevList, video])
  }

  const removeVideoFromSavedList = videoId => {
    setSavedVideosList(prevList =>
      prevList.filter(video => video.id !== videoId),
    )
  }

  const isVideoSaved = videoId =>
    savedVideosList.some(video => video.id === videoId)

  return (
    <SavedVideosContext.Provider
      value={{
        savedVideosList,
        addVideoToSavedList,
        removeVideoFromSavedList,
        isVideoSaved,
      }}
    >
      {children}
    </SavedVideosContext.Provider>
  )
}

export default SavedVideosContext
