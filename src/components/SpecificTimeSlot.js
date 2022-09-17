import { useState } from "react";
import React from "react";

function SpecificTimeSlot({times, activatedTimeSlot, specificTimeSlotId, setActivatedTimeSlot, totalAppointmentTime, totalAppointmentTimeInt}){
    function calculateLatestAppointmentTime(){
        const startTime = times[0]
        const endTime = times[1]
        console.log(times[1])

        const startTimeHour = findHours(startTime)
        const StartTimeMinutes = findMinutes(startTime)

        let endTimeHour = findHours(endTime)
        let endTimeMinutes = findMinutes(endTime)

        let totalAppointmentHours = 0
        let totalAppointmentMinutes = 0


        console.log(endTimeHour, `:`, endTimeMinutes)

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

              
   
       

                console.log(totalAppointmentHours, ':', totalAppointmentMinutes)
       

        function findHours(time){
            let totaNumber = ''
            let hitColon = false
            let pm = false

            for(let number of time){
                console.log(number)
                if(number === ':'){
                    hitColon = true
                }
                if(hitColon===false && (number !== 'a' || number !== 'p' || number !== 'm')){
                    totaNumber= totaNumber + number
                }
                if(number === 'p' && totaNumber !== '12'){
                    pm = true
                }
                

            }
            if(pm===true){
               
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

        if(finalLatestAppointmentHours > 12){
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

        return(`${finalLatestAppointmentHours}:${ finalLatestAppointmentMinutes < 0 ? '0' : '' }${finalLatestAppointmentMinutes}${pm ? 'pm' : 'am'}`)
        
    }
    
    
   if(activatedTimeSlot === specificTimeSlotId){
    return(
        <>
        <div onClick={()=>{
            setActivatedTimeSlot(specificTimeSlotId)
        }}>
            <h3>From {times[0]} To {times[1]}</h3>

            <h3>Your appointment is {totalAppointmentTime} long</h3>
            <h3>The latest you can start this appointemnt is at {calculateLatestAppointmentTime()}</h3>
            

        </div>
        </>
    )
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