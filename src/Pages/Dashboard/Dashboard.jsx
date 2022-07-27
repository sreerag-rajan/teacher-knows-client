import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { Classes } from "./Components/Classes/Classes";
import { Subjects } from "./Components/Subjects/Subjects";


export const Dashboard = ()=>{
    const user = useSelector((store)=>store.auth.user) || JSON.parse(localStorage.getItem('__tk_user'));

    if(!user){
        Navigate({to:"/home"})
    }
    return(
        <div>
            <h1>Welcome {user?.firstName}!</h1>

            <Subjects limit={3}/>
            <Classes limit={2}/>
        </div>
    )
}