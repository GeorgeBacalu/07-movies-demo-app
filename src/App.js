import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      const transformedMoviesData = data.results.map(movieData => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMoviesList(transformedMoviesData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => fetchMoviesHandler(), [fetchMoviesHandler]);

  /*
  const fetchMoviesHandler = () => {
    fetch("https://swapi.dev/api/films")
      .then(response => response.json())
      .then(data => {
        const transformedMoviesData = data.results.map(movieData => ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }));
        setMoviesList(transformedMoviesData);
      });
  };
  */

  let content = <p>Found no movies!</p>;
  if (moviesList.length > 0) content = <MoviesList movies={moviesList} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
};

export default App;
