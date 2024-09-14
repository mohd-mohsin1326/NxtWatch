import {Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItem from './components/VideoItem'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import {SavedVideosProvider} from './Context/SavedVideosContext'

import './App.css'

const App = () => (
  <SavedVideosProvider>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <ProtectedRoute exact path="/videoitem/:id" component={VideoItem} />
      <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </SavedVideosProvider>
)

export default App
