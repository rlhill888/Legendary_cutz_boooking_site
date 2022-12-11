import React from "react";
import { useState } from "react";

function TimeInput({timeFunction, timeFunctionTitle}){

    const [startTimeHour, setStartTimeHour]= useState('')
    const [startTimeMinute, setStartTimeMinute]= useState('')
    const [startTimeAmOrPM, setStartTimeAmOrPM]=useState('AM')

    const [endTimeHour, setEndTimeHour]= useState('')
    const [endTimeMinute, setEndTimeMinute]= useState('')
    const [endTimeAmOrPM, setEndTimeAmOrPm]= useState('AM')


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

    return(
        <>
        <div>
            <input type='number' value={startTimeHour} onChange={(e)=>{changeHour(e, setStartTimeHour)}}></input>:<input  onChange={(e)=> changeMinute(e, setStartTimeMinute)} value={startTimeMinute}></input>
            <select value={startTimeAmOrPM} onChange={(e)=> setStartTimeAmOrPM(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
            
             - 
             
             <input type='number' value={endTimeHour} onChange={(e)=>{changeHour(e, setEndTimeHour)}}></input>:<input  onChange={(e)=> changeMinute(e, setEndTimeMinute)} value={endTimeMinute}></input>
            <select value={endTimeAmOrPM} onChange={(e)=> setEndTimeAmOrPm(e.target.value)}>
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
            </select>
            <br />
            <br />
            <button onClick={async ()=>{
                if(startTimeHour!=='' && startTimeMinute!== '' && endTimeHour!=='' && endTimeMinute!==''){
                    const fullTimeSlot= `${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}:${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM}`.trim()
                    const startTime=`${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}`.trim()
                    const endTime= `${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM}`.trim()
                    timeFunction(startTime, endTime, fullTimeSlot)
                }else{
                    console.log('Please make sure none of your time inputs are blank')
                }
            }}>{timeFunctionTitle}</button>
        </div>

        </>
    )
}

export default TimeInput