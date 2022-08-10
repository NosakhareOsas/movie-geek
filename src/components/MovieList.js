import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"; 

function MovieList ({movies}){
    const displayMovies = movies.map(movie => 
        <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie}/>
        </Link>)
    
    return(
        <div>
            {displayMovies}
        </div> 
    );
}

export default MovieList;