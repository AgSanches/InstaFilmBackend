'use strict'

const landingController = {
    getLanding: (req, res) => {
        return res.status(200).json({
            hola: "hola"
        })
    }
}


module.exports = landingController;
