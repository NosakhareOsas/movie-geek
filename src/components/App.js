import React, {useEffect, useState} from 'react'
import '../style/App.css';
import {Route, Routes, useMatch, BrowserRouter} from "react-router-dom";
import MovieList from './MovieList';
import Navbar from './Navbar';
import MovieSpecs from './MovieSpecs';
import Search from './Search';

function App() {
  const [allMovies, setMovieList] = useState([])
  const match = useMatch({
    path: "/movies/*",
    end: true, 
    caseSensitive: true 
  });
  console.log(match.pathname, match.pathnameBase, match.params['*'])

  useEffect(()=>{
    fetch('http://localhost:3001/movies')
    .then(r => r.json())
    .then(data => setMovieList(data))
  },[])
  
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Search />
      </header>
      <Routes>
          <Route path={`movies`} element={<MovieList movies={allMovies}/>}/>
          <Route path={`${match.pathnameBase}/:id`} element={<MovieSpecs movies={allMovies}/>} />
      </Routes> 
        
        
           
    </div>
  );
}

export default App;
