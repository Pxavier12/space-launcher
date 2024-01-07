import Mongoose from 'mongoose'

//mongoDB connect with mongoose
export function db(dbName){Mongoose.connect('mongodb+srv://pxavier12:Mmoliere123@cluster0.mk0otey.mongodb.net/'+dbName+'?retryWrites=true&w=majority',err=>{
    if (err){
        console.log(err)
    }else{
        console.log('db connected')
    }
})}




