const request = require("request");

const forecast = (latitude, longitude, callback)=>{

    const url = `https://api.darksky.net/forecast/0843eb736cc2e315a6bc40ad2893226f/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, { body })=>{ //{body} vai pegar propriedade response.body
        //json: true faz parse automatico não preciso da linha abaixo
        //const data = JSON.parse(response.body);
        if(error){
            callback("Unable to connect to weather service!");
        } else if(body.error){
            callback("Unable to find location");
        } else {
            callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }

    });

}

module.exports = forecast;