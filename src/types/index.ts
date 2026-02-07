export interface BeerUser {
  name: string;
  count: number;
}

export interface BeerCounts {
  [key: string]: BeerUser;
}
