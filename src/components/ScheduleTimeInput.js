import React, {useState, useEffect} from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";

function ScheduleTimeInput({availibility, dayData, setUpdateData}){
    const [startTimeHour, setStartTimeHour]= useState('')
    const [startTimeMinute, setStartTimeMinute]= useState('')
    const [startTimeAmOrPM, setStartTimeAmOrPM]=useState('AM')

    const [endTimeHour, setEndTimeHour]= useState('')
    const [endTimeMinute, setEndTimeMinute]= useState('')
    const [endTimeAmOrPM, setEndTimeAmOrPm]= useState('AM')
    useEffect(()=>{
        if(availibility === 'none'){
            return 
        }else{
            let tempStartTimeHour= ''
            let tempStartTimeMinute= ''
            let tempStartTimeAmOrPm= ''

            let tempEndTimeHour= ''
            let tempEndTimeMinute= ''
            let tempEndAMOrPM= ''

            const timeString = availibility

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
                    tempStartTimeHour= tempStartTimeHour + character
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
                    tempEndTimeHour= tempEndTimeHour + character
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

            
            setStartTimeHour(tempStartTimeHour.trim())
            setStartTimeMinute(tempStartTimeMinute.trim())
            setStartTimeAmOrPM(tempStartTimeAmOrPm.trim())

            setEndTimeHour(tempEndTimeHour.trim())
            setEndTimeMinute(tempEndTimeMinute.trim())
            setEndTimeAmOrPm(tempEndAMOrPM.trim())


        }
        

    }, [])
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
        <div style={{
            textAlign: 'center'
        }}>
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
            color="secondary" variant="filled" type='number' value={startTimeHour} onChange={(e)=>{changeHour(e, setStartTimeHour)}}></TextField><p style={{marginTop: '25px'}}>:</p><TextField 
            style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled" type='number' onChange={(e)=> changeMinute(e, setStartTimeMinute)} value={startTimeMinute}></TextField>
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
            color="secondary" variant="filled" type='number' value={endTimeHour} onChange={(e)=>{changeHour(e, setEndTimeHour)}}></TextField><p style={{marginTop: '25px'}}>:</p><TextField  style={{
                width: '70px',
            }}
            sx={{ input: { color: 'white' } }}
            color="secondary" variant="filled" onChange={(e)=> changeMinute(e, setEndTimeMinute)} value={endTimeMinute}></TextField>
                <Select 
                variant="filled"
                style={{
                    color: 'white'
                }}
                color="secondary" value={endTimeAmOrPM} onChange={(e)=> setEndTimeAmOrPm(e.target.value)}>
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                </Select>

             </div>
            <br />
            <br />
            <Button color="secondary" variant="contained" onClick={ async ()=>{
                if(startTimeHour!=='' && startTimeMinute!== '' && endTimeHour!=='' && endTimeMinute!==''){
                    const newAvailibility = `${startTimeHour}:${startTimeMinute.length > 1 ? startTimeMinute : `0${startTimeMinute}`} ${startTimeAmOrPM} - ${endTimeHour}:${endTimeMinute.length > 1 ? endTimeMinute : `0${endTimeMinute}`} ${endTimeAmOrPM} `
                    const dayId = dayData.dayId
                    console.log(newAvailibility)
                    try{
                        const response = await axios({
                            method: 'PATCH',
                            url: '/api/barbers/schedule/updateSpecificDayAvailibility',
                            data: {
                                dayData,
                                availibility: newAvailibility
                            }
                        })
                        console.log(response.data)
                        window.location.reload()

                    }catch(error){
                        console.log(error)

                    }
                }else{
                    console.log('Please Make sure none of the time inputs are blank')
                }
            }}>Change Availibility</Button>
        </div>

        </>
    )
}

export default ScheduleTimeInput