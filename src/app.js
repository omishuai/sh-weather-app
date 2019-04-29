
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000  //HEROKU OR local

//define path for express config
const publicDirPath = path.join(__dirname, '../public')
console.log(publicDirPath)
//serve up the website by specifying where to look for the files to start
app.use(express.static(publicDirPath)) // root dir path

//in order to customize views directory (rename the directory)
console.log(__dirname)
const viewsDirectory = path.join(__dirname, '../templates/views')
app.set('views',viewsDirectory)

//resgitering partials
const hbs = require('hbs')
const partialsDirectory = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsDirectory)

//setup the handle bar  and view location
app.set('view engine','hbs')
//app.set('view', location)
app.set('views', viewsDirectory)

app.get('/', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Shuai Huang'
    }) // match up with the view folder
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name: 'Shuai Huang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        message: 'help here'
    })
})

app.get('/products', (req, res) => {
    //on url, there is search argument
    console.log(req.query.search)
    //error
    //return: avoid running next send
    if (!req.query.search) {
        return res.send({
            error: 'Search parameter is not provided'})
    }
    res.send({products: []})
})



//one server multiple routes 
//app.com   -> main page
//this never gets to run after we set up the express root
/*
app.get('', (req, res)=>{
    //send back html
    res.send(
        '<h1>weather</h1>'

    ) //send back to the requester
})*/

//app.com/help

/* all below will be in the same dir and controlled by public
using express.static('publicDirPath')
app.get('/help', (req, res)=>{
    
    res.send(
        [{
            name: 'Andrew',
            age: 27
        }, {
            name: 'Sarah',
            age: 27
        }]
    )
})

//app.com/about
app.get('/about', (req, res) => {
    res.send('<h1>HTML TITLE</h1>')
})

*/
const chalk = require('chalk')
const location = require('../src/utils/geoCode.js')
const forcast = require('../src/utils/forcast.js')
//weather route
app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "address must be provided"
        })
    }
    
    location(req.query.search, (error, data)=> {
        //console.log('Data', data)
        if (error) {
            console.log('Error:', chalk.red(error))
            res.send(error)
        }
        else {
            //if error occurred, then data responded back is undefined
            console.log(data.location)
            forcast(data.location[1], data.location[0], (forcastError, forcastData) => {
                if (forcastError) {
                    console.log('Error', chalk.red(forcastError))
                    res.send(forcastError)
                }
                else { 
                    console.log('Locaiton:', data.name)
                    console.log(forcastData)
                    res.send(
                        {forcast: forcastData,
                        location: data.name,
                        address: req.query.search})
                }
            })
        }
    })

})

//in case of invalid url, has to be the last call
app.get('*',(req, res) =>{
    //
    //res.send('invalid page')
    res.render('404', {
        title: 'error',
        message: 'The page is not found'
    })
})

//start the server
//port number, callback
//change when deployed to heroku: using port
app.listen(port, ()=>{
    //printing in the console as a debug message
    console.log("server is up on port 3000")
})

