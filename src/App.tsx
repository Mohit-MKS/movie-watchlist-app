import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss'
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import NotFound from './components/NotFound';
import Register from './components/Register';
import { useAppContext } from './contexts/Contexts';

function App() {

  const { state, loading } = useAppContext();
  const { user } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>,
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="app">
        {user ? (
          <>
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </>

        ) : (
          <div className="auth">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </div>
      {/* 
        <div className='app'>
          <Sidebar />
          <div className={`content`} > 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />}> </Route>

            </Routes>
          </div>
        </div> */}
    </BrowserRouter>
  )
}

export default App
