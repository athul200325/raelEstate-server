import mongoose from "mongoose";

const lstingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    },
    sell:{
        type:Boolean,
        required:true
    },
    rent:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
    },
    furnished:{
        type:Boolean,
    },
    offer:{
        type:Boolean,
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    dprice:{
        type:Number,
    },
    houseImage:{
        type:String,
        required:true
    },
    conatctNumber:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
    
})

const lisling=mongoose.model("lisling",lstingSchema)

export default lisling