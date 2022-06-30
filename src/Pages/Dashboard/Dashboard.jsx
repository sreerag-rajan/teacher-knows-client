import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const Dashboard = ()=>{
    const user = useSelector((store)=>store.auth.user);

    if(!user){
        Navigate({to:"/home"})
    }
    return(
        <div>
            <h1>Welcome {user?.firstName}!</h1>
        </div>
    )
}