import { NavLink } from "react-router-dom";

function Navbar (){
    return(
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/movies'>Movies</NavLink>
        </div>
    );
}

export default Navbar;