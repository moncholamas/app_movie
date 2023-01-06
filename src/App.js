import logo from './logo.svg';
import './App.css';
import url from './config/urlApi';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>{url}</h1>
          <Home />
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
