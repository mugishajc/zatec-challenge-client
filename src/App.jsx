import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Favourite from './pages/Favourite';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/album/:artist/:album" element={<Album />} />
        <Route exact path="/artist/:artist/" element={<Artist />} />
        <Route exact path="/favourite/:name/" element={<Favourite />} />
      </Routes>
    </Router>
  )
}

export default App
