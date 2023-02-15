//fetch today's photo on page load
// date for a video to test fetch('https://api.nasa.gov/planetary/apod?date=2021-02-15&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g')

let date = new Date();
let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()

document.querySelector('body').addEventListener('load', getPhotoByDate())
// fetch(`https://api.nasa.gov/planetary/apod?date=${today}&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
//     .then(res => res.json())
//     .then(data => {
//         document.querySelector('.date').innerText = data.date
//         if(data.media_type === 'image'){
//             document.querySelector('iframe').style.display = 'none'
//             document.querySelector('img').src = data.url
//         }else{
//             document.querySelector('iframe').src = data.url
//             document.querySelector('iframe').style.display = 'block'
//         }
//         data.copyright ? document.querySelector('.copyright').innerText = "\u00A9" + data.copyright : null
//         document.querySelector('.explanation').innerText = data.explanation
//         console.log(data)})
//     .catch(err => console.log(`Error: ${err}`))

function getPhotoByDate(e){
    e ? e.preventDefault() : null
    let input = document.querySelector('input').value
    console.log(input)
    input ? today = input : null
    fetch(`https://api.nasa.gov/planetary/apod?date=${today}&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.date').innerText = data.date
            if(data.media_type === 'image'){
                document.querySelector('iframe').style.display = 'none'
                document.querySelector('img').src = data.url
            }else{
                document.querySelector('img').src = ''
                document.querySelector('iframe').src = data.url
                document.querySelector('iframe').style.display = 'block'
            }
            data.copyright ? document.querySelector('.copyright').innerText = "\u00A9" + data.copyright : null
            document.querySelector('.explanation').innerText = data.explanation
            console.log(data)})
        .catch(err => console.log(`Error: ${err}`))
}

document.querySelector('#form').addEventListener('submit', getPhotoByDate)