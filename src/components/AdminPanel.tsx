import { ref, update } from 'firebase/database';
import { useState } from 'react';
import { db } from '../firebase/config';
import { useBeerCounts } from '../hooks/useBeerCounts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ConfettiPieces() {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="confetti-piece" />
      ))}
    </>
  );
}

export function AdminPanel() {
  const { sorted, loading } = useBeerCounts();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confettiId, setConfettiId] = useState<string | null>(null);

  const updateCount = (id: string, delta: number) => {
    const user = sorted.find((u) => u.id === id);
    if (!user) return;
    const newCount = Math.max(0, user.count + delta);
    update(ref(db, `beerCounts/${id}`), { count: newCount });

    if (delta > 0) {
      setConfettiId(id);
      setTimeout(() => setConfettiId(null), 600);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="admin-list">
        {sorted.map((user) => (
          <div key={user.id} className="admin-card">
            <span className="name">{user.name}</span>
            <div className="controls">
              <button
                className="btn btn-minus"
                onClick={() => updateCount(user.id, -1)}
              >
                -
              </button>
              <button
                className="btn btn-half-minus"
                onClick={() => updateCount(user.id, -0.5)}
              >
                -½
              </button>
              <span className="count">
                {Number.isInteger(user.count) ? user.count : user.count.toFixed(1)}
              </span>
              <button
                className="btn btn-half-plus"
                onClick={() => updateCount(user.id, 0.5)}
              >
                +½
                <div className={`confetti-wrapper${confettiId === user.id ? ' active' : ''}`}>
                  <ConfettiPieces />
                </div>
              </button>
              <button
                className="btn btn-plus"
                onClick={() => updateCount(user.id, 1)}
              >
                +
                <div className={`confetti-wrapper${confettiId === user.id ? ' active' : ''}`}>
                  <ConfettiPieces />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
