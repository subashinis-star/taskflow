function Header({ onLogout }) {
  return (
    <>
      <h1>TaskFlow</h1>
      {onLogout && <button onClick={onLogout}>Logout</button>}
    </>
  );
}

export default Header;