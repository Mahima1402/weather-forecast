const request = require('request')
const forecast = (address="",callback) =>{
    const url =  "http://api.weatherstack.com/current?access_key=b3e3050d0358f9290eb1823d87b81fd4&query="+address
   // console.log(url)
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable to connect to location service",undefined)

        }
        else if(response.body.error)
        {
            callback("Unable to find the location.Try another search",undefined)
        }
        else{
            callback(undefined,{
                lat:response.body.location.lat,
                lon:response.body.location.lon,
                location:response.body.location.name,
                temperature :response.body.current.temperature,
                feelslike:response.body.current.feelslike
            })
        }
    })
}
module.exports=forecast