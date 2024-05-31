const cors=require("cors")
const express=require("express")
const stripe = require("stripe")("sk_test_51PKiK6SCv05u1zKo796byHBpnreMEQrbgG4ML6TxM8rCkzz2kDoJtO6xpUaQF1Bbjx7w9bfs78s7yRbLD6loNasL00hEfUFlj2")
const uuid=require("uuid")
const app=express();





app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    console.log("whts up ginnd")
    res.send("It works at learc")
})
app.post("/payment",(req,res)=>{
    const {product,token}=req.body;
    console.log(product)
    console.log(product.price)
    const idempotencyKey=uuid.v4()
    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            price:product.price*100 ,// always have to multiply by 100 in stripe coz everything comes in cents
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            desciption: product.name,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
            
        }, {idempotencyKey}) ///  The API supports idempotency for safely retrying requests without accidentally performing the same operation twice. 
    }).then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))   
})


app.listen(3001,()=>{console.log("listening at port 3001")})