const http = require('http')
const fs = require('fs') 
const { json } = require('express')

const main = {
    Api: "For all products data Enter : lo--t:3000/api",
    Display: "For all products display Enter : lo--t:3000/html"
}
const html = fs.readFileSync('index.html', 'utf-8')
  
const server = http.createServer((req, res) => { 
    if(req.url.startsWith('/product')){
        let id = req.url.split('/')[2];

        if(id === undefined || id === null){

            // let ids = [];
            // for(let i = 0; i < products.length; i++){
            //     let prdId = products[i];
            //     ids.push(prdId)
            //     res.setHeader('Content-Type', 'text/html')
            //     const index = html.replace('**title**', prdId.title)
            //     .replace('**price**', prdId.price)
            //     .replace('**url**', prdId.thumbnail)
            //     .replace('**rating**', prdId.rating)
            //     res.end(index)
            // } 
            // return
            id = '30';
        } else {
            let product = products.find(p=>p.id===(+id))
            res.setHeader('Content-Type', 'text/html')
            const index = html.replace('**title**', product.title)
            .replace('**price**', product.price)
            .replace('**url**', product.thumbnail)
            .replace('**rating**', product.rating)
            res.end(index)
        }
        return
    }
    switch(req.url){
        case('/'):
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(main))
            break
        case('/api'):
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
            break
        default:
            res.writeHead(404)
    }
})

server.listen(3000, ()=>{  
    console.log('server')
})