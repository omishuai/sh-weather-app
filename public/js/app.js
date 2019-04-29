console.log('client js.file is loaded')
/*
//fetch from site
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        //data arrived and then passed
        console.log(data)
    })
})
*/
//fetch from site
/*fetch('http://localhost:3000/weather?search=!').then((response)=>{
    response.json().then((data)=>{
        //data arrived and then passed
        if (data.error) {
            console.log(data.error)
            //console.log(data.error)
        } else console.log(data)
    })
})*/

const weatherform = document.querySelector('form')
const searchElem = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) =>{
    e.preventDefault() 
    const location = searchElem.value
    messageOne.textContent = 'Loading.......'

    console.log('testing submit:', location)
    //only works in local
    //'http://localhogist:3000/weather?search='+location
    fetch('/weather?search='+location).then((response)=>{
    response.json().then((data)=>{
        //data arrived and then passed
        
        if (data.error) {
            messageTwo.textContent = JSON.stringify(data.error)
            messageOne.textContent = ''
            //console.log(data.error)
        } else {
            messageTwo.textContent = '' 
            messageOne.textContent = `forcast: ${data.forcast}\nlocation: ${data.location}\naddress:${data.address}`
        }
    })
})

} )