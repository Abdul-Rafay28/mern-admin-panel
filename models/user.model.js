import mongoose from "mongoose";

const userSchemma = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'user'
    },

    isActive: {
        type: Boolean,
        default: false,
    },
},
    {   
        timestamps: true,
    }


)


const userModel = mongoose.model('users', userSchemma)

export default userModel;