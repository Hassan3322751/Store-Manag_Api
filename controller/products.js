const fs = require('fs')
const { Product } = require('../models/products');
const { User } = require('../models/users');
const { configDotenv } = require('dotenv');
const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

exports.getProoducts = async (req, res)=>{
    const docsCount = await Product.countDocuments();
    const pageLimit = 9;
    const pageNo = req.query.page - 1 || 0;
    console.log(pageNo)
    try{
        const products = await Product.find().limit(pageLimit).skip(pageLimit * pageNo).exec();
        res.json({products, docsCount})
    }catch(e){
        console.log(e)
    }
}

exports.addProoduct = async (req, res)=>{
    console.log(req.body)
    const user = new User()
    const product = new Product(req.body)
    product.user = user;
    await user.save()
    await product.save().then((doc)=>{
        res.status(201).json({Products: doc})
    }).catch((err)=>{
        res.json({"Error": err})
    });
}

exports.getByName = async (req, res)=>{ 
    const name = req.query.name;
    const product = await Product.findOne({title: name}).then((docs)=>{
        res.json(docs)
    }).catch((err)=>{
        res.json(err)
    });
}

exports.getById = (req, res)=>{
    const id = +req.params.id;
    const product = data.products.find(p => p.id===id);
    product ? res.json({Product: product}) : res.json({Product: "Product Not Found"})
}
exports.deleteById = (req, res)=>{
    const id = +req.params.id;
    const product = data.products.find(p => p.id===id);
    let removed = data.products.splice(data.products.indexOf(product),1)
    product ? res.json({Product: removed}) : res.json({Product: "Product Not Found"})
}