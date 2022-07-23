import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { Subjects } from "./Components/Subjects/Subjects";


export const Dashboard = ()=>{
    const user = useSelector((store)=>store.auth.user) || JSON.parse(localStorage.getItem('__tk_user'));

    if(!user){
        Navigate({to:"/home"})
    }
    return(
        <div>
            <h1>Welcome {user?.firstName}!</h1>

            <Subjects/>
        </div>
    )
}