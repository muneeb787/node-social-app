import joi from "joi";

const postSchemaValidator = async (req,res,next) => {
    const {title , description} = req.body;
    const schema = joi.object({
        title: joi.string().min(5).max(50).required(),
        description: joi.string().min(10).max(200).required(),
    })
    
    schema.validate({});
    
    try {
        const value = await schema.validateAsync({ title , description });
        next();
    }
    catch (err) { 
        return res.status(400).json({ success: false, message: err.message });
    }
}

export default postSchemaValidator;