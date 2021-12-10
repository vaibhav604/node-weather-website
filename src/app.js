const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const app=express();
const port=process.env.PORT || 3000 

const dirPath=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(dirPath))
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vaibhav'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vaibhav'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'Help Section',
        name:'Vaibhav'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error: 'Unable to find location. Try something else.'
            })
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'Unable to get forecast. Try something else.'
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'Vaibhav'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        name:'Vaibhav',
        title:'404',
        message:'Page not found'
    })
})


app.listen(port,()=>{
    console.log('Server is up and running on port '+port);
})


