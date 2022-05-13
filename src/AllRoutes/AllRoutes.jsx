import { Route,Routes } from "react-router-dom"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={"Home"}/>
            {/* <Route path="/auth" element={<Auth/>}/> */}
            <Route path="/:userid" element = {"Dashboard"}/>
        </Routes>
    )
}