import { Route,Routes } from "react-router-dom"
import { SignUp } from "../Pages/SignUp/SignUp"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={"Home"}/>
            {/* <Route path="/auth" element={<Auth/>}/> */}
            <Route path='/signup' element={<SignUp/>}/>
            <Route path="/:userid" element = {"Dashboard"}/>
        </Routes>
    )
}