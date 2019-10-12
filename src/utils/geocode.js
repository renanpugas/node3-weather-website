const request = require("request");

const geocode = (adress, callback)=>{
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoicmVuYW5wdWdhcyIsImEiOiJjazFjZXJ1MGQwZG5kM2xxdDYyejVjZWY1In0._is8yK-HWAlv7hVh1caylg&limit=1`;

    request({url, json: true}, (error, { body }) =>{//{ body } == response.body
        if(error){
            callback("Unable to connect to location service!");
        } else if(body.features.length === 0){
            callback("Unable to find location. Try another search.");
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });

};

module.exports = geocode;