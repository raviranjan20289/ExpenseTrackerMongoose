const Expense=require('../models/expense');
const User=require('../models/users');
const sequelize=require('../util/database');

exports.showLeaderBoard=async(req,res,next)=>{
try{

    const leaderboarddetails=await User.find().sort({totalexpenses:-1}).limit(5)


    res.status(201).json({leaderboarddetails});

}
catch(err){
    res.status(500).json({success:false,error:err})
}
  
}
