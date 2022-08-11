
function Search ({onSearch}){
    function handleClick(e){
        onSearch(e.target.value)
    }
    return(
        <div>  
            <input type='text' placeholder='Search...' onChange={handleClick}/>  
        </div>
    );
}

export default Search;