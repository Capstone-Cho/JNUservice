const express = require('express')
const router = express.Router()

const {Video} = require('../models/Video')
const {Subscriber} = require('../models/Subscriber')

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, videos})
        })
})

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body)

    video.save((err, video) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({
            success: true,
        })
    })
})

router.post('/getVideo', (req, res) => {
    Video.findOne({_id: req.body.videoId})
        .populate('writer')
        .exec((err, video) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, video})
        })
})

router.post('/getSubscriptionVideos', (req, res) => {
    //Need to find all of the Users that I am subscribing to From Subscriber Collection

    Subscriber.find({userFrom: req.body.userFrom}).exec((err, subscribers) => {
        if (err) return res.status(400).send(err)

        let subscribedUser = []

        subscribers.map((subscriber, i) => {
            subscribedUser.push(subscriber.userTo)
        })

        //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
        Video.find({writer: {$in: subscribedUser}})
            .populate('writer')
            .exec((err, videos) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success: true, videos})
            })
    })
})

module.exports = router
