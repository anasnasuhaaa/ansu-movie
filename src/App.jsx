import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";
import Header from "./components/Header";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      const movieRate = movie.vote_average.toFixed(1);
      const movieYear = movie.release_date.slice(0, 4);
      return (
        <div
          className="Movie-wrapper w-56 max-[522px]:w-80 text-center"
          key={i}
        >
          <img
            className="Movie-img rounded-xl"
            src={`${import.meta.env.VITE_BASEURLIMG}${movie.poster_path}`}
            alt=""
          />
          <div className="Movie-title text-start text-white font-medium">
            {movie.original_title}
          </div>
          <div className="Movie-date-rate-wrapper flex justify-between items-end">
            <div className="Movie-date text-gray-500">{movieYear}</div>
            <div className="Movie-rate text-white text-sm flex justify-between items-center">
              <svg
                class="w-4 h-4 text-yellow-400 dark:text-white mr-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
              {movieRate}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="App min-h-dvh w-full bg-slate-900">
        <Header onChange={({ target }) => search(target.value)} />
        <div className="Movie-container w-full flex justify-between gap-y-3 px-5 flex-wrap">
          <PopularMovieList />
        </div>
      </div>
    </>
  );
}

export default App;
