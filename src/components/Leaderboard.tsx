import { useBeerCounts } from '../hooks/useBeerCounts';
import { BeerCounter } from './BeerCounter';

export function Leaderboard() {
  const { sorted, loading } = useBeerCounts();
  const maxCount = sorted.length > 0 ? sorted[0].count : 0;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="leaderboard">
      <h1>Beerbongs Leaderboard</h1>
      <div className="card-list">
        {sorted.map((user, i) => (
          <BeerCounter
            key={user.id}
            name={user.name}
            count={user.count}
            rank={i + 1}
            maxCount={maxCount}
          />
        ))}
      </div>
    </div>
  );
}
