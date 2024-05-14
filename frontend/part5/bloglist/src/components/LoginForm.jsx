import PropTypes from 'prop-types'

const LoginForm = ({
  username, onUsernameChange,
  password, onPasswordChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        username <input
          data-testid="username"
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        password <input
          data-testid="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm