import { Route,Routes } from "react-router-dom"
import { ForgotPassword } from "../Pages/Auth/ForgotPassword/ForgotPassword"
import { Login } from "../Pages/Auth/Login/Login"
import { ResetPassword } from "../Pages/Auth/ResetPassword/ResetPassword"
import { SignUp } from "../Pages/Auth/SignUp/SignUp"
import { TokenVerification } from "../Pages/Auth/TokenVerification/TokenVerification"
import { ClassesPage } from "../Pages/Classes/ClassesPage"
import { IndividualClass } from "../Pages/Classes/IndividualClass"
import { Dashboard } from "../Pages/Dashboard/Dashboard"
import { Home } from "../Pages/Home/Home"
import { SubjectsPage } from "../Pages/Subjects/SubjectsPage"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/auth" element={<Auth/>}/> */}
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/verify-token' element={<TokenVerification/>}/>
            <Route path="/forgot-password" element= {<ForgotPassword/>}/>
            <Route path = "/reset-password" element={<ResetPassword/>}/>

            <Route path="/dashboard" element = {<Dashboard/>}/>
            <Route path='/subjects' element={<SubjectsPage/>}/>
            <Route path='/classes' element={<ClassesPage/>}/>
            <Route path='/class/:id' element={<IndividualClass/>}/>

        </Routes>
    )
}