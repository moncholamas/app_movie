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

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavMenu />
        <Routes>
          {/* Login */}
          <Route exact path="/login" element={<LoginPage />} />
          {/* Home -> lista todas las peliculas*/}
          <Route exact path="/" element={<HomePage />} />
          {/* New -> nueva pelicula */}
          <Route exact path="/new" element={<HomePage />} />
          {/* New -> nueva pelicula */}
          <Route exact path="/edit" element={<HomePage />} />
          {/* Profile -> peliculas favoritas y creadas */}
          <Route exact path="/profile" element={<HomePage />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
