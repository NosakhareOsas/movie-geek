import React, {useEffect, useState} from 'react'
import '../style/App.css';
import {Route, Routes, useMatch} from "react-router-dom";
import MovieList from './MovieList';
import Navbar from './Navbar';
import MovieSpecs from './MovieSpecs';
import Search from './Search';
import Sortbar from './Sortbar';
import Home from './Home';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {
  
  var refresh = window.localStorage.getItem('refresh');
  console.log(refresh);
  if (refresh===null){
      window.location.reload();
      window.localStorage.setItem('refresh', "1");
      console.log('yutr')
  }

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
      setAltMovies(data)
      })
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
      <Row className="App-header">
        <Col xs={12}>
          <Navbar/>
        </Col>
        <Col xs={12}>
          <Routes>
            <Route path={`movies`} element={<Search onSearch={onSearch}/>}
            />
          </Routes>
        </Col>
        <Col xs={12}>
          <Routes>
            <Route path={`movies`} element={<Sortbar onSort={onSort}/>}
            />
          </Routes>
        </Col>
      </Row>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path={`movies`} element={
              <MovieList movies={allMovies}/>
          }
          />
          <Route path={`${match.pathnameBase}/movies/:id`} element={<MovieSpecs movies={allMovies} reset={resetMovie}/>} />
      </Routes>      
    </div>
  );
}

export default App;
