import React, { ReactNode } from "react";
import axios from "axios";
import { Movie, Query } from "../Type/Type";

export const MovieContext = React.createContext<Query>({} as Query);
interface OwnProps {
  children: ReactNode;
}
const QueryContextProvider = (props: OwnProps) => {
  const { children } = props;

  const [title, setTitle] = React.useState("");
  const [movie, setMovie] = React.useState<Movie[] | null>(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://imdb-api.com/API/Search/k_1raguh4j/${title}`)
      .then((res) => res.data.results)
      .then((response) => setMovie(response))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [title]);

  const value: Query = {
    setTitle,
    title,
    movie,
    error,
    loading,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
export default QueryContextProvider;
