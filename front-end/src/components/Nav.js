import React from "react";
import { Link, useNavigate } from "react-router-dom";  //this is used to make routes link to different pages
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => { //to delete data from local storage and change to signup
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <nav>
            <img src="https://logo.com/image-cdn/images/kts928pd/production/0089b7ae1ed394f041c5f7929e111c11e8eafe4d-424x421.png?w=1080&q=72" alt="logo" className="pic"></img>
            {auth ? <ul className="nav-ul">
                <li>
                <Link to='/product'>Product</Link>
                </li>
                <li>
                    <Link to='/add'>Add Product</Link>
                </li>
                
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/signup' onClick={logout} >Logout ({JSON.parse(auth).name})</Link></li>
               </ul>: 
                <ul className="nav-ul nav-right">
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>Login</Link></li>
                 </ul>
            }   
            </nav>
            
        );
}
// so in nav bar we have made all links to diff pages
export default Nav;
