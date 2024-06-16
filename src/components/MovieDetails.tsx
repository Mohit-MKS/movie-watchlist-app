// src/components/MovieDetails.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import apiService from '../services/ApiService';
import { ApiEndpoints } from '../services/ApiEndpoints';
import { IMovie, IMovieDetails } from '../models/movies.model';

import './MovieDetails.scss'
import { useAppContext } from '../contexts/Contexts';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await apiService.doRequest('get', `${ApiEndpoints.baseUrl}?i=${id}`);
      setMovieDetails(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  const addToWatchlist = () => {
    // Check if movie is already in watchlist
    if (!state.watchlist.find(m => m.imdbID === movieDetails?.imdbID)) {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: movieDetails as IMovie });
    }
  };

  // Check if movie is already in watchlist to display appropriate UI
  const isMovieInWatchlist = state.watchlist.some(m => m.imdbID === movieDetails?.imdbID);

  return (
    <div className='movie-detail-component'>
      {movieDetails && (<>
        <div className="d-flex gap-1 align-items-center mb-2">
          <ArrowBackIosIcon className="cursor-pointer" onClick={() => history.back()} />
          <span className='fs-5 fw-bold'>Movie Details</span>
        </div>
        <div className='card p-2'>
          <h2>{movieDetails.Title}</h2>
          <p>{movieDetails.Year}</p>
          <div className='row'>
            <div className='col-md-5 col-lg-4 col-sm-12 '>
              <img className='movie-image' src={movieDetails.Poster} alt={movieDetails.Title} />
            </div>
            <div className='col-md-7 col-lg-8 col-sm-12'>
              <div className="movie-details">
                <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                <p><strong>Year:</strong> {movieDetails.Year}</p>
                <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                <p><strong>Writer:</strong> {movieDetails.Writer}</p>
                <p><strong>Director:</strong> {movieDetails.Director}</p>
                <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                <p><strong>Language:</strong> {movieDetails.Language}</p>
                <p><strong>IMDB Rating:</strong> {movieDetails.imdbRating}</p>
              </div>
              <div className="add-to-watchlist-btn" >
                {isMovieInWatchlist ? (
                  <span className='added-to-watchlist'>Added to Watchlist</span>
                ) : (
                  <button onClick={addToWatchlist}>Add to Watchlist</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default MovieDetails;
