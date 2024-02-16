import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
const SignUp=()=>{      
    useEffect(()=>{     //check is user is already logged in if yes then go to home
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })

    const [name,setName]=useState("");
    const[email,setEmail]=useState("");  //initial calue of name email pass set to ""
    const[password,setPassword]=useState("");  
    const navigate=useNavigate();       //made obj or function
    const submit=async ()=>{
        console.warn(name,email,password);
        let result= await fetch("http://localhost:6969/register",{
            method:'post', 
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result); 
        localStorage.setItem('user',JSON.stringify(result));
        if(result){
            navigate('/product')
        }
        
    }

    return(<div className="signUp">
        <div>
            <ul className="flex">
                <li className="innerflex">
                    <label >Name:</label>
                    <input type="text" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                </li>
               
                <li className="innerflex">
                    <label >Email id: </label>
                    <input type="text" id="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                </li>
                <span id="emailMsg" ></span>
                <li className="innerflex">
                    <label >Password: </label>
                    <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                </li>
                <span id="passMsg" ></span>
                <li className="innerflex">
                    <label >Gender:</label>
                    <input type="radio" name="Male" id=""></input>
                    <span>Male</span>
                    <input type="radio" name="Male" id=""></input>
                    <span>Female</span>
                </li>
                <li className="innerflex">
                    <label >Phone number: </label>
                    <input type="text" id="number"></input>
                    <span id="numMsg" ></span>
                </li>
                <button className="btn" onClick={submit}>SignUp</button>
            </ul>
        </div>
    </div>);
}

export default SignUp;