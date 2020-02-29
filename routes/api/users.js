const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const uuid = require('uuid')

//register
router.post('/register', async (req, res) => {
    const { email, password }  = req.body

    console.log('registering...')

    try {

        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ errors: ['User already exists'] })
        }

        const authId = uuid.v4()

        user = new User({
            email,
            password,
            authId
        })

        await user.save()

        res.json({authId})

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')   
    }
})

router.post('/hi', (req, res) => {
    res.send('hi')
})

router.post('/login', async (req, res) => {

    const { email, password }  = req.body

    try {

        let user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ errors: ['Username or password is incorrect']})    
        }

        if (password !== user.password) {
            res.status(400).json({ errors: ['Username or password is incorrect']})            
        }

        res.json({authId: user.authId})

    } catch (err) {
 
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})



// router.post('/', [
//     check('email', 'please include a valid eamil')
//         .isEmail(),
//     check('password', 'password must hav emore thn 6 chars')
//         .isLength({min: 6})
// ], async (req, res) => {

//     const errors = validationResult(req)

//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array()})
//     }

//     const { email, password }  = req.body

//     try {
//         let user = await User.findOne({ email })

//         if (user) {
//             res.status(400).json({ error: 'user already exists ' })
//         }

//         user = new User({
//             email,
//             password
//         })

//         await user.save()

//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('server error')   
//     }
// })

module.exports = router