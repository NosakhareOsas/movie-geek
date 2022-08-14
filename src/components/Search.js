import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function Search ({onSearch}){
    function handleClick(e){
        onSearch(e.target.value)
    }
    return(
 
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">&#x1F50E;</InputGroup.Text>
            <Form.Control
            placeholder="Search for your favorite movie..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={handleClick}
            />
      </InputGroup>

    );
}

export default Search;