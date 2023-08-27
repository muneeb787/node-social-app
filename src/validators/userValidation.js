import joi from "joi";

const userSchemaValidator = async (req,res,next) => {
    const {name , email ,password, role} = req.body;
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email({maxDomainSegments: 2 , tlds: {allow: ['com' , 'net']}}),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        role: joi.string()
    
    })
    
    schema.validate({});
    
    try {
        const value = await schema.validateAsync({ name: name, email : email , password: password, role: role });
        next();
    }
    catch (err) { 
        return res.status(400).json({ success: false, message: err.message });

    }
}

export default userSchemaValidator;