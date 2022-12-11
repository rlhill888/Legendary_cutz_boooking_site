import { useState } from "react";
import React from "react";

function SpecificTimeSlot({times, activatedTimeSlot, specificTimeSlotId, setActivatedTimeSlot, totalAppointmentTime, totalAppointmentTimeInt, setTimeObj, setSchedulingStep}){

    const latestAppointmentTime = calculateLatestAppointmentTime()
    const [AppointmentHour, setAppointmentHour]= useState('')
    const [appointmentMinute, setAppointemntMinute]= useState('')
    const [amOrPm, setAmorPm]= useState('pm')
    const [error, setError]= useState(<> </>)

    function calculateLatestAppointmentTime(){
        const startTime = times[0]
        const endTime = times[1]
        
        const startTimeHour = findHours(startTime)
        const StartTimeMinutes = findMinutes(startTime)

        let endTimeHour = findHours(endTime)
        let endTimeMinutes = findMinutes(endTime)

        let totalAppointmentHours = 0
        let totalAppointmentMinutes = 0

        function calculateHoursAndMinutes(){
             let tempHours = 0;
                   let remaindingTime = totalAppointmentTimeInt

                   while(remaindingTime  > 60){
                        tempHours++
                        remaindingTime =  remaindingTime - 60
                   }

                   totalAppointmentHours = tempHours
                   totalAppointmentMinutes =  remaindingTime

        }
        calculateHoursAndMinutes()
       

        function findHours(time){
            let totaNumber = ''
            let hitColon = false
            let pm = false

            for(let number of time){
                if(number === ':'){
                    hitColon = true
                }
                if(hitColon===false && (number !== 'a' || number !== 'p' || number !== 'm')){
                    totaNumber= totaNumber + number
                }
                if(number === 'p'){
                    pm = true
                }
                

            }
            
            
            if(pm===false && totaNumber.trim() ==='12'){
                totaNumber = '00'
            }
           
            if(pm===true && totaNumber.trim()!=='12'){
                
                totaNumber =  parseInt(totaNumber) + 12
            }
            
            return parseInt(totaNumber)

        }

        let finalLatestAppointmentMinutes = 0
        let finalLatestAppointmentHours = 0

        if((endTimeMinutes - totalAppointmentMinutes) < 0 ){
            
            endTimeHour = endTimeHour - 1
            endTimeMinutes = endTimeMinutes + 60

            finalLatestAppointmentMinutes = endTimeMinutes - totalAppointmentMinutes
            finalLatestAppointmentHours = endTimeHour - totalAppointmentHours

        }
        if((endTimeMinutes - totalAppointmentMinutes) >= 0){
            finalLatestAppointmentMinutes = endTimeMinutes - totalAppointmentMinutes
            finalLatestAppointmentHours = endTimeHour - totalAppointmentHours
        }

        let pm = false

        if(finalLatestAppointmentHours > 11){
            finalLatestAppointmentHours = finalLatestAppointmentHours - 12
            pm = true
        }

        
        function findMinutes(time){

            let totalNumber = ''
            let hitColon = false

            for(let number of time){

                if(hitColon === true){
                    totalNumber = totalNumber + number
                }
                if(number === ':'){
                    hitColon = true
                    

                }
                
            }
            return(parseInt(totalNumber))

        }

        return(`${finalLatestAppointmentHours}:${ finalLatestAppointmentMinutes < 10 ? '0' : '' }${finalLatestAppointmentMinutes}${pm ? 'pm' : 'am'}`)
        
    }

    function checkAppointmentTimes(time1, time2, appointmentTime, dedicatedAppointmentStartTime){

        let returnObject = {
            appointmentEndTime: null,
            appointmentTimeWithinTimeFrames: null

        }
        let time1Hour = findHours(time1)
        let time1Minutes= findMinutes(time1)
        let time2Hour= findHours(time2)
        let time2Minutes= findMinutes(time2)
        let dedicatedAppointmentStartTimeHours = findHours(dedicatedAppointmentStartTime)
        let dedicatedAppointmentStartTimeMinutes = findMinutes(dedicatedAppointmentStartTime)

        console.log(dedicatedAppointmentStartTime)

        console.log( 'should say 12:',dedicatedAppointmentStartTimeHours)

        let totalAppointmentHours 
        let totalAppointmentMinutes
        calculateAppointmentHoursAndMinutes()
        returnObject.appointmentEndTime = calculateStartTimePlusAppointmentTime()

        function calculateStartTimePlusAppointmentTime(){
            let finalAppointmentHour = dedicatedAppointmentStartTimeHours
            let finalAppointmentMinutes 
            let pm = false
            if((dedicatedAppointmentStartTimeMinutes + totalAppointmentMinutes) > 59 ){
                
                finalAppointmentHour = finalAppointmentHour + 1 + totalAppointmentHours
                finalAppointmentMinutes = (dedicatedAppointmentStartTimeMinutes + totalAppointmentMinutes) - 60
                if(finalAppointmentHour>=12){
                    pm = true
                    if(finalAppointmentHour!==12){
                        finalAppointmentHour = finalAppointmentHour - 12
                    }
                }
                return `${finalAppointmentHour}:${ finalAppointmentMinutes < 9 ? `0${finalAppointmentMinutes}` : finalAppointmentMinutes}${pm ? 'pm' : 'am'}`
            }else{
                
                finalAppointmentHour = finalAppointmentHour + totalAppointmentHours
                finalAppointmentMinutes = dedicatedAppointmentStartTimeMinutes + totalAppointmentMinutes
                if(finalAppointmentHour>=12){
                    pm = true
                    if(finalAppointmentHour!==12){
                        finalAppointmentHour = finalAppointmentHour - 12
                    }
                }
                return `${finalAppointmentHour}:${ finalAppointmentMinutes < 10 ? `0${finalAppointmentMinutes}` : finalAppointmentMinutes}${pm ? 'pm' : 'am'}`
            }
        }



        let finalLatestAppointmentMinutes = 0
        let finalLatestAppointmentHours = 0

        if((time2Minutes - totalAppointmentMinutes) < 0 ){
            
            time2Hour = time2Hour - 1
            time2Minutes = time2Minutes + 60

            finalLatestAppointmentMinutes = time2Minutes - totalAppointmentMinutes
            finalLatestAppointmentHours = time2Hour - totalAppointmentHours

        }
        if((time2Minutes - totalAppointmentMinutes) >= 0){
            finalLatestAppointmentMinutes = time2Minutes - totalAppointmentMinutes
            finalLatestAppointmentHours = time2Hour - totalAppointmentHours
        }

        findIfAppointmentTimeIsWithinTimeFrames()
        

        function findIfAppointmentTimeIsWithinTimeFrames(){
            let dedicatedAppointmentStartTimeTotalNum = parseInt((dedicatedAppointmentStartTimeHours).toString() + ((dedicatedAppointmentStartTimeMinutes).toString().length < 2 ? ('0' + (dedicatedAppointmentStartTimeMinutes).toString()) : (dedicatedAppointmentStartTimeMinutes).toString()))
            let endTimeTotalNum = parseInt((finalLatestAppointmentHours).toString() + ((finalLatestAppointmentMinutes).toString().length < 2 ? ('0' + (finalLatestAppointmentMinutes).toString()) : (finalLatestAppointmentMinutes).toString()))
            let appointmentStartTimeTotalNum = parseInt((time1Hour).toString() + ((time1Minutes).toString().length < 2 ? ('0' + (time1Minutes).toString() ): (time1Minutes).toString()))
            if(dedicatedAppointmentStartTimeTotalNum >= appointmentStartTimeTotalNum && dedicatedAppointmentStartTimeTotalNum <= endTimeTotalNum){
                return returnObject.appointmentTimeWithinTimeFrames = true
            }else{
                if(dedicatedAppointmentStartTimeTotalNum < appointmentStartTimeTotalNum){
                    return returnObject.appointmentTimeWithinTimeFrames = 'too early'
                }
                if(dedicatedAppointmentStartTimeTotalNum > endTimeTotalNum){
                    return returnObject.appointmentTimeWithinTimeFrames = 'too late'
                }
            }

        }



        





        function findHours(time){
            let totaNumber = ''
            let hitColon = false
            let pm = false

            for(let number of time){
                if(number === ':'){
                    hitColon = true
                }
                if(hitColon===false && (number !== 'a' || number !== 'p' || number !== 'm')){
                    totaNumber= totaNumber + number
                }
                if(number === 'p'){
                    pm = true
                }
                

            }
            if(pm===false && totaNumber.trim() ==='12'){
                totaNumber = '00'
            }
            
            if(pm===true && totaNumber.trim()!=='12'){
                totaNumber =  parseInt(totaNumber) + 12
            }

            return parseInt(totaNumber)

        }

        function findMinutes(time){

            let totalNumber = ''
            let hitColon = false

            for(let number of time){

                if(hitColon === true){
                    totalNumber = totalNumber + number
                }
                if(number === ':'){
                    hitColon = true
                    

                }
                
            }
            return(parseInt(totalNumber))

        }


        function calculateAppointmentHoursAndMinutes(){
            let tempHours = 0;
                  let remaindingTime = appointmentTime

                  while(remaindingTime  > 60){
                       tempHours++
                       remaindingTime =  remaindingTime - 60
                  }

                  totalAppointmentHours = tempHours
                  totalAppointmentMinutes =  remaindingTime

       }

       return returnObject


    }
    
    
   if(activatedTimeSlot === specificTimeSlotId){
    return(
        <>
        <div onClick={()=>{
            setActivatedTimeSlot(specificTimeSlotId)
        }}>
            <h3>From {times[0]} To {times[1]}</h3>

            <h3>Your appointment is {totalAppointmentTime} long</h3>
            
           
            <h3> You can start your appointment at any time from {times[0]} - {latestAppointmentTime}.
              <br />
              <br />
                The latest you can start this appointemnt is at {latestAppointmentTime}. </h3>
             <h3>What time would you like to start your appointemnt?</h3>
             <br />
            

             
             <div
             style={{
                display: 'flex',
                flexDirection: 'row'
             }}
             >
                
                <input type='number'  value={AppointmentHour} onChange={(e)=> {
                    if(e.target.value<=12 && e.target.value.toString().length <= 2 && e.target.value.toString() !== '-'){
                        setAppointmentHour(e.target.value)
                    }
                    else{
                        return
                    }
                    
                    
                    }} max={2}></input> 
                <h3>:</h3>
                 <input type='number' value={appointmentMinute} onChange={(e)=>{
                        if(e.target.value >59 || e.target.value.toString().length >2){
                            return
                        }else{
                            setAppointemntMinute(e.target.value)
                        }
                 }} maxLength={2}></input>
                <select onChange={(e)=> setAmorPm(e.target.value)} value={amOrPm}>
                    <option value={'pm'}>pm</option>
                    <option value={'am'}>am</option>
                </select>
             </div>
             <br />

             {error}
             <br />
             <button onClick={()=>{
                let dedicatedAppointmentTime = `${AppointmentHour}:${appointmentMinute}${amOrPm}`
                let timeObj = checkAppointmentTimes(times[0], times[1], totalAppointmentTimeInt, dedicatedAppointmentTime)
                
                if(timeObj.appointmentTimeWithinTimeFrames === true){
                    timeObj = {...timeObj, appointmentStartTime: dedicatedAppointmentTime}
                    setError(<></>)
                    setTimeObj(timeObj)
                    setSchedulingStep(previousValue=> previousValue + 1) 
                }else{
                    if(timeObj.appointmentTimeWithinTimeFrames==='too early'){
                       return  setError(<>
                        <div>
                            <h2>{dedicatedAppointmentTime} is too early to start your appointment. Pick a time no earlier then {times[0]} </h2>
                        </div>
                        </>)
                    }
                    if(timeObj.appointmentTimeWithinTimeFrames==='too late'){
                        return setError(<>
                            <div>
                                <h2>{dedicatedAppointmentTime} is too late to start your appointment. Pick a time no later then {times[1]} </h2>
                            </div>
                            </>)
                    }
                    else{

                       return  setError(<>
                            <div>
                                <h2>Please pick a time that is from {times[0]} - {times[1]} </h2>
                            </div>
                            </>)

                    }
                    console.log(timeObj.appointmentTimeWithinTimeFrames)
                }
             }}>Next</button>
           
            

        </div>
        </>
    )
   }
   if(!times){
    return <h1>Loading</h1>
   }

    return(
        <>

        <div
        onClick={()=>{
            setActivatedTimeSlot(specificTimeSlotId)
        }}
        >
            <h3>From {times[0]} To {times[1]}</h3>

        </div>
        
        </>
    )
}

export default SpecificTimeSlot