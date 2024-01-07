import { MissionModel as Mission } from "../models/Mission"


export const addMission = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must provide an mission to add'
        })
    }

    var mission = new Mission(body)


    if (!mission) {
        return res.status(400).json({ success: false, error: 'Form input error !' })
    }

    mission
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                error: false,
                id: mission._id,
                message: 'Mission added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Mission not added!',
                extra: error
            })
        })
}

export const updateMission = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must fill the form to update this mission data !'
        })
    }

    Mission.findOne({ _id: req.params.id }, (err, mission) => {
        if (err) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Mission not found!',
            })
        }
        mission.name = body.name
        mission.country = body.country
        mission.startDate = body.startDate
        mission.endDate = body.endDate
        mission.rovers = body.rovers
        mission
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    error: false,
                    id: article._id,
                    message: 'Mission data updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    success:false,
                    error:true,
                    message: 'Mission data not updated!',
                    extra: error,
                })
            })
    })
}

export const deleteMission = async (req, res) => {
    await Mission.findOneAndDelete({ _id: req.params.id }, (err, mission) => {
        if (err) {
            return res.status(400).json({ success: false, error:true, message: err })
        }

        if (!mission) {
            return res
                .status(404)
                .json({ success: false, error:true, message: `Mission not found or already deleted` })
        }

        return res.status(200).json({ success: true,error:false, data: mission })
    }).catch(err => console.log(err))
}

export const getMissionById = async (req, res) => {
    
    await Article.findOne({ _id: req.params.id }, (err, mission) => {
        if (err) {
            return res.status(400).json({ success: false,  error:true ,message:err })
        }

        if (!article) {
            return res
                .status(404)
                .json({ success: false, error:true,message: `Mission not found` })
        }
        return res.status(200).json({ success: true,error:false, data: mission })
    }).catch(err => console.log(err))
}

export const getMissions = async (req, res) => {
    await Mission.find({}, (err, missions) => {
        if (err) {
            return res.status(400).json({ success: false, error: true, message:err })
        }
        if (!missions.length) {
            return res
                .status(404)
                .json({ success: false, error: true,message: `Missions list empty` })
        }
        return res.status(200).json({ success: true,error:false, data: missions })
    }).catch(err => console.log(err))
}

