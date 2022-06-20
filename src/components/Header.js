import React,{useState,useEffect} from 'react'
import {Link,useLocation,useParams,useNavigate} from "react-router-dom"
import "./Header.css"
const Header = () => {

    const [activeTab,setActiveTab]=useState("Home");
    const [search,setSearch]=useState("");

    const location=useLocation();
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(location.pathname==="/"){
            setActiveTab("Home");
        }
        else if(location.pathname==="/add"){
            setActiveTab("AddContact");
        }
        else if(location.pathname==="/about"){
            setActiveTab("About");
        }
    },[location])

    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate(`/search?name=${search}`);
        setSearch("");
    }


  return (
    <div className='header'>
        <p className='logo'> Contact App</p>
        <div className='header-right'>
            <form onSubmit={handleSubmit} style={{display:"inline"}}>
                <input
                type="text"
                className='inputField'
                placeholder='Seacrh Name...'
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
                />

            </form>


            <Link to="/">
                <p
                className={`${activeTab==="Home"? "active":""}`}
                
                >
                    Home
                </p>
        </Link>
        <Link to="/add">
                <p
                className={`${activeTab==="AddContact" ? "active":""}`}
               
                >
                    Add Contact
                </p>
        </Link>
        <Link to="/about">
                <p
                className={`${activeTab==="About" ? "active":""}`}
               
                >
                    About
                </p>
        </Link>




        </div>
    </div>
  )
}

export default Header