function Sortbar ({onSort}){
    function handleSort(e){
        onSort(e.target.value)
    }
    return(
        <div>
            <select onChange={handleSort}>
                <option value='all'>All</option>
                <option value='action'>Action</option>
                <option value='adventure'>Adventure</option>
                <option value='crime'>Crime</option>
                <option value='drama'>Drama</option>
                <option value='horror'>Horror</option>
                <option value='comedy'>Comedy</option>
            </select>
        </div>
    );
}

export default Sortbar;