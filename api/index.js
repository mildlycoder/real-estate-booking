const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'wihh[oehfdknsiohuuqwndiohewbewhfiujmamf,dsmdk09b9iosewnwioetihuiigatiowioewjiwejioxklmksdfkl'
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post('/upload-photo-link', async (req, res)=>{
    const {Link} = req.body;
    const newName = Date.now() + '.jpg'
     await download.image({
        url: Link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})


const photosMiddleware = multer({dest: 'uploads'})
app.post('/upload',photosMiddleware.array('photos', 50)  ,(req, res) => {
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
})

app.post('/place', async (req,res) => {
    const {title, address, addedPhotos, description, perks, checkIn, checkOut, maxCap, price} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, userData)=>{
            const place = await Place.create({
                owner: userData.id,
                title, 
                address,
                photos:addedPhotos, 
                desc: description, 
                perks, 
                checkIn, 
                checkOut,
                maxCap, 
                price
            })
            res.json(place);
    })
})

app.get('/places', async(req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (error, userData)=>{
        const places = await Place.find({owner: userData.id})
        res.json(places);    
    })
})

app.get('/get-all-places', async(req, res) => {
    res.json(await Place.find())
})

app.get('/place-info/:id', async(req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

app.put('/place', async(req, res) => {
    const {token} = req.cookies
    const {id, title, address, addedPhotos, description, perks, checkIn, checkOut, maxCap, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (error, userData)=>{
        const placeDoc =  await Place.findById(id)
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, 
                address,
                photos:addedPhotos, 
                desc: description, 
                perks, 
                checkIn, 
                checkOut,
                maxCap,
                price
            })
            await placeDoc.save()
            res.json('ok')
        }   
    })
})

app.listen(4000);