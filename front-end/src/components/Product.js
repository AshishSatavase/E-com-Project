import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Product = () => {
    useEffect(() => {
        getProducts();
    }, [])
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        let result = await fetch(`http://localhost:6969/product`); //just because we are fething we dont need to write body etc
        result = await result.json();
        setProducts(result);
        console.warn(result);
    }


    const deletebtn=async (id)=>{
        console.log(id);
        let result=await fetch(`http://localhost:6969/product/${id}`,{
            method:'Delete'
        });
        result=await result.json();
        console.log(result);
        if(result){
            getProducts();
        }
    }

    const searchfn=async (event)=>{
        if(event.target.value.length>0){
            console.warn(event.target.value);
            let key=event.target.value;
            let result=await fetch(`http://localhost:6969/search/${key}`,{
                method:'Get',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            result=await result.json();
            console.warn(result);
            if(result){
                setProducts(result); //passing only the values in result in the product var
            }
        }
        else{
            getProducts();
        }
       

    }
    return (
        <div className="productFlex">
            <h1>Products</h1>
            <input type='text'placeholder="Search products" className="search bold" onChange={searchfn} ></input>
            <table border={1} cellPadding={20} cellSpacing={3} className="tablestyle">
                <thead>
                    <th>Sr no.</th>
                    <th >Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>                    
                    <th colSpan={2}>UserID</th>
                    <th colSpan={2}>Operation</th>
                </thead>
                { products.length>0? products.map((item,index)=>
                    <tbody>
                    <tr><td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.company}</td>
                    <td colSpan={2}>{item.userId}</td>
                    <td align="center"><button className="deletebtn" onClick={()=>deletebtn(item._id)}>Delete</button></td>
                    <td align="center"><button className="deletebtn"><Link to={"/update/"   +item._id}>Update</Link></button></td>
                    </tr>
                    </tbody> 
                    ):
                    <tr><td colSpan={9}><h1 className="s" >No Product Found</h1></td></tr>
                    }
            </table>
        </div>
    );
}

export default Product;