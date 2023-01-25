const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    
        email:{
         type: String,
        require:true,
      
    },
    
        password:{
        type:String,
        require:true,
      
    },
 role:{
    type:Number,
    require:true,
 default:0
  
}
},{
    timestamps:true,
})
studentSchema.methods.generateAuthToken= function(){
const token=jwt.sign({_id:this._id},process.env.JWT_PRIVATEKEY)
return token;
}
const validate = (studentback) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
        role: Joi.number().required().label("role"),
	});
	return schema.validate(studentback);
};
const STUDENTBACK=mongoose.model('studentback',studentSchema);

module.exports = {STUDENTBACK, validate };