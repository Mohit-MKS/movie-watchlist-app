import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/ApiService";
import { ApiEndpoints } from "../services/ApiEndpoints";
import { IMovie } from "../models/movies.model";
import { AppContext } from "../contexts/AppContext";
import { UserContext } from "../models/app-context.model";
import './Home.scss'
import { Toaster } from "../services/ToasterService";
import { Pagination } from "@mui/material";

const toaster = new Toaster

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const { state, dispatch } = useContext(AppContext) as UserContext;



  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await apiService.doRequest('get', `${ApiEndpoints.baseUrl}?s=${query}`);
    setMovies(response.data.Search);
    setTotalPage(Math.ceil(response.data.totalResults / 10))
  };

  const handlePageChange = async (_event: React.ChangeEvent<unknown>, value: number) => {
    const response = await apiService.doRequest('get', `${ApiEndpoints.baseUrl}?s=${query}&page=${value}`);
    setMovies(response.data.Search);

  };

  const addToWatchlist = (movie: IMovie) => {
    // Check if movie is already in watchlist
    if (!state.watchlist.find(m => m.imdbID === movie?.imdbID)) {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie });
    }
  };

  const isMovieInWatchlist = (movie: IMovie) => (state.watchlist.some(m => m.imdbID === movie?.imdbID));


  return (
    <div className="home-component">
      <h2>Search Movies</h2>
      <form className="d-flex gap-2" onSubmit={(event) => { handleSearch(event), toaster.success('testing') }}>
        <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter movie title" required />
        <button type="submit" className="btn btn-outline-success">Search</button>
      </form>
      <div className="row">
        {movies &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="my-2 col-sm-12 col-md-4 col-lg-3 col-xl-2">
              <div className="movie-card">
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster} alt={movie.Title} className="w-100" />
                  <h5>{movie.Title}</h5>
                </Link>
                <div className="add-to-watchlist-btn" >
                  {isMovieInWatchlist(movie) ? (
                    <div className="added-to-watchlist">Added to Watchlist</div>
                  ) : (
                    <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {totalPage && <Pagination count={totalPage} onChange={handlePageChange} />}

    </div>
  );
};

export default Home;
