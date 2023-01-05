import logo from './logo.svg';
import './App.css';
import url from './config/urlApi';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{url}</h1>
        <Home/>
      </header>
    </div>
  );
}

export default App;
