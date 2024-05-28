import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss'
import Sidebar from './components/Sidebar';
import { AppProvider } from './contexts/AppContext';
import Home from './components/Home';
import Login from './components/Login';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import NotFound from './components/NotFound';
import Register from './components/Register';

function App() {
  return (
    <AppProvider>
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
        <div className='app'>
          <Sidebar />
          <div className='content'> {/* Adjust padding to accommodate the sidebar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />}> </Route>

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App