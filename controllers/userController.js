const { User } = require("../Models/User")
const logger = require("winston");


module.exports.getUser = async(id) => {
    try{
    let user = await User.findOne({email:id})
    return user
    }
    catch(err){
    logger.error(`get user failed due to error:${err}`);  
    }
}

module.exports.postUser = async(body) => {
    try{
    let userDetails = await User.findOne({ email: body.email }) 
    if(userDetails) return  {"message": "User already exits!"}
    let user = await User.create(body)
    let res = await user.save() 
    return res
    }
    catch(err){
    logger.error(`post user failed due to error:${err}`);  
    }
}