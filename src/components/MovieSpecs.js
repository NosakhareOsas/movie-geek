import { useParams } from "react-router-dom";
import {useEffect} from 'react'
function MovieSpecs ({movies, reset}){
    useEffect(()=>reset(),[])
    const params = useParams();
    const id = params.id
    const movie = movies.find(movie => movie.id.toString() === id)
    console.log(movie);
    return(
        <div>
            <img src={movie.image} alt={movie.name} height='50' width='50'/>
            <h3>{movie.name}</h3>
            <p>{movie.details}</p>
            <p>{movie.date}</p>
            <p>{movie.cast.join(', ')}</p>
            <p>{movie.genres.join(', ')}</p>
            <p>{movie.comments.join('\n')}</p>
            <form>
                <input type='text' placeholder='Comment here...'/>
                <input type='submit' value='Comment' />
            </form>
        </div>
    );
}

export default MovieSpecs;