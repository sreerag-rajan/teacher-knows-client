import { Route,Routes } from "react-router-dom"
import { Login } from "../Pages/Auth/Login/Login"
import { SignUp } from "../Pages/Auth/SignUp/SignUp"
import { TokenVerification } from "../Pages/Auth/TokenVerification/TokenVerification"
import { Dashboard } from "../Pages/Dashboard/Dashboard"
import { Home } from "../Pages/Home/Home"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/auth" element={<Auth/>}/> */}
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/verify-token' element={<TokenVerification/>}/>

            <Route path="/dashboard" element = {<Dashboard/>}/>
        </Routes>
    )
}