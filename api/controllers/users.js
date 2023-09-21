const { post } = require("superagent");
const User = require("../models/user");


const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    const foundUser = await User.find({email: req.body.email})
    if(foundUser.length > 0){
      console.log(foundUser)
      res.status(400).json({message: 'Email exist in the system. Please login'}) 
    }else{
      
      user.save((err) => {
        if (err) {
          res.status(400).json({message: 'Bad request'})
        } else {
          res.status(201).json({ message: 'OK' });
        }
      });
    }
    },
    
  Index: (req, res) => {
    console.log(req)
    User.findById(req.user_id).exec((err, foundUser)=>{
      res.status(200).json({
        user: foundUser
      })
    })
  }
};


module.exports = UsersController;
