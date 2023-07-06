let express = require('express');
let app = express();
let port = process.env.PORT||9120;
let {dbConnect,getData} = require('./controller/dbcontroller')

app.get('/',(req,res) => {
    res.send('Hiii From express')
})

// get all category
app.get('/categories',async (req,res)=>{
    let query = {};
    let collection = "categories"
    let output = await getData(collection,query)
    res.send(output)
})

// get all product
app.get('/products',async (req,res)=>{
    let query = {};
    let collection = "products"
    let output = await getData(collection,query)
    res.send(output)
})

// similar product

app.get('/SimilarItem', async(req,res) => {
    let query = {}
    if(req.query.Ca){
        query={category_id: Number(req.query.categoryid)}
    }else{
        query = {}
    }
    let collection = "SimilarItem";
    let output = await getData(collection,query);
    res.send(output)
})
  
// details product

app.get('/Details', async(req,res) => {
    let query = {}
    if(req.query.SimilarItemid){
        query={SimilarItem_id: Number(req.query.SimilarItemid)}
    }else{
        query = {}
    }
    let collection = "Details";
    let output = await getData(collection,query);
    res.send(output)
})
  


app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`server is running on port ${port}`)
})