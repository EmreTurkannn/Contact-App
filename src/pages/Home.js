import React, { useState, useEffect } from 'react'
import fireDb from "../firebase"
import { Link } from "react-router-dom"
import "./Home.css";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'

const Home = () => {

  const [user, setUser] = useState({});
  const[sortedData,setSortedData]=useState([]);
  const [sort,setSort]=useState(false);
  let navigate = useNavigate();
  
 
  console.log(user);

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({});
      }

    })
    return () => {
      setUser({});
    }
  }, []);
  const onDelete = (id) => {
    if(window.confirm("Are you sure that you wanted to delete that contact ?")){
      fireDb.child(`contacts/${id}`).remove((err)=>{
        if(err){
          toast.error(err);
        }else{
          toast.success("Contact Deleted Successfully");
        }
      });
    }
  }

  const handleChange=(e)=>{
    setSort(true);
    fireDb
    .child("contacts")
    .orderByChild(`${e.target.value}`)
    .on("value",(snapshot=>{
      let sortedData=[];
      snapshot.forEach((snap)=>{
        sortedData.push(snap.val());
      });
      setSortedData(sortedData);
    }))
  }
  const handleReset=()=>{
    setSort(false);
  }

  const filterData=(value)=>{
    fireDb.child("contacts").orderByChild("status").equalTo(value).on("value",(snapshot)=>{
      if(snapshot.val()){
        const data=snapshot.val();
        setUser(data);
      }
    })
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <table className='styled-tabled'>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Status</th>
           {!sort&&(<th style={{ textAlign: "center" }}>Action</th>)} 
          </tr>
        </thead>

        {!sort&&(
          <tbody>
          {Object.keys(user).map((id, index) => {  //Object keys(user) ---> Object(user) return array 
            console.log(id);
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{user[id].name}</td>
                <td>{user[id].email}</td>
                <td>{user[id].contact}</td>
                <td>{user[id].status}</td>
                <td>
                  <Link to={`/uptade/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>delete</button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-edit'>View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
        )}
        {sort&&(
          <tbody>
            {sortedData.map((item,index)=>{
              return (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.status}</td>
                </tr>
              )
            })}
          </tbody>
        )
          
        }

        
      </table>
          <label>Sort By:</label>
          <select className='dropdown' name='colValue' onChange={handleChange}>
            <option>Please Select</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="Contact">Contact</option>
            
          </select>
          <button className='btn btn-reset' onClick={handleReset}>Reset</button>
          <br/>
          <label>Status:</label>
          <button className='btn btn-active' onClick={()=>filterData("Active")}>Active</button>
          <button className='btn btn-active' onClick={()=>filterData("Inactive")}>Inactive</button> 
    </div>
  )
}

export default Home