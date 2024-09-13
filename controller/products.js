const { Product } = require('../models/products');
const { User } = require('../models/users');
const paginate = require('../utils/paginate.js');

exports.getProoducts = async (req, res)=>{
    const pageLimit = 9;
    const pageNo = req.query.page - 1 || 0;
    const sorting = req.query.sortBy || null;
    const query = req.query.q || null;
    // const filters = req.query.filters;
    const filters = !req.query.filters ? {} : req.query.filters.split('.');
    const filter = !req.query.filters ? {} : {favourite: filters[1]}
    // console.log(!req.query.filters)
    // console.log(filters.split('.'))

    const sortBy = sorting;

    try {
        const { results: products, count: docsCount } = await paginate(Product, query, pageNo, pageLimit, sortBy, filter);

        res.json({
            products,
            docsCount: docsCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
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