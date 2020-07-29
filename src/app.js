const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partial')

//Setup hbs engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) 
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('' ,(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mihir Sahai'
    });
})

app.get('/about',(req,res)=>{
    res.render('about', {
       title: 'About',
       name: 'Mihir Sahai' 
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "Must provide an address"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}= {} )=> {
        if(error)
        {
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     address: req.query.address
    // })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: 'Mihir Sahai'
    })
})

app.get('/products', (req,res) =>{
     if(!req.query.search) {
        return res.send({
             error: "You must provide a search term"
         })
     }

    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        title: '404!',
        errorMsg: 'Help article not found!',
        name: 'Mihir Sahai'
    })
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        title: '404!',
        errorMsg: 'Page not Found!',
        name: 'Mihir Sahai'
    })
})

app.listen(3000, ()=>{
    console.log("Server up on port 3000.");
})
 