import {React,useEffect,useState} from "react";

const AddProduct=()=>{
    
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false);
    
    const addProductbtn=async ()=>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.warn({name,price,category,company});
        const userId=JSON.parse(localStorage.getItem('user'))._id;        
        let result=await fetch('http://localhost:6969/add',{
            method:'Post',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                'Content-Type':'application/Json'
            }
        });
        result=await result.json();
        console.warn(result);
        alert('data saved');
        window.location.reload();
    }
    return(
        <div className="addproduct">
            <div className="center1">  
            <input type='text' placeholder="Enter Product Name" className="inputbox" onChange={(e)=>{setName(e.target.value)}} value={name}></input>
            {error&& !name&& <span className='error'>*Enter Product Name</span>}
            <input type='text' placeholder="Enter Price" className="inputbox" onChange={(e)=>{setPrice(e.target.value)}} value={price}></input>
            {error&& !price && <span className='error'>*Enter Product Name</span>}
            <input type='text' placeholder="Enter Category" className="inputbox"  onChange={(e)=>{setCategory(e.target.value)}} value={category}></input>
            {error&& !category&& <span className='error'>*Enter Product Name</span>}
            <input type='text' placeholder="Enter Company" className="inputbox" value={company}  onChange={(e)=>{setCompany(e.target.value)}}></input>
            {error&& !company&& <span className='error'>*Enter Product Name</span>}
            <button className="btn" onClick={addProductbtn}>AddProduct</button>
            </div>
          
        </div>
    );
}

export default AddProduct;