const request = require('request');


const forecast=(longitude,latitude,callaback)=> {
    const url="http://api.openweathermap.org/data/2.5/weather?lat="+encodeURIComponent(latitude)+"&lon="+encodeURIComponent(longitude)+ "&APPID=399cd6d570bb01124d18e2b6ab993ddb&units=metric"
    request({url,json:true},(error,{body})=>{
        if(error){
            callaback("Unable to connect to weather service",undefined)
        }else if(body.cod!=200){
            callaback("Unable to find location",undefined)
        }else{
            callaback(undefined,"Today's weather is "+body.weather[0].description+ ". It is currently "+body.main.temp +" degrees out. There is humidity of "+(body.main.humidity)+".")
        }
    })
}

module.exports=forecast