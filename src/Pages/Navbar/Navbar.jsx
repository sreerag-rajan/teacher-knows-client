import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../../Redux/Auth/auth.action"
import './Navbar.css'


export const Navbar = ()=>{
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        localStorage.removeItem('__tk_user');
        localStorage.removeItem('__tk_userToken');
        dispatch(setUser(null));        
    }
    return(
        <nav>
            <div>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            </div>
            {!user?<div>
            <Link to="/login">
                <Button variant="outlined" sx={{color:'green', border: '1px solid green'}} >
                Login
                </Button>
            </Link>
            <Link to="/signUp">
                <Button variant="contained" >
                SignUp
                </Button>
            </Link>
            </div>:
            <Button onClick={handleLogout} variant="contained" sx={{backgroundColor: "red"}}>LogOut</Button>
            }
            
        </nav>
    )
}