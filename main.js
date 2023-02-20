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
//short copyright but with a new line element: 2008-09-25
//too long for one line mobile, no new line element: '2010-03-16'

//fetch random photo on load
document.querySelector('body').addEventListener('load', getPhotoByDate())
//fetch requested date on button/enter key
document.querySelector('#form').addEventListener('submit', getPhotoByDate)
//random button
document.querySelector('#random').addEventListener('click', getPhotoByDate)

async function getPhotoByDate(e){
    e?.preventDefault()
    let input = document.querySelector('input').value
    // console.log(e, e?.srcElement.id)
    input = input && e?.srcElement.id == 'form' ?`date=${input}` : 'count=1'
    console.log(input)
    await fetch(`https://api.nasa.gov/planetary/apod?${input}&thumbs=true&api_key=HTx6NaJHwsGSGpIZ8me685Y7LBXNP99XNupNb13g`)
        .then(res => res.json())
        .then(data => {
            // document.getElementById('explanation').style.marginTop = null
            // document.getElementById('copyright').style.marginTop = null
            if(Array.isArray(data)){
                data = data[0]
            }
            console.log(data)
            document.querySelector('#error').innerText = ''
            if(data.msg){
                document.querySelector('#error').innerText = data.msg
                return
            }
            // let date = data.date.slice(5) + '-' + data.date.slice(0,4)
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
            document.querySelector('#explanation').innerText = data.explanation
            let copyrightEl = document.getElementById('copyright')
            let cc = data.copyright
            if(cc && cc.includes('\n')){
                // console.log('longggg copyright', cc)
                // let newLineCount = 1
                // for(char of cc){
                //     if(char == String.fromCharCode(10)){
                //         console.log('new line counted')
                //         newLineCount++
                //     }
                // }
                // if(newLineCount >= 2)
                // if(cc.indexOf('\n') !== cc.lastIndexOf('\n')){
                    // console.log('newlines greater than or equal to 2')
                    cc = cc.split('\n').join(' ')
                    // let middle = Math.floor(noLines.length/2)
                    // let i0 = noLines.length > 2 ? noLines[middle] += '\n' + noLines[middle+1] : noLines
                    // console.log(i0)
                    // cc = i0 !== noLines ? i0.concat(noLines.slice(2).join(' ')) : i0.join(' ')
                // \}
                // if(cc.length > 26){
                //     console.log(cc.length, '> 26')
                //     let spaces = cc.split(' ')
                //     let newcc = []
                //     console.log(spaces)
                //     for(i=0;i<spaces.length;i++){
                //         if(i===0){
                //             newcc.push(spaces[i])
                //         }else if(!newcc[1] && (newcc[0].length + spaces[i].length) <= 26){
                //             console.log('newcc 0 concating',i, newcc[0].length + spaces[i].length)
                //             newcc[0] += ' ' + spaces[i]
                //         }else if((newcc[1] && newcc[1].length + spaces[i].length <= 40)||(newcc[2] && newcc[2].length + spaces[i].length <= 37)){
                //             console.log('newcc 1 or 2 concating',i,newcc[2] ? newcc[1].length + spaces[i].length : newcc[1].length + spaces[i].length)
                //             newcc[2] ? newcc[2] += ' ' + spaces[i] : newcc[1] += ' ' + spaces[i]
                //         }else if(!newcc[1] || !newcc[2]){
                //             console.log('newcc index 1 or 2')
                //             newcc.push('\n' + spaces[i])
                //         }else{
                //             console.log('newcc basic push')
                //             newcc.push(spaces[i])
                //         }
                //     }
                //     console.log(newcc)
                //     cc = newcc.join(' ')
                // }
                // console.log(cc.length)
                // copyrightEl.style.marginTop = "1.6rem"
                // cc.indexOf('\n') !== cc.lastIndexOf('\n') ?
                // document.getElementById('explanation').style.marginTop = "3.5rem" : 
                // document.getElementById('explanation').style.marginTop = "2.5rem"
            }
            cc ? copyrightEl.innerText = "\u00A9" + cc : copyrightEl.innerText = ''
        }
        )
        .catch(err => console.log(`Error: ${err}`))
}
