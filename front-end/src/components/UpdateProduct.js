import {React,useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
const UpdateProduct=()=>{
    
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false);
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        getProduct();
    },[]);

    const getProduct=async ()=>{
        let result=await fetch(`http://localhost:6969/product/${params.id}`);
        result=await result.json();
        console.log(result)
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateProduct=async ()=>{

        console.warn({name,price,category,company});
        let result=await fetch(`http://localhost:6969/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        }
        )
        result=await result.json();
        console.warn(result);
        navigate('/product')
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
            <button className="btn" onClick={updateProduct}>Update Product</button>
            </div>
          
        </div>
    );
}

export default UpdateProduct;