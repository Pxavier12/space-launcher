
var express = require('express')

var middleRoutes = require('./middleRoutes')

const router = express.Router()


router.all(middleRoutes)


    
module.exports=router
