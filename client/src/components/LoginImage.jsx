import loginPhoto from "../assets/pexels-edmond-dantes-4345357.jpg.jpg";

function LoginImage() {
  return (
    <section className="auth-visual">
      <img
        src={loginPhoto}
        alt="TaskFlow workspace"
        className="auth-image"
      />

      <div className="visual-overlay">
        <div className="visual-brand">TaskFlow.</div>
        <h1>Make every day count.</h1>
        <p>
          Organise your tasks, stay focused and achieve more with TaskFlow.
        </p>
      </div>
    </section>
  );
}

export default LoginImage;