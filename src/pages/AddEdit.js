import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./AddEdit.css"
import fireDb from "../firebase"
import { toast } from "react-toastify"

const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {
    let navigate = useNavigate();
    const {id}=useParams();

    const [user, setUser] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, contact } = user;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    useEffect(()=>{
        fireDb.child("contacts").on("value",(snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()});
            }else{
                setData({});
            }
        });
        return ()=>{ //componentWillUnmount() //SetDatayı temizliyor.
            setData({});
        };
    },[id]);

    useEffect(()=>{
        if(id){
            setUser({...data[id]})
        }else{
             setUser({...initialState});   
        }

        return()=>{    //componentWillUnmount()
            setUser({...initialState});   
        }
    },[id,data])



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
            toast.error("Please provide value in each input field.");
        }
        else {
            if(!id){
            fireDb.child("contacts").push(user, (err) =>{
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Contact Added Succesfully");
                }
                });
            }else{
                fireDb.child(`contacts/${id}`).set(user, (err) =>{
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Contact Uptade Succesfully");
                    }
                    });
            }
            
            setTimeout(()=>navigate("/"),500);
        }
    };
    return (
        <div style={{ marginTop: "100px" }}>
            <form onClick={handleSubmit} style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            >

                <label htmlFor='name'> Name </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Your Name...'
                    value={name||""}
                    onChange={handleInputChange} />

                <label htmlFor='name'> Email </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Your email...'
                    value={email||""}
                    onChange={handleInputChange} />

                <label htmlFor='name'> Contact no </label>
                <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder='Your Contact No...'
                    value={contact||""}
                    onChange={handleInputChange} />

                <input type="submit" value={id?"update":"save"} />
            </form>
        </div>
    )
}

export default AddEdit