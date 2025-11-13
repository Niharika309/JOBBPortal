import { application } from "express";
// import mongoose from "mongoose";

// const jobSchema =  new mongoose.Schema({
//     title:{
//         type: String,
//         required: true
//     },
//     description:{
//         type: String,
//         required: true
//     },
//     requirements:[{
//         type: String,
      
//     }],
//     salary:{
//         type: Number,
//         required: true
//     },
//     experinceLevel:{
//         type:Number,
//         required: true,
//     },
//     location:{
//         type: String,
//         required:true
//     },
//     jobType:{
//         type:String,
//         required:true
//     },
//     position :{
//         type:String,
//         required:true
//     },
//     company:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Company',
//         required:true
//     },
//     created_by:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     applications:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Application'
//     }]

// },{timestamps:true});
// export const Job = mongoose.model('Job',jobSchema);







import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
    },
  ],
  salary: {
    type: Number,
    required: true,
  },
  experienceLevel: {
    type: Number,
    required: false,
    // default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  position: {
    type: String, // ⚠️ Change to String, not Number (it’s a role name like “SDE”)
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  created_by: {
    // ⚠️ Typo fixed: was `creaated_by`
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
}, { timestamps: true });

 export const Job = mongoose.model('Job',jobSchema);
