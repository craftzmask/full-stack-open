const LoginForm = ({
  username, onUsernameChange,
  password, onPasswordChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        username <input
          value={username}
          onChange={onUsernameChange}
        />
      </div>
      <div>
        password <input
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm