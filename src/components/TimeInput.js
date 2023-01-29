import React from "react";
import { useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

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
        <div
        style={{
            textAlign: 'center'
        }}
        >

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
            <TextField 
            style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled"
            type='number' value={startTimeHour} onChange={(e)=>{changeHour(e, setStartTimeHour)}}></TextField>
            
            <p style={{marginTop: '25px'}}>:</p>
            
            <TextField   
            style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled"
            onChange={(e)=> changeMinute(e, setStartTimeMinute)} value={startTimeMinute}></TextField>
            <Select 
            variant="filled"
            style={{
                color: 'white'
            }}
            color="secondary"
            value={startTimeAmOrPM} onChange={(e)=> setStartTimeAmOrPM(e.target.value)}>
                <MenuItem value='AM'>AM</MenuItem>
                <MenuItem value='PM'>PM</MenuItem>
            </Select>

            </div>
             
             <h3
             >To</h3>

             <div 
             style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}
             >

        <TextField style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled" type='number' value={endTimeHour} onChange={(e)=>{changeHour(e, setEndTimeHour)}}></TextField>
            <p style={{marginTop: '25px'}}>:</p>
             
             <TextField  
             style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled"
             onChange={(e)=> changeMinute(e, setEndTimeMinute)} value={endTimeMinute}></TextField>
            <Select 
            variant="filled"
            style={{
                color: 'white'
            }}
            color="secondary"
            value={endTimeAmOrPM} onChange={(e)=> setEndTimeAmOrPm(e.target.value)}>
                <MenuItem value='AM'>AM</MenuItem>
                <MenuItem value='PM'>PM</MenuItem>
            </Select>

             </div>

            
            <br />
            <br />
            <Button color="secondary" variant="contained" onClick={async ()=>{
                if(startTimeHour!=='' && startTimeMinute!== '' && endTimeHour!=='' && endTimeMinute!==''){
                    const fullTimeSlot= `${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}:${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM}`.trim()
                    const startTime=`${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}`.trim()
                    const endTime= `${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM}`.trim()
                    timeFunction(startTime, endTime, fullTimeSlot)
                }else{
                    console.log('Please make sure none of your time inputs are blank')
                }
            }}>{timeFunctionTitle}</Button>
        </div>

        </>
    )
}

export default TimeInput