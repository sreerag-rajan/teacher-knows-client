import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Classes } from "./Components/Classes/Classes";
import { Subjects } from "./Components/Subjects/Subjects";


export const Dashboard = ()=>{
    const user = useSelector((store)=>store.auth.user) || JSON.parse(localStorage.getItem('__tk_user'));
    const navigate = useNavigate()

    if(!user){
        navigate("/home");
    }
    return(
        <div>
            <h1>Welcome {user?.firstName}!</h1>

            <Subjects limit={3}/>
            <Classes limit={4}/>
        </div>
    )
}