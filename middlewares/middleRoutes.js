
module.exports = (req,res,next) => {
    
    if (!localStorage.getItem('token'))
        {
            console.log("trying to get ")
            res.status(400).json({ success: false, error: 'User not authorized' })
        }
    else{
        next()
    }
}