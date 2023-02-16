import { formControlClasses } from "@mui/material";
import react, {useState, useEffect} from "react";
import Calendar from "./Calendar";
import SpecificTimeOfDaySelector from "./SpecificTimeOfDaySelector";
import { Button } from "@mui/material";
import pickAppartIndivisualTimesAndMakeThemMilitary from '../../lib/pickApartIndividuakTimesAndMakeThemMilitary';
import convertMilitaryTimeToRegularTime from "../../lib/convertMilitaryTimeToRegularTime";

function SchedulingStep4({totalAppointmentTime, totalAppointmentTimeInt, setSchedulingStep, setTimeObj, setDateOfAppointment, dateOfAppointment, barberId, dayData, setDayData}){


    const [timeSlotArray, setTimeSlotArray]= useState(null)
    const [activatedTimeSlot, setActivatedTimeSlot]= useState(0)
  
    useEffect(()=>{
        console.log(dayData)
        if(dayData){
            if(dayData.timeSlotsTaken === '' || dayData.timeSlotsTaken === '[]'){

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
                let openTimeSlotArray= []
                function calculateSumOfTwoTimes(time1, time2){
                    let hours
                    let minutes

                    let laterTime =  time1 >= time2 ? time1 : time2
                    let earlierTime = time1 <=  time2 ? time1 : time2

                    let earlierTimeString = earlierTime.toString()
                    let laterTimeString = laterTime.toString()



                    function findTimeHoursAndMinutes(time){
                        let hour
                        let minute
                        if(time.length===3){
                            hour = parseInt(time[0])
                            let minuteString = ''
                            for(let i = 1; i < time.length; i++){
                                minuteString = minuteString + time[i]
                            }
                            minute = parseInt(minuteString)

                        }else{
                            hour = parseInt(time[0]+time[1])
                            minute = parseInt(time[2]+time[3])
                        }

                        return(
                            {
                                hour: hour,
                                minute: minute
                            }
                        )
                    }

                   

                   let earlyTimeCalcObj= findTimeHoursAndMinutes(earlierTimeString, earlyTimeHour, earlyTimeMinute)
                   let laterTimeCalcObj= findTimeHoursAndMinutes(laterTimeString, laterTimehour, laterTimeMinute)

                   let earlyTimeHour= earlyTimeCalcObj.hour
                   let earlyTimeMinute= earlyTimeCalcObj.minute

                   let laterTimehour= laterTimeCalcObj.hour
                   let laterTimeMinute= laterTimeCalcObj.minute

                   let hoursNumber = laterTimehour - earlyTimeHour
                   let minutesNumber
                   
                   if(laterTimeMinute - earlyTimeMinute < 0){
                    hoursNumber = hoursNumber - 1
                    minutesNumber = (laterTimeMinute + 60) - earlyTimeMinute
                   }
                   if(laterTimeMinute - earlyTimeMinute >= 0){
                    minutesNumber = laterTimeMinute - earlyTimeMinute
                   }

                   let finalTime = (hoursNumber * 60) + minutesNumber
                   
                   return finalTime


                }
                function convertToMilitaryTime(time){
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

                    return `${hour}${minute}`

                }



                const timeData = JSON.parse(dayData.timeSlotsTaken)
                
                let militsryTimeData = []
                const availibility=pickAppartIndivisualTimesAndMakeThemMilitary(dayData.availibility)
                const availibiityStart = parseInt(availibility[0])
                const availibilityEnd = parseInt(availibility[1])
                
                timeData.map(time=>{
                    militsryTimeData.push(pickAppartIndivisualTimesAndMakeThemMilitary(time))
                })
                
                let newtimeSlotArray= []
                let firstTimeDetected= false
                let lastTimeDetected= false
                let indexOfMilitaryTimeArray = 0
                
                for(let times of militsryTimeData){
                    
                    if(indexOfMilitaryTimeArray ===militsryTimeData.length-1){
                        lastTimeDetected = true
                    }
                    if(firstTimeDetected===false){
                        if(availibiityStart!== times[0]){
                        let timeSlotOpening = availibiityStart
                        let timeSlotClose = times[0]
                        newtimeSlotArray.push({
                           timeSlot: [convertMilitaryTimeToRegularTime(timeSlotOpening), convertMilitaryTimeToRegularTime(timeSlotClose)],
                           timeAmount: calculateSumOfTwoTimes(timeSlotOpening, timeSlotClose)
                        })
                        firstTimeDetected = true
                        }else{
                        
                        let timeSlotOpening = times[1]
                        let timeSlotClose

                        if(militsryTimeData.length=== 1){
                            timeSlotClose= availibilityEnd
                        }else{
                            timeSlotClose= militsryTimeData[indexOfMilitaryTimeArray+1][0]
                            newtimeSlotArray.push({
                            timeSlot: [convertMilitaryTimeToRegularTime(timeSlotOpening), convertMilitaryTimeToRegularTime(timeSlotClose)],
                            timeAmount: calculateSumOfTwoTimes(timeSlotOpening, timeSlotClose)
                        
                        })
                        }
                         
                       
                        
                        firstTimeDetected = true
                        }
                        
                    }
                    if(lastTimeDetected===true){
                        let timeSlotOpening = times[1]
                        let timeSlotClose= availibilityEnd
                       
                        newtimeSlotArray.push({
                            timeSlot: [convertMilitaryTimeToRegularTime(timeSlotOpening), convertMilitaryTimeToRegularTime(timeSlotClose)],
                            timeAmount: calculateSumOfTwoTimes(timeSlotOpening, timeSlotClose)
                        
                        })
                    }
                    else{
                        
                        let timeSlotOpening = times[1]
                        let timeSlotClose= militsryTimeData[indexOfMilitaryTimeArray+1][0]
                       
                        newtimeSlotArray.push({
                            timeSlot: [convertMilitaryTimeToRegularTime(timeSlotOpening), convertMilitaryTimeToRegularTime(timeSlotClose)],
                            timeAmount: calculateSumOfTwoTimes(timeSlotOpening, timeSlotClose)
                        
                        })
                    }
                    indexOfMilitaryTimeArray++
                }
                const filterTimeSlotsArray = newtimeSlotArray.filter(obj=> obj.timeAmount >= totalAppointmentTimeInt)
                let finalTimeSlotsArray= []

                for(let obj of filterTimeSlotsArray){
                    finalTimeSlotsArray.push(obj.timeSlot)
                }
                setTimeSlotArray(finalTimeSlotsArray)
            }
            
        }
        
    }, [dayData])
    

    return(
        <>
        <Button onClick={()=>{
            setSchedulingStep(previous => previous - 1)
        }} color="secondary">Back</Button>
        <Calendar blockOutUnavailibleDays={true} setDateOfAppointmentData={setDayData} barberId={barberId} disableSelectionsForPreviousDaysPastTodaysDate setDateOfAppointment={setDateOfAppointment} setResetFunction={setActivatedTimeSlot} resetValue={0}/>

        {dateOfAppointment  ? 
        
        <div className="mainDiv"
        style={{
            marginTop: '0px',
            marginBottom: '20px',
            height: 'auto'
        }}
        >

        
        <SpecificTimeOfDaySelector setActivatedTimeSlot={setActivatedTimeSlot} activatedTimeSlot={activatedTimeSlot} dayData={dayData} setSchedulingStep={setSchedulingStep} setTimeObj={setTimeObj} totalAppointmentTimeInt={totalAppointmentTimeInt} totalAppointmentTime={totalAppointmentTime} timeSlotArray={timeSlotArray} dateOfAppointment={dateOfAppointment} />
        </div>
        
        : <> </>}

        </>
    )
}

export default SchedulingStep4