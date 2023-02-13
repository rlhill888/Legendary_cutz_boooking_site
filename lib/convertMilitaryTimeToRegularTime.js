export default function convertMilitaryTimeToRegularTime(time){
    time = time.toString()
    let hour= ''
    let minute= ''
    let amOrPM
    
    if(time.length=== 3){
        let detectedHour = false
        for(let character of time){

             if(detectedHour===true){
                minute = minute + character
            }
            if(detectedHour===false){
                hour = hour + character
                detectedHour=true
            }
           
        }
    }else{
        let detectedHour = false
        let index = 0
        for(let character of time){
            if(index === 2){
                detectedHour= true
            }
            if(detectedHour===false){
                hour = hour + character
            }
            if(detectedHour===true){
                minute = minute + character
            }
            index++
        }
    }
    
    if(parseInt(hour)<12){
        if(hour === 0){
            hour = '12'
            amOrPM = 'am'
        }else{
            amOrPM = 'am'
        }
    }

    if(parseInt(hour)>=12){
        console.log(hour)
        if(parseInt(hour)===12){
        amOrPM = 'pm'
        }else{
        amOrPM = 'pm'
        const hourInt = parseInt(hour) - 12 
        hour = hourInt.toString()
        }
        
        
    }

    return (`${hour}:${minute} ${amOrPM}`)
}