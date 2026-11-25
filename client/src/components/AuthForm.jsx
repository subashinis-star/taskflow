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
    <>
      <h2>{isRegister ? "Create Account" : "Login"}</h2>

      <form onSubmit={handleAuth}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (8+ characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <button onClick={toggleRegister}>
        {isRegister ? "Go to Login" : "Create Account"}
      </button>

      <p>{message}</p>
    </>
  );
}

export default AuthForm;