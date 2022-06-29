import { Login } from "@mui/icons-material";
import { SignUp } from "./SignUp/SignUp";


export const Auth = ()=>{
  const [page, setPage] = useState('login')

  const handleChange = (pageName)=>{
    setPage(pageName);
  }
  return(
    <div>
      {page==="login"?<Login/>:<SignUp/>}
    </div>
  )
}