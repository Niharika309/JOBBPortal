import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        
    },
    description: {
        type: String,

    },
    logo:{
        type:String, //URL TO COMPANY LOGO
    },

   userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
    
},{timeStamp:true});

export const Company = mongoose.model('Company', companySchema);
