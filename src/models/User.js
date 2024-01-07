import Mongoose from 'mongoose'

export var UserModel = Mongoose.model('User',{
    "pseudo": {
        type:String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "isAdmin" : Boolean,
    "isVerified": Boolean,
})

