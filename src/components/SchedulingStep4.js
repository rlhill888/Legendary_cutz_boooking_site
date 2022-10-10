import { formControlClasses } from "@mui/material";
import react, {useState, useEffect} from "react";
import Calendar from "./Calendar";
import SpecificTimeOfDaySelector from "./SpecificTimeOfDaySelector";

function SchedulingStep4({totalAppointmentTime, totalAppointmentTimeInt, setSchedulingStep, setTimeObj, setDateOfAppointment, dateOfAppointment, barberId}){


    console.log(JSON.stringify('10:00am - 1:00PM'))
    // Going to be a variable set up in state. when day is clicked on calendar, a new open time slot array for that day will be pushed up into the variable up in state
    // below is a temp time slot array
    // const timeSlotArray = [
    //     ['10:00am', '12:30pm'],
    //     ['2:00pm', '5:30pm'],
    //     ['6:45pm', '9:00pm']
    // ]
    const [dayData, setDayData]= useState(null)
    const [timeSlotArray, setTimeSlotArray]= useState(null)
  
    useEffect(()=>{
        console.log(dayData)
        if(dayData){
            if(dayData.timeSlotsTaken === ''){

                // setTimeSlotArray([dayData.availibility])
                const availibiltyTime = dayData.availibility.toLowerCase()
                let temptime1= ''
                let temptime2= ''
                let hitSecondTime = false
                for(let character of availibiltyTime){
                    if(character==='-'){
                        hitSecondTime = true
                    }
                    if(hitSecondTime ===false){
                        temptime1 = temptime1 + character
                    }
                    if(hitSecondTime ===true && character!=='-'){
                        temptime2 = temptime2 + character
                    }
                    
                }
                let timeArray = []
                let time1 = temptime1.slice(0, -1)
                let time2 = temptime2.substring(1).slice(0,-1)
                timeArray.push([time1, time2])
                console.log(timeArray)
                setTimeSlotArray(timeArray)
                

                console.log(dayData.availibility)
            }else{
                let parentTimeArray = []
                const timeDataToMap = JSON.parse(dayData.timeSlotsTaken)
                timeDataToMap.map((availibiltyTime)=>{
                availibiltyTime = availibiltyTime.toLowerCase()
                let temptime1= ''
                let temptime2= ''
                let hitSecondTime = false
                for(let character of availibiltyTime){
                    if(character==='-'){
                        hitSecondTime = true
                    }
                    if(hitSecondTime ===false){
                        temptime1 = temptime1 + character
                    }
                    if(hitSecondTime ===true && character!=='-'){
                        temptime2 = temptime2 + character
                    }
                    
                }
                let timeArray = []
                let time1 = temptime1.slice(0, -1)
                let time2 = temptime2.substring(1).slice(0,-1)
                timeArray = [time1, time2 ]
                
                return parentTimeArray.push(timeArray)

                })
                
                
                setTimeSlotArray(parentTimeArray)
            }
            
        }
        
    }, [dayData])
    

    return(
        <>Step 4
        <Calendar setDateOfAppointmentData={setDayData} barberId={barberId} disableSelectionsForPreviousDaysPastTodaysDate setDateOfAppointment={setDateOfAppointment}/>

        {dateOfAppointment  ? <SpecificTimeOfDaySelector dayData={dayData} setSchedulingStep={setSchedulingStep} setTimeObj={setTimeObj} totalAppointmentTimeInt={totalAppointmentTimeInt} totalAppointmentTime={totalAppointmentTime} timeSlotArray={timeSlotArray} dateOfAppointment={dateOfAppointment} /> : <> </>}

        </>
    )
}

export default SchedulingStep4