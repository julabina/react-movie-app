import Header from "./Components/Layout/Header";
import './css/style.css';
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Movie from "./Components/Pages/Movie";
import MovieList from "./Components/Pages/MovieList";
import Tv from "./Components/Pages/Tv";
import TvList from "./Components/Pages/TvList";
import MovieTopRated from "./Components/Pages/MovieTopRated";
import MoviePopular from "./Components/Pages/MoviePopular";
import TvTopRated from "./Components/Pages/TvTopRated";
import TvPopular from "./Components/Pages/TvPopular";
import MovieHome from "./Components/Pages/MovieHome";
import TvHome from "./Components/Pages/TvHome";
import TvSeason from "./Components/AppComponents/TvSeason";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<MovieHome />} />
        <Route path="/movie/all" element={<MovieList />} />
        <Route path="/movie/top_rated" element={<MovieTopRated />} />
        <Route path="/movie/popular" element={<MoviePopular />} />
        <Route path='/movie/ref_=:id' element={<Movie />} />
        <Route path='/tv' element={<TvHome />} />
        <Route path="/tv/all" element={<TvList />} />
        <Route path="/tv/top_rated" element={<TvTopRated />} />
        <Route path="/tv/popular" element={<TvPopular />} />
        <Route path="/tv/ref_=:id" element={<Tv />} />
        <Route path="/tv/ref_=:id/s:sa" element={<TvSeason />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
