
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './Pages/Navbar/Navbar'
import { AllRoutes } from './AllRoutes/AllRoutes'
import { Footer } from './Pages/Footer/Footer'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { setUser } from './Redux/Auth/auth.action';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('__tk_user'));
    let token = JSON.parse(localStorage.getItem('__tk_userToken'))
    if(user){
      dispatch(setUser({...user, token}))
    }
  },[])
  return (
    <div className="App">
        <Navbar/>
        <AllRoutes/>
        <Footer/> 

        <ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
    </div>
  );
}

export default App;
