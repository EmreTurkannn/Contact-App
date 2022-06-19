import React,{useState,useEffect} from 'react'
import fireDb from "../firebase"
import {Link} from "react-router-dom"
import "./Home.css"


const Home = () => {

  const [user,setUser]=useState({});
  
  useEffect(()=>{
    fireDb.child("contacts").on("value",(snapshot)=>{
      if(snapshot.val()!==null){
        setUser({...snapshot.val()});
      }else{
        setUser({});
      }

    })
    return ()=>{
      setUser({});
    }
  },[]); 

  return (
    <div style={{marginTop:"100px"}}>
      <table className='styled-tabled'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Email</th>
            <th style={{textAlign:"center"}}>Contact</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(user).map((id,index)=>{  //Object keys(user) ---> Object(user) return array 
            return(
              <tr key={id}>
                <th scope="row">{index+1}</th>
                <td>{user[id].name}</td>
                <td>{user[id].email}</td>
                <td>{user[id].contact}</td>
              </tr>
              )
          })}
        </tbody>
      </table>
        
    </div>
  )
}

export default Home