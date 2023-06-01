const express=require('express');

const app=express();

const cors=require('cors');

const helmet=require('helmet');

const morgan=require('morgan');

const fs=require('fs');

const path = require('path');

require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'public')));

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
const errorLogStream=fs.createWriteStream(path.join(__dirname,'error.log'),{flags:'a'})
app.use(cors());


app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "https://cdn.jsdelivr.net https://checkout.razorpay.com ");
    next();
  });

app.use(morgan('combined',{stream:accessLogStream}));
app.use(morgan('combined',{stream:errorLogStream,skip:(req,res)=>res.statusCode<400}));

const UserRoutes=require('./routes/users');

const ExpenseRoutes=require('./routes/expense');

const PurchaseRoutes=require('./routes/purchase');

const PremiumRoutes=require('./routes/premium');

const PasswordRoutes=require('./routes/forgotpassword');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');


 const User=require('./models/users');
const Expense=require('./models/expense');
const Order=require('./models/orders');
const ForgotPassword=require('./models/forgotpassword');
const DowloadedFiles=require('./models/downloadedfile');





app.use(bodyParser.json({extended:false}));


app.use('/user',UserRoutes);

app.use('/expense',ExpenseRoutes);

app.use('/purchase',PurchaseRoutes);

app.use('/premium',PremiumRoutes);

app.use('/password',PasswordRoutes);

app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})
app.use('/',(req,res,next)=>{
    res.status(404).send("<h1>OOPS! Page Not Found </h1>");
})

mongoose
.connect(process.env.MONGOOSE_DB)
.then(()=>{
    console.log("Connected!!");
})
.then(()=>{
    app.listen(process.env.PORT||3000);
}).catch(err=>console.log(err));

