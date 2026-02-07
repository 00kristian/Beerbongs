import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Beerbongs</Link>
      <div className="nav-links">
        <Link to="/">Leaderboard</Link>
        {isAdmin ? (
          <Link to="/admin">Admin</Link>
        ) : (
          <Link to="/login">Admin</Link>
        )}
      </div>
    </nav>
  );
}
