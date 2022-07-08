const Music = require('../models/musicModel');

exports.getMusic = (req, res, next) => {
    Music.find({})
        .then(music => {
            res.status(200).json({
                success: true,
                music
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
