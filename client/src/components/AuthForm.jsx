
function AuthForm({
  isRegister,
  username,
  setUsername,
  password,
  setPassword,
  handleAuth,
  toggleRegister,
  message
}) {
  return (
    <div className="auth-form-wrapper">
      <h2 className="form-title">
        {isRegister ? "Create Account" : "Sign in"}
      </h2>

      <p className="form-description">
        {isRegister
          ? "Create your account to get started."
          : "Enter your details to access your workspace."}
      </p>

      <form className="auth-form" onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        <button type="submit" className="auth-submit">
          {isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>

      <div className="auth-switch">
        {isRegister
          ? "Already have an account?"
          : "Don't have an account?"}

        <button
          type="button"
          className="auth-switch-button"
          onClick={toggleRegister}
        >
          {isRegister ? "Sign In" : "Create Account"}
        </button>
      </div>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default AuthForm;
