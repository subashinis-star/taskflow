
import AuthForm from "./AuthForm";

function LoginPanel(props) {
  return (
    <section className="auth-panel">
      <div className="auth-content">
        <div className="login-heading">
          <h1>Login</h1>
          <p>Welcome back to TaskFlow</p>
        </div>

        <AuthForm {...props} />

        <p className="auth-footer">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default LoginPanel;
