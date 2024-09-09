const fs = require('fs')
const { Product } = require('../models/products');
const { User } = require('../models/users');
const { title } = require('process');
const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

exports.getProoducts = async (req, res)=>{
    const pageLimit = 9;
    const pageNo = req.query.page - 1 || 0;
    const filters = req.query.filter || null;
    try{
        let products;
        const docsCount = await Product.countDocuments();
        if(filters){
            products = await Product.find().limit(pageLimit).skip(pageLimit * pageNo).sort(filters).exec();
        } else {
            products = await Product.find().limit(pageLimit).skip(pageLimit * pageNo).exec();
        }
        res.json({products, docsCount})
    }catch(e){
        console.log(e)
        res.status(500)
    }
}

exports.addProoduct = async (req, res)=>{
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
    const findQuery = {title: {$regex: name, $options: 'i'}};
    const product = await Product.find(findQuery).then((docs)=>{
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

exports.addRemovFav = async (req, res) => {
    const id = req.query.id;
    try {
        const product = await Product.findById(id).exec();
        if(product.favourite === false){
            product.favourite = true;
        } else {
            product.favourite = false;
        }
        await product.save().then(
            res.status(200).json(product)
        )
    } catch (error) {
        res.json(error)
    }
}