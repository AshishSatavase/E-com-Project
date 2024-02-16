import React,{useEffect} from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    
    const navigate=useNavigate();
    useEffect(()=>{     //check is user is already logged in if yes then go to home
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
   
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const loginbtn=async ()=>{
        console.warn({email,password});
        let result= await fetch('http://localhost:6969/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/');
        }
        else{
            alert("Invalid email and pass")
        }
    }
    return(
        <div className='login'>
            <div className='center'>
            <input type='text' placeholder='Enter Email' className='inputbox'  onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
            <input type='password' placeholder='Enter Password' className='inputbox' onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
            <button className='btn' onClick={loginbtn}>Login</button>
            </div>
        </div>
    );
}

export default Login;