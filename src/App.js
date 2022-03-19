import Header from "./Components/Layout/Header";
import './css/style.css';
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Movie from "./Components/Pages/Movie";
import MovieList from "./Components/Pages/MovieList";
import Tv from "./Components/Pages/Tv";
import TvList from "./Components/Pages/TvList";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path='/movie/:id' element={<Movie />} />
        <Route path="/tv" element={<TvList />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
