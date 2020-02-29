const express = require('express')
const router = express.Router()

const Game = require('../../models/Game')

// get all games
router.post('/all', async (req, res) => {
    const { userId }  = req.body

    try {
        const games = await Game.find({userId}).sort({date: -1})

        console.log(games)

        res.json(games)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})

//add game
router.post('/', async (req, res) => {
    const { title, score, userId } = req.body

    try {
        const newGame = new Game({
            userId,
            title,
            score
        })

        const game = await newGame.save()

        res.json(game)
        // res.json({game: "game"})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router