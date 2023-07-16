const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'wihh[oehfdknsiohuuqwndiohewbewhfiujmamf,dsmdk09b9iosewnwioetihuiigatiowioewjiwejioxklmksdfkl'
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost: 5173/'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/', (req, res)=>{
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(user);
    } catch (error) {
        res.status(error).json(error)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user){
        const passOk = bcrypt.compareSync(password, user.password)
        if(passOk){
            jwt.sign({email: user.email, id: user._id}, jwtSecret, {}, (error, token) => {
                if (error) throw error;
                res.cookie('token',token).json(user);
            })
        } else {
            res.status(401).json('incorrect password')
        }
    }else{
        res.status(404).json('user not found')
    }
})

app.get('/profile', async(req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (error, userData)=>{
            if(error) throw error
            const {name, email} = await User.findById(userData.id)
            res.json({name, email})
        })
    }else{
        res.json(null)
    }
})

app.listen(4000);