import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import "./AddEdit.css"
import fireDb from "../firebase"
import { toast } from "react-toastify"

const initialState = {
    name: "",
    email: "",
    contact: ""
}


const AddEdit = () => {

    const [user, setUser] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, contact } = user;
    
    const handleInputChange=()=>{
        
    }

    const handleSubmit=()=>{};
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth:"400px",
                alignContent:"center"
            }}
        >
            <label htmlFor='name'> Name </label>
            <input
            type="text"
            id="name"
            name="name"
            placeholder='Your Name...'
            value={name}
            onChange={handleInputChange}/>
             <label htmlFor='name'> Name </label>
            <input
            type="text"
            id="name"
            name="name"
            placeholder='Your Name...'
            value={name}
            onChange={handleInputChange}/>

             <label htmlFor='name'> Email </label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder='Your email...'
            value={email}
            onChange={handleInputChange}/>

             <label htmlFor='name'> Name </label>
            <input
            type="number"
            id="contact"
            name="contact"
            placeholder='Your Contact No...'
            value={contact}
            onChange={handleInputChange}/>
            
            <input type="submit" value="Save"/>
        </form>
    </div>
    )
}

export default AddEdit