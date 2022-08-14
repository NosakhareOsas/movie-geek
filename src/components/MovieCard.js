import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"; 

function MovieCard({movie}){
    function truncate (string = '', limit = 0) {
        if (string.length > 13) {
            return `${string.substring(0, limit)}...`
        } else{
            return string
        }
      }

  return (
    <Card style={{ width: '12rem', margin: '20px' }}>
      <Card.Img variant="top" src={movie.image} alt={movie.alt}/>
      <Card.Body>
        <Card.Title>{truncate(movie.name, 12)}</Card.Title>
        <Card.Text>{truncate(movie.details, 35)}</Card.Text>
        <Link key={movie.id} to={`/movies/${movie.id}`}>
            <Button variant="secondary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;



