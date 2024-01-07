import { RoverModel as Rover } from "../models/Rover"


export const addRover = (req, res) => {
    const body = req.body

    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must provide an rover to add'
        })
    }

    var rover = new Rover(body)


    if (!rover) {
        return res.status(400).json({ success: false, error: 'Form input error !' })
    }

    console.log(rover)
    rover
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                error: false,
                id: rover._id,
                message: 'Rover added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Rover not added!',
                extra: error
            })
        })
}

export const updateRover = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must fill the form to update this rover data !'
        })
    }

    Rover.findOne({ _id: req.params.id }, (err, rover) => {
        if (err) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Rover not found!',
            })
        }
        rover.name = body.name
        rover.launchDate = body.launchDate
        rover.constructionDate = body.constructionDate
        rover['constructor'] = body['constructor']
        rover.image = body.image
        rover
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    error: false,
                    id: article._id,
                    message: 'Rover data updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success:false,
                    error:true,
                    message: 'Rover data not updated!',
                    extra: error,
                })
            })
    })
}

export const deleteRover = async (req, res) => {
    await Rover.findOneAndDelete({ _id: req.params.id }, (err, rover) => {
        if (err) {
            return res.status(400).json({ success: false, error:true, message: err })
        }

        if (!rover) {
            return res
                .status(404)
                .json({ success: false, error:true, message: `Rover not found or already deleted` })
        }

        return res.status(200).json({ success: true,error:false, data: rover })
    }).catch(err => console.log(err))
}

export const getRoverById = async (req, res) => {
    
    await Article.findOne({ _id: req.params.id }, (err, rover) => {
        if (err) {
            return res.status(400).json({ success: false,  error:true ,message:err })
        }

        if (!article) {
            return res
                .status(404)
                .json({ success: false, error:true,message: `Rover not found` })
        }
        return res.status(200).json({ success: true,error:false, data: rover })
    }).catch(err => console.log(err))
}

export const getRovers = async (req, res) => {
    await Rover.find({}, (err, rovers) => {
        if (err) {
            return res.status(400).json({ success: false, error: true, message:err })
        }
        if (!rovers.length) {
            return res
                .status(404)
                .json({ success: false, error: true,message: `Rovers list empty` })
        }
        return res.status(200).json({ success: true,error:false, data: rovers })
    }).catch(err => console.log(err))
}

