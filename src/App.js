import react from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';
import Header from './components/Header'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <BrowserRouter> 
    <div className="App">
      <Header/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/add" element={<AddEdit/>}></Route>
        <Route path="/uptade/:id" element={<AddEdit/>}></Route>
        <Route path="/view/:id" element={<View/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        </Routes>
        
    </div>
    </BrowserRouter>  
    
  );
}

export default App;
