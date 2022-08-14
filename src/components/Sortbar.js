import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Sortbar ({onSort}){
    function handleSort(e){
        onSort(e)
    }
    return (
        <DropdownButton
            onSelect={handleSort}
            align="end"
            title="Filter Movies By Genre"
            id="dropdown-menu-align-end"
            variant="secondary"
        >
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="action">Action</Dropdown.Item>
            <Dropdown.Item eventKey="adventure">Adventure</Dropdown.Item>
            <Dropdown.Item eventKey="crime">Crime</Dropdown.Item>
            <Dropdown.Item eventKey="drama">Drama</Dropdown.Item>
            <Dropdown.Item eventKey="horror">Horror</Dropdown.Item>
            <Dropdown.Item eventKey="comedy">Comedy</Dropdown.Item>
        </DropdownButton>
      );
}

export default Sortbar;
