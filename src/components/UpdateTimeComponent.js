import React, {useState, useEffect} from "react";


function UpdateTimeInputComponent({ setTime, index, weekdayArray, finalizeTime, setError, time}){
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const [startTimeHour, setStartTimeHour]= useState('')
    const [startTimeMinute, setStartTimeMinute]= useState('')
    const [startTimeAmOrPM, setStartTimeAmOrPM]=useState('AM')

    const [endTimeHour, setEndTimeHour]= useState('')
    const [endTimeMinute, setEndTimeMinute]= useState('')
    const [endTimeAmOrPM, setEndTimeAmOrPm]= useState('AM')

    const [setUpTimes, setSEtUpTimes]= useState(false)

    useEffect(()=>{
        if(setUpTimes===false){
            setSEtUpTimes(true)
            if(time[index] === null){
            return 
        }else{
            let tempStartTimeHour= ''
            let tempStartTimeMinute= ''
            let tempStartTimeAmOrPm= ''

            let tempEndTimeHour= ''
            let tempEndTimeMinute= ''
            let tempEndAMOrPM= ''

            const timeString = time[index]

            let timeStart= '' 
            let timeEnd= ''

            let detectedDash = false
            for(let character of timeString){
                if(character==='-'){
                    detectedDash = true
                }
                if(detectedDash === false && character!== '-'){
                    timeStart = timeStart + character
                }
                if(detectedDash === true && character!== '-'){
                    timeEnd = timeEnd + character
                }

            }
            timeStart = timeStart.trim()
            timeEnd = timeEnd.trim()
            let hitStartColon = false
            let hitEndColon = false

            for(let character of timeStart){
                if(character === ':'){
                    hitEndColon= true
                }
                if(hitEndColon === false && character !== ':'){
                    tempEndTimeHour= tempEndTimeHour + character
                }
                if(hitEndColon === true && character !== ':'  && character.toLowerCase()!== 'a' && character.toLocaleLowerCase()!=='p'  && character.toLocaleLowerCase()!=='m'){
                    tempStartTimeMinute= tempStartTimeMinute + character
                }
                if(character.toLowerCase() ==='a'){
                    tempStartTimeAmOrPm = 'AM'
                }
                if(character.toLowerCase() ==='p'){
                    tempStartTimeAmOrPm = 'PM'
                }
            }


            for(let character of timeEnd){
                if(character === ':'){
                    hitStartColon= true
                }
                if(hitStartColon === false && character !== ':'){
                    tempStartTimeHour= tempStartTimeHour + character
                }
                if(hitStartColon === true && character !== ':' && character.toLowerCase()!== 'a' && character.toLocaleLowerCase()!=='p'  && character.toLocaleLowerCase()!=='m'){
                    tempEndTimeMinute= tempEndTimeMinute + character
                }
                if(character.toLowerCase() ==='a'){
                    tempStartTimeAmOrPm = 'AM'
                }
                if(character.toLowerCase() ==='p'){
                    tempEndAMOrPM = 'PM'
                }
            }


            setStartTimeHour(tempStartTimeHour)
            setStartTimeMinute(tempStartTimeMinute)
            setStartTimeAmOrPM(tempStartTimeAmOrPm)

            setEndTimeHour(tempEndTimeHour)
            setEndTimeMinute(tempEndTimeMinute)
            setEndTimeAmOrPm(tempEndAMOrPM)


        }
        }
       
       
    }, [])

    useEffect(()=>{
        finalizeTime()
    }, [finalizeTime])
    function changeHour(e, set){
        const numbers = /^[+]?[0-9]+$/;
        if(e.target.value.match(numbers) ||e.target.value ===''){
            if(e.target.value ===''){
            return set(e.target.value) 
        }
        if(e.target.value<1 || e.target.value > 12){
            return 
        }else{
             
        }
       return set(e.target.value)
        }
    }
    function changeMinute(e, set){
        const numbers = /^[+]?[0-9]+$/;
        if(e.target.value.match(numbers)||e.target.value ==='' ){
        if(e.target.value ===''){
            return set(e.target.value) 
        }
        if(e.target.value.toString().length > 2){
            return 
        }
        if(e.target.value <0 || e.target.value > 59){
            return 
        }else{
            return set(e.target.value) 
        }
    }
    }
    function finalizeTime(){

        if(startTimeHour=== '' || startTimeMinute==='' || endTimeHour === '' || endTimeMinute === ''){
            // return setError(previous=>{
            //     let copyArray = previous
            //     copyArray.push(`Please Make sure a time is filled in for ${weekArray[index]}`)
            //     return copyArray
            // })
            setTime(previous=>{
                let copyArray = previous
                copyArray[index] = null
                return copyArray
            })
            return 
        }
        if(weekdayArray[index]===true){
            setTime(previous=>{
                let copyArray = previous
                copyArray[index] = null
                return copyArray
            })
            return 
        }
        const string = `${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}:${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM} `
        setTime(previous=>{
            let copyArray = previous
            copyArray[index] = string
            return copyArray
        })
    }


    if(weekdayArray[index]===true){
        return(<>
        <h3>Youve Decided to have off on {weekArray[index]}</h3>
        </>)
    }
    return(
        <>
        <div>
            <h3>{weekArray[index]} Schedule</h3>
            <input type='string' value={startTimeHour} onChange={(e)=>{changeHour(e, setStartTimeHour)}}></input>:<input type='string' onChange={(e)=> changeMinute(e, setStartTimeMinute)} value={startTimeMinute}></input>
            <select value={startTimeAmOrPM} onChange={(e)=> setStartTimeAmOrPM(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
            
             - 
             
             <input type='number' value={endTimeHour} onChange={(e)=>{changeHour(e, setEndTimeHour)}}></input>:<input type='string' onChange={(e)=> changeMinute(e, setEndTimeMinute)} value={endTimeMinute}></input>
            <select value={endTimeAmOrPM} onChange={(e)=> setEndTimeAmOrPm(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
        </div>
        </>
    )
}

export default UpdateTimeInputComponent