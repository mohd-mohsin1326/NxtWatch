import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitError: true, errorMsg: errorMessage})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state
    return (
      <div className="login-main-container">
        <div className="login-detail-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logo-image-style"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="user-input-card">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="input-style"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="user-input-card">
              <label htmlFor="password">PASSWORD</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                className="input-style"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="checkbox-input-card">
              <input
                type="checkbox"
                id="showPassword"
                className="checkbox-style"
                onChange={this.onToggleShowPassword}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <button type="submit" className="login-btn-style">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
