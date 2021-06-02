const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const { createSecretKey } = require('crypto')
const app = express()

//Define paths for express config
const public = path.join(__dirname,'./public')
const partialsPath  = path.join(__dirname,'./partials')

//const viewsPath = path.join(__dirname,'./templates') -> If i wanted to change the name of my views folder to templates then i have to provide the new path 
//Setup handlebars and engine views location
app.set('view engine','hbs')  //set handle bars  //to make dynamic html document
hbs.registerPartials(partialsPath)
// app.set('views',viewPaths)

//Setup static directory to serve
app.use(express.static(public))
app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather app",
        name: "Mahima Pant"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide address"
        }
        )
    }
    const place=req.query.address
    forecast(place,(error,data)=>{
        if(error)
        {
            res.send({
                error:error
            }
            )
        }
       
        else{
            res.send({
                forecast:"The temperature is "+data.temperature + " degrees, and it feels like "+data.feelslike+" degrees",
                location:data.location
            })
        }
    })
        
    
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About page",
        name: "Mahima Pant"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help page",
        name: "Mahima Pant"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        title:"404: page not found",
        name: "Mahima Pant"
    })
})
app.listen(3000,()=>{
    console.log("Listening at port 3000")
})