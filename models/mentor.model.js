const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const mentorSchema=new mongoose.Schema({
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
 default:1
  
},
studentlist:[
    {
        student_name:{
            type:String
        },
        student_email:{
            type:String
        }
    }
]
},{
    timestamps:true,
})
mentorSchema.methods.generateAuthToken= function(){
const token=jwt.sign({_id:this._id},process.env.JWT_PRIVATEKEY)
return token;
}
const validate = (mentorback) => {
	const schema = Joi.object({
		name: Joi.string().required().label("name"),
		email: Joi.string().email().required().label("email"),
		password:passwordComplexity().required().label("password"),
       role: Joi.number().required().label("role"),
       studentlist: Joi.array().required().label("studentlist")
	});
	return schema.validate(mentorback);
};
const MENTORBACK=mongoose.model('mentorback',mentorSchema);

module.exports = {MENTORBACK, validate };