export default function convertToMilitaryTime(time){
    let hitMinute = false
    let amOrPm= ''

    let hour= ''
    let minute= ''

    for(let character of time){
        if(character.toLowerCase() === 'a'){
            amOrPm='am'
            break
        }
        if(character.toLowerCase() === 'p'){
            amOrPm='pm'
            break
        }
        if(hitMinute === false && character!==':'){
            hour = hour + character
        }
        if(hitMinute === true && character!==':'){
            minute = minute + character
        }
        if(character === ':'){
            hitMinute= true
        }
    }

    if(amOrPm==='pm'){
        if(parseInt(hour)===12){

        }else{
            const hourInt = parseInt(hour)
            hour = (hourInt + 12).toString()
            
        }
    }
    if(amOrPm==='am' && parseInt(hour)===12 ){
        hour = '00'

    }

    return `${hour}${minute}`
}