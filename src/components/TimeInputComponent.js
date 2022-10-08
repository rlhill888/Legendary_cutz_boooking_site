import React, {useState, useEffect} from "react";


function TimeInputComponent({ setTime, index, weekdayArray, finalizeTime, setError}){
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const [startTimeHour, setStartTimeHour]= useState('')
    const [startTimeMinute, setStartTimeMinute]= useState('')
    const [startTimeAmOrPM, setStartTimeAmOrPM]=useState('AM')

    const [endTimeHour, setEndTimeHour]= useState('')
    const [endTimeMinute, setEndTimeMinute]= useState('')
    const [endTimeAmOrPM, setEndTimeAmOrPm]= useState('AM')

    useEffect(()=>{
        finalizeTime()
    }, [finalizeTime])
    function changeHour(e, set){
        if(e.target.value ===''){
            return set(e.target.value) 
        }
        if(e.target.value<1 || e.target.value > 12){
            return 
        }else{
            return set(e.target.value)
        }
    }
    function changeMinute(e, set){
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
            <input type='number' value={startTimeHour} onChange={(e)=>{changeHour(e, setStartTimeHour)}}></input>:<input type='number' onChange={(e)=> changeMinute(e, setStartTimeMinute)} value={startTimeMinute}></input>
            <select value={startTimeAmOrPM} onChange={(e)=> setStartTimeAmOrPM(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
            
             - 
             
             <input type='number' value={endTimeHour} onChange={(e)=>{changeHour(e, setEndTimeHour)}}></input>:<input type='number' onChange={(e)=> changeMinute(e, setEndTimeMinute)} value={endTimeMinute}></input>
            <select value={endTimeAmOrPM} onChange={(e)=> setEndTimeAmOrPm(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
        </div>
        </>
    )
}

export default TimeInputComponent