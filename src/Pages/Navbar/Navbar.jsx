import { Link } from "react-router-dom"


export const Navbar = ()=>{
    return(
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/signUp">SignUp</Link>
            
        </nav>
    )
}