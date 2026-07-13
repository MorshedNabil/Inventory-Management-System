import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async(req,res)=>{

    try{
        const{email , password} = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({success:false, message:"Invalid User Or Password"});

        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({success:false, message:"Invalid User Or Password"});

        }
        const token= jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET, {expiresIn:'2d'});

        return res.status(200).json({success:true, message:"login successful", token , user: {id:user.id, name:user.name, email:user.email, role:user.role}});
    }
    catch(error){
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }

}

export {login};