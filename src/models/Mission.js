import Mongoose from 'mongoose'

export var MissionModel = Mongoose.model('Mission',{
    "name": {
        type:String,
        required: true
    },
    "country": {
        type:String,
        required: true
    },
    "startDate": {
        type: Date,
        required: true
    },
    "endDate": {
        type: Date,
        required: true
    },
    "rovers": {
        type: Array,
        required: true
    },
})

