import { useEffect, useRef, useState } from 'react';

interface BeerCounterProps {
  name: string;
  count: number;
  rank: number;
  maxCount: number;
}

export function BeerCounter({ name, count, rank, maxCount }: BeerCounterProps) {
  const medal = rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;
  const progressPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const prevCount = useRef(count);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (prevCount.current !== count) {
      setPop(true);
      const timer = setTimeout(() => setPop(false), 300);
      prevCount.current = count;
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className={`beer-card ${rank <= 3 ? `top-${rank}` : ''}`}>
      <span className="rank">
        {rank === 1 && <span className="crown">👑</span>}
        {medal}
      </span>
      <span className="name">{name}</span>
      <span className={`count${pop ? ' pop' : ''}`}>{count}</span>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
