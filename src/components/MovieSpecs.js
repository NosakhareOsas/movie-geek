import { useParams } from "react-router-dom";
import { useState } from 'react'
import {nanoid} from 'nanoid'
function MovieSpecs ({movies}){
    const params = useParams();
    const id = params.id
    const movie = movies.find(movie => movie.id.toString() === id)
    const [formData, setFormData] = useState({name: 'comments', value: ""})
    const [comments, setComments] = useState(movie.comments)
    const displayComments = comments.map(comment=> <li key={nanoid(5)}>{comment}</li>)
    
    function handleComment(e){
        let name = e.target.name;
        let value = e.target.value;
        setFormData({...formData, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        if (formData.comment !== undefined && formData.comment !== ''){
            console.log(formData.comment)
            const newComment = {comments: [...comments, formData.comment]};
            fetch(`http://localhost:3001/movies/${id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            })
                .then((r) => r.json())
                .then((data) => setComments(data.comments));
            }
    }
    
    return(
        <div>
            <img src={movie.image} alt={movie.name} height='50' width='50'/>
            <h3>{movie.name}</h3>
            <p>{movie.details}</p>
            <p>{movie.date}</p>
            <p>{movie.cast.join(', ')}</p>
            <p>{movie.genres.join(', ')}</p>
            <ul>{displayComments}</ul>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Comment here...' onChange={handleComment} name='comment' />
                <input type='submit' value='Comment' />
            </form>
        </div>
    );
}

export default MovieSpecs;