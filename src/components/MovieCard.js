function MovieCard({movie}){
    
    return(
        <div>
            <img src={movie.image} alt={movie.alt} height='50' width='50'/>
            <h4>{movie.name}</h4>
            <hr />
        </div>
    );
}

export default MovieCard;