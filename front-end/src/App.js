import './App.css';
import Nav from './components/Nav';
import Footer from './components/footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Product from './components/Product';
import UpdateProduct from './components/UpdateProduct';
import { BrowserRouter, Routes,Route } from 'react-router-dom'; //we need to write nav in this cuz all links are in nav
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent/>}>     
        <Route path='/product' element={<Product/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>This is Logout PAGE</h1>} />
        <Route path='/profile' element={<h1>This is Profie PAGE</h1>} />
        <Route path='/' element={<h1>Home page</h1>} />
        
        </Route>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />

      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
