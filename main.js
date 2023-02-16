//fetch random photo on page load with count=1
//date for a video to test fetch('https://api.nasa.gov/planetary/apod?date=2021-02-15&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g')

//create today's date in proper format
// let date = new Date();
// let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()

//fetch to get all images from certain start date to end date
// fetch(`https://api.nasa.gov/planetary/apod?start_date=2023-02-01&end_date=${today}&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })

//fetch random photo on load
document.querySelector('body').addEventListener('load', getPhotoByDate())
//fetch requested date on button/enter key
document.querySelector('#form').addEventListener('submit', getPhotoByDate)

function getPhotoByDate(e){
    e ? e.preventDefault() : null
    let input = document.querySelector('input').value
    input = input ?`date=${input}` : 'count=1'
    console.log(input)
    fetch(`https://api.nasa.gov/planetary/apod?${input}&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)){
                data = data[0]
            }
            console.log(data)
            document.querySelector('#error').innerText = ''
            if(data.msg){
                document.querySelector('#error').innerText = data.msg
                return
            }
            document.querySelector('.date').innerText = data.date
            if(data.media_type === 'image'){
                document.querySelector('#video').style.display = 'none'
                document.querySelector('img').src = data.url
            }else{
                document.querySelector('img').src = ''
                document.querySelector('iframe').src = data.url
                document.querySelector('#video').style.display = 'block'
            }
            document.querySelector('#title').innerText = data.title
            data.copyright ? document.querySelector('.copyright').innerText = "\u00A9" + data.copyright : document.querySelector('.copyright').innerText = ''
            document.querySelector('.explanation').innerText = data.explanation
        })
        .catch(err => console.log(`Error: ${err}`))
}