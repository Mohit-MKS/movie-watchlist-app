
import { Link } from 'react-router-dom';
import './Watchlist.scss'
import { useAppContext } from '../contexts/Contexts';

const Watchlist = () => {
  const { state, dispatch } = useAppContext();

  const removeFromWatchlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: id });
  };

  return (
    <div className='watchlist-component'>
      <h2>My Watchlist</h2>
      <div className="row">
        {state.watchlist?.length > 0 ? (
          state.watchlist.map(movie => (
            <div key={movie.imdbID} className="my-2 col-md-3 col-sm-12">
              <div className="movie-card">
                <Link to={`/movie/${movie.imdbID}`}>
                  <img src={movie.Poster} alt={movie.Title} className="w-100" />
                  <h5>{movie.Title}</h5>
                </Link>
                <div className="add-to-watchlist-btn" >
                  <button onClick={() => removeFromWatchlist(movie.imdbID)}>Remove</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies in your watchlist</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
