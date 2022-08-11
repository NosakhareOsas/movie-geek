import React, {useEffect, useState} from 'react'
import '../style/App.css';
import {Route, Routes, useMatch} from "react-router-dom";
import MovieList from './MovieList';
import Navbar from './Navbar';
import MovieSpecs from './MovieSpecs';
import Search from './Search';
import Sortbar from './Sortbar';
import Home from './Home';

function App() {
  const [allMovies, setMovieList] = useState([])
  const [altMovies, setAltMovies] = useState([])
  const match = useMatch({
    path: "/*",
    end: true, 
    caseSensitive: true 
  });
  console.log(match.pathname, match.pathnameBase, match.params['*'])

  useEffect(()=>{
    fetch('http://localhost:3001/movies')
    .then(r => r.json())
    .then(data => {
      setMovieList(data)
      setAltMovies(data)})
  },[])

  function onSearch(value){
    const movieName = []
    altMovies.forEach(movie =>{
      const splitArray = movie.name.split(' ')
      for (let name of splitArray){
        if (name.toLowerCase() === value.toLowerCase()){
          movieName.push(movie)
          setMovieList(movieName)
        }
      }
      if (value === ''){
        resetMovie()
      }
    })
  }

  function resetMovie(){
    setMovieList(altMovies)
  }

  function onSort(value){
    const sorted = []
    for (let movie of altMovies){
      const checker = movie.genres.find(genre => genre === value)
      if (checker === value){
        sorted.push(movie)
        setMovieList(sorted)
      }
    }
    if (value === 'all'){
      resetMovie()
    } 
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <Routes>
          <Route path='/' element={<><Home /></>}/>
          <Route path={`movies`} element={
            <>
              <header className="App-header">
                <Search onSearch={onSearch}/>
                <Sortbar onSort={onSort}/>
              </header>
              <MovieList movies={allMovies}/>
            </>}
          />
          <Route path={`${match.pathnameBase}/movies/:id`} element={<MovieSpecs movies={allMovies} reset={resetMovie}/>} />
      </Routes>      
    </div>
  );
}

export default App;
