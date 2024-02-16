const express=require('express');
const cors=require('cors');
require('./db/config');
const Product=require('./db/products');
const User=require('./db/users');
const app=express();

app.use(express.json());  //used to understand that data form postman is json
app.use(cors());            //to solve cors issue which arises when u run api with react

//for sign in api
app.post('/register',async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);    
});
//for login id api
app.post('/login',async (req,resp)=>{
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select('-password');
        if(user){
            resp.send(user);
        }
        else{
            resp.send({result:'NO user found'})
        }
    }
    else{
        resp.send({result:'NO user found'}); 
    }
    
});

//for adding products
app.post('/add',async (req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result);

})


//for searchin products
app.get('/product',async (req,resp)=>{
    let product=await Product.find();
    if(product.length>0){
        resp.send(product);
    }
    else{
        resp.send({result:'No Products Found'});
    }
});

//delete api
app.delete('/product/:id',async (req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id});
    resp.send(result);
})


//for update but to get data and show in input fields
app.get('/product/:id',async (req,resp)=>{
    let result= await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result:'NO DATA FOUND'});
    }
})


//to actually update data in db
app.put('/product/:id', async (req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    );
    resp.send(result);
});


//search api
app.get('/search/:key',async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name: { $regex:req.params.key}},
            {price: { $regex:req.params.key}},
            {company: { $regex:req.params.key}},
            {category: { $regex:req.params.key}},
        ]
    })
    resp.send(result);
});
app.listen(6969);