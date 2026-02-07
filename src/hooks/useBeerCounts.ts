import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';
import type { BeerCounts } from '../types';

export function useBeerCounts() {
  const [counts, setCounts] = useState<BeerCounts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const countsRef = ref(db, 'beerCounts');
    const unsubscribe = onValue(countsRef, (snapshot) => {
      const data = snapshot.val();
      setCounts(data ?? {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sorted = Object.entries(counts)
    .map(([id, user]) => ({ id, ...user }))
    .sort((a, b) => b.count - a.count);

  return { counts, sorted, loading };
}
