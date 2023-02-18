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

//really crazy copyright date: 2005-04-12

//fetch random photo on load
document.querySelector('body').addEventListener('load', getPhotoByDate())
//fetch requested date on button/enter key
document.querySelector('#form').addEventListener('submit', getPhotoByDate)

async function getPhotoByDate(e){
    e ? e.preventDefault() : null
    let input = document.querySelector('input').value
    input = input ?`date=${input}` : 'count=1'
    console.log(input)
    await fetch(`https://api.nasa.gov/planetary/apod?${input}&thumbs=true&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('explanation').style.marginTop = null
            document.getElementById('copyright').style.marginTop = null
            if(Array.isArray(data)){
                data = data[0]
            }
            console.log(data)
            document.querySelector('#error').innerText = ''
            if(data.msg){
                document.querySelector('#error').innerText = data.msg
                return
            }
            document.getElementById('photoDate').innerText = data.date
            if(data.media_type === 'image'){
                document.querySelector('#video').style.display = 'none'
                document.querySelector('img').src = data.url
                document.body.style.backgroundImage = `url(${data.url})`
            }else{
                if(data.media_type == 'other' || data.media_type == 'gif')console.log('TYPE OTHER GIF!!!!')
                document.querySelector('img').src = ''
                // document.querySelector('img').src = data.thumbnail_url
                document.body.style.backgroundImage = `url(${data.thumbnail_url})`
                document.querySelector('iframe').src = data.url
                document.querySelector('#video').style.display = 'block'
            }
            document.querySelector('#title').innerText = data.title
            let copyrightEl = document.getElementById('copyright')
            let cc = data.copyright
            document.querySelector('#explanation').innerText = data.explanation
            if(cc && (cc.includes('\n') || cc.length > 27)){
                console.log('longggg copyright')
                let newLineCount = 1
                for(char of cc){
                    if(char == String.fromCharCode(10)){
                        console.log('new line counted')
                        newLineCount++
                    }
                }
                /////////////calculate middle of multiple new lines and join with new line there, instead of just first and second words
                if(newLineCount > 2){
                    let noLines = cc.split('\n')
                    let i0 = noLines[0] + '\n' + noLines[1]
                    console.log(i0)
                    cc = i0.concat(noLines.slice(2).join(' '))
                }
                console.log(cc)
                copyrightEl.style.marginTop = "1.6rem"
                document.getElementById('explanation').style.marginTop = "3.5rem"
            }
            
            cc ? copyrightEl.innerText = "\u00A9" + cc : copyrightEl.innerText = ''
        })
        .catch(err => console.log(`Error: ${err}`))
}
