import Navbar from '../Components/Navbar';
import { useEffect, useState} from 'react';
import {Listbox, ListboxItem, ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "../Components/ListboxWrapper";
import {Divider} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import React from 'react';


function Login(props) {
    const [data,setData] = useState(null)

    const handleLogin = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: formData
        }).then(response => response.text()).then(data => {
          setData(data);
          props.setlogin(true)
        } 
        )
        .catch(error => {
        console.error('There was a problem with login', error);
        setData("Enter Valid Credentials")
      });    
}
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
      <>
        <Navbar {...props}></Navbar>
        <div className={`${props.toggle.dark?"bg-gray-950":""} h-screen flex-column text-center`}>
            <div className='p-2'>
            Welcome, Please Login. 
            </div>
            <form onSubmit={handleLogin}>
                <div className='p-2'>
                <label> Email: </label>
                <input type="email" name="email" className='border-2' onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
                <div className='p-2'>
                <label> Password: </label>
                <input type="password" name="password" className='border-2' onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <button className='border-2 bg-gray-200'> Login </button>
                </div>
                {data && data}

            </form>   
        </div>
      </>
  )
  }

export default Login