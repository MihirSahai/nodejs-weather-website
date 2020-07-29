const request = require('postman-request')

const forecast = (lat,long,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5fd7a2347c3e326d1f90c8591d2afb74&query="+ lat +","+ long +"&units=m";
    
    request({url ,json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect to wearther service",undefined)
        }
        else if(body.error)
        {
            callback("Unable to find weather stats", undefined)
        }
        else
        {
            callback(undefined,`Observation Time: ${body.current.observation_time}. ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree Celsius temperature. It feels like ${body.current.feelslike} degrees. There is ${body.current.humidity}% humidity. Wind direction is ${body.current.wind_dir}.`)
        }
    })
}

module.exports = forecast