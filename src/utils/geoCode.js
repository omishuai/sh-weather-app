const request = require('request')
const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2h1YWk5NTMyIiwiYSI6ImNqdXQ4dGoxcjA1NDg0NHF2aW9sZXFlMTkifQ.OFpIy9cFTPf7Hx1NQd-vtA&limit=1'

    request({url: geoUrl,json: true}, (error, {body}) => {
        //console.log(response.body)
        const {features} = body
        if (error) {
            //second parameter is undefined
            callback({error:'unable to connect to geo service'})
        } else if (features.length === 0) {
            callback({error:'unable to find location, try other names'})
        } else {
            const {center, place_name} = features[0]
            callback(undefined, {'location': center, 'name':place_name})
        }
    })
} 

module.exports = geoCode