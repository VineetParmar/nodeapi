let express = require('express');
let app = express();
// let bodyParser = require('body-parser');
// let cors = require('cors')
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
const { query } = require('express');
let MongoClient = mongo.MongoClient;
// let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;

app.get('/',(req,res) => {
    res.send("My Wardrobe")
}) 

app.get('/items/:collections',(req,res) => {
  db.collection(req.params.collections).find().toArray((err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

app.get('/ftproducts',(req,res) => {
  db.collection('ftproducts').find().toArray((err,result) => {
    if (err) throw err;
    res.send(result)
  })
})
app.get('/products',(req,res) => {
  let genderId = Number(req.query.genderId)
  let typeId = Number (req.query.typeId)
  let query = {}
  if(genderId && typeId){
    query = {product_code:genderId,type_code:typeId}
  }
  else if(genderId){
    query = {product_code:genderId}
  }else if(typeId){
    query = {type_code:typeId}
  }
  db.collection('products').find(query).toArray((err,result) => {
    if (err) throw err;
    res.send(result)
  })
})

app.get('/filter/:proId',(req,res)=>{
  let sort = {cost:1}
  let proId = Number(req.params.proId)
  let tyId = Number(req.query.tyId)
  let lcost = Number(req.query.lcost)
  let hcost = Number(req.query.hcost)
  let query = {}
  if(req.query.sort){
    sort={cost:req.query.sort}
  }
  if(lcost && hcost){
    query={
      product_code:proId,
      $and:[{cost:{$gt:lcost,$lt:hcost}}]
    }
  }
  else if(tyId){
    query = {
      product_code:proId,
      type_code:tyId
    }
  }else{
    query = {
      product_code:proId
    }
  }
    db.collection('products').find(query).sort(sort).toArray((err,result) => {  
      if(err) throw err;
      res.send(result)
    })
  })


  app.get('/details/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('details').find({product_id:id}).toArray((err,result) => {  
      if(err) throw err;
      res.send(result)
    })
  })




  app.get('/orders',(req,res) => {
    let email = req.query.email;
    let query = {}
    if(email){
      query = {email}
      }
    db.collection('order').find(query).toArray((err,result) => {  
      if(err) throw err;
      res.send(result)
    })
  })
    


  // app.get('/orders',(req,res) => {
  //   db.collection('order').find().toArray((err,result) => {  
  //     if(err) throw err;
  //     res.send(result)
  //   })
  // })







//Connection with db
MongoClient.connect(mongoUrl,(err,client) => {
  if(err) console.log('Error While Connecting');
  db = client.db('app');
  // db = client.db('internfeb');
  app.listen(port,(err)=>{
      if(err)throw err;
      console.log(`Express Server listening on port${port}`)
  })
})







  
//   app.get('/menu/:id',(req,res) => {
//     let id = Number(req.params.id)
//     db.collection('menu').find({restaurant_id:id}).toArray((err,result) => {
//       if(err) throw err;
//       res.send(result)
//     })
//   })
  

//   app.get('/order',(req,res)=>{
//     let email=req.query.email;
//     let query={}
//     if(email){
//     // query={email:email)
//     query={email}
//     }
//     db.collection('order').find(query).toArray((err,result)=>{
//     if(err)throw err;
//     res.send(result)
//     })
//     })

//     app.post('placeOrder',(req,res) => {
//       console.log(req.body)
//       res.send('ok')
//     })