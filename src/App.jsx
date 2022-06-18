
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './Pages/Navbar/Navbar'
import { AllRoutes } from './AllRoutes/AllRoutes'
import { Footer } from './Pages/Footer/Footer'

function App() {
  return (
    <div className="App">
        <Navbar/>
        <AllRoutes/>
        <Footer/> 
    </div>
  );
}

export default App;
