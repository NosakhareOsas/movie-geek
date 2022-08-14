import { useParams } from "react-router-dom";
import { useState } from 'react'
import {nanoid} from 'nanoid'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image'

function MovieSpecs ({movies}){
    const params = useParams();
    const id = params.id
    const movie = movies.find(movie => movie.id.toString() === id)
    const [formData, setFormData] = useState({name: 'comments', value: ""})
    const [comments, setComments] = useState(movie.comments)
    const displayComments = comments.map(comment=>   
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={nanoid(5)}
        >
            <div className="ms-2 me-auto">
            <div className="fw-bold">Anonymous User</div>
            {comment}
            </div>
            <Badge bg="secondary" pill>
             <small>review</small>
            </Badge>
        </ListGroup.Item>
    )
    const imgStyle = {
        boxShadow: '1px 2px 9px #282c34',
        margin: '2em',
        padding: '0em',
      };
    const divStyle = {
        boxShadow: '1px 2px 4px #282c34',
        margin: '2em',
        padding: '1em'
    };
    
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
        <Container >
            <Row >
                <Col><Image src={movie.image} alt={movie.name}  width='450' rounded="true" fluid="true" style={imgStyle}/></Col>
                <Col style={divStyle}>
                    <h1>{movie.name}</h1>
                    <p>{movie.details}</p>
                    <h5>Release Date</h5><p>{movie.date}</p>
                    <h5>Cast</h5><p>{movie.cast.join(', ')}</p>
                    <h5>Genre</h5><p>{movie.genres.join(', ')}</p>
                    <Row style ={{margin:"20px"}}>
                        <Col style ={{marginBottom:"10px"}}>
                            <form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">   
                                    <FloatingLabel controlId="floatingTextarea2" label={`Review ${movie.name.toLowerCase()}`}>
                                        <Form.Control
                                            as="textarea"
                                            placeholder={`Review ${movie.name.toLowerCase()}`}
                                            onChange={handleComment} 
                                            name='comment'
                                            style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                    <Form.Text className="text-muted">
                                        Everyone can see your comment
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="secondary" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </Col>
                        <Col>
                            <ListGroup as="ol" numbered>{displayComments}</ListGroup>
                        </Col>  
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieSpecs;

