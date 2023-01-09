import logo from './logo.svg';
import './App.css';
import url from './config/urlApi';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import NavMenu from './components/NavMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPage from './pages/New';
import RankingPage from './pages/Ranking';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import DetailsPage from './pages/Details';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavMenu />
        <Routes>
          {/* Home -> lista todas las peliculas*/}
          <Route exact path="/" element={<HomePage />} />
          {/* Login */}
          <Route exact path="/login" element={<LoginPage />} />
          {/* Register */}
          <Route exact path="/register" element={<RegisterPage />} />
          {/* Profile*/}
          <Route exact path="/profile" element={<ProfilePage />} />
          {/* Ranking -> lista todas las peliculas*/}
          <Route exact path="/ranking" element={<RankingPage />} />
          {/* ShowMore -> muestar los detalles de la pelicula*/}
          <Route exact path="/details/">
            <Route path=":id_movie" element={<DetailsPage />} />
          </Route>
          {/* New -> nueva pelicula */}
          <Route exact path="/new" element={<NewPage />} />
          {/* New -> nueva pelicula */}
          <Route exact path="/edit" element={<HomePage />} />
          {/* Profile -> peliculas favoritas y creadas */}
          <Route exact path="/profile" element={<HomePage />} />
          {/* 404 */}
          <Route exact path="/*" element={<NotFoundPage />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
