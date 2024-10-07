const express = require('express')

const mongoose = require('mongoose')
const { User } = require('./models/users');
const { sample_users } = require('./data.js');

const router = require('./controller/products.js')
const cors = require('cors')
const env = require('dotenv')
env.config();

const app = express();
const prodsRouter = express.Router();

app.use(
    cors(
        {
          origin: [`${process.env.VERCEL_FRONTEND}`, `${process.env.LOCAL_FRONTEND}`],
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
    })
})

prodsRouter.get('/products', router.getProoducts)
prodsRouter.get('/adminProducts', router.getAdminProducts)
prodsRouter.post('/product', router.addProoduct)
prodsRouter.get('/product/:id', router.getById)
prodsRouter.delete('/product/:id', router.deleteById)
prodsRouter.put('/product', router.addRemovFav)

async function db() {
   await mongoose.connect(`${process.env.DB_URI}`, {
    dbName: 'E-Store'
   });
   seedUsers();
   console.log("MongoDb Working Fine")
}
db().catch((e)=>{ console.log(e + " Error In Mogo Connection") })
 
async function seedUsers() {
    const usersCount = await User.countDocuments();
    if (usersCount > 0) {
      console.log('Users seed is already done!');
      return;
    }
  
    for (let user of sample_users) {
    //   user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
      await User.create(user);
    }
  
    console.log('Users seed is done!');
}

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server Started")
})