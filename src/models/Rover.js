import Mongoose from 'mongoose'

export var RoverModel = Mongoose.model('Rover',{
    "name": {
        type:String,
        required: true
    },
    "launchDate": {
        type: String,
        required: true
    },
    "constructionDate": {
        type: String,
        required: true
    },
    "manufacturer": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
})

