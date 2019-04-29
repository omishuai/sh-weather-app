const request = require('request')
const forcast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3727190c543dacfe03515209f584da72/'+latitude + ','+ longitude;
    //json tag to make sure the data to be json object
    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            //low level error
            callback({error:'unable to connect to weather api'})
        } else if (body.error) {
            callback({error:'coordinate error'})
        } else  {
            //parse to json object
            //const data = JSON.parse(response.body)
            const {temperature: temp, humidity: rain} = body.currently
            const {data} = body.daily
            callback(undefined, data[0].summary + '\n' + `current temperature is ${temp} and the humidity is ${rain}`)
        }
    })
}
module.exports = forcast