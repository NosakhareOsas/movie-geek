import MovieCard from "./MovieCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function MovieList ({movies}){
    const displayMovies = movies.map(movie => <Col xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}><MovieCard movie={movie}/> </Col>) //className="g-4"
  return (
    <Container>
        <Row>
            {displayMovies}
        </Row>
    </Container>
  );
}

export default MovieList;