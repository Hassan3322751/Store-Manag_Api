const express = require('express')
const mongoose = require('mongoose')
const router = require('./controller/products.js')
const cors = require('cors')
const env = require('dotenv')
env.config();

const app = express();
const prodsRouter = express.Router();

app.use(
    cors(
        {
          origin: [`${ process.env.VERCEL_FRONTEND }`, `${process.env.LOCAL_FRONTEND}`],
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'DELETE'], 
          allowedHeaders: ['Content-Type', 'Authorization'],
      }
    )
)
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))   //Public files can be access by ---> lo----t:3000/publicFile.html
app.use('/api', prodsRouter)

app.get('/', (req, res)=>{
    res.status(200).json({
        All_Products: '/products',
        Single_Product: '/product/id (e.g. 1,2,3,4,5.....30)',
        Delete_Product: '/product/id (e.g. 1,2,3,4,5.....30)',
        Update_Product: '/product/id (e.g. 1,2,3,4,5.....30)',
        Patch_Product: '/product/id (e.g. 1,2,3,4,5.....30)',
    })
})

prodsRouter.get('/products', router.getProoducts)
prodsRouter.post('/product', router.addProoduct)
prodsRouter.get('/product/:id', router.getById)
prodsRouter.delete('/product/:id', router.deleteById)
prodsRouter.put('/product', router.addRemovFav)

async function db() {
   await mongoose.connect(`${process.env.DB_URI}`, {
    dbName: 'E-Store'
   });
   console.log("MongoDb Working Fine")
}
db().catch((e)=>{ console.log(e + " Error In Mogo Connection") })

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server Started")
})