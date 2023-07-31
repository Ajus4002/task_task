const  User = require('../models/user')


const createUser = async(req, res)=>{
    const  {userName } = req.body
  
    try{
         
        const user = await User.create({userName})
        res.json(user)
    }
    catch(err){
        console.log(err,"faild to create user")
    }
}




module.exports = { createUser }