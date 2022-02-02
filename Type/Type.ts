export type TopMovies = {
  topMovies: TopMovie[];
  hasError: boolean;
};
export type TopMovie = {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
};
export type Query = {
  setTitle: (title: string) => void;
  title: string;
  movie: Movie[] | null;
  error: boolean;
  loading: boolean;
};

export type Movie = {
  description: string;
  id: string;
  image: string;
  resultType: string;
  title: string;
};
