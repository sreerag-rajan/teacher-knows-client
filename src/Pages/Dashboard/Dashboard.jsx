import { useSelector } from "react-redux"


export const Dashboard = ()=>{
    const user = useSelector((store)=>store.auth.user);
    console.log(user);

    return(
        <div>
            <h1>Welcome {user?.firstName}!</h1>
        </div>
    )
}