import react from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import About from './pages/About';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={Home}></Route>
        <Route path="/add" element={AddEdit}></Route>
        <Route path="/uptade/id" element={AddEdit}></Route>
        <Route path="/view/id" element={View}></Route>
        <Route path="/about" element={About}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
