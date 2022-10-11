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
                let openTimeSlotArray= []

                function pickAppartIndivisualTimesAndMakeThemMilitary(theTwoTimes){
                    let temptime1= ''
                    let temptime2= ''
                    let hitSecondTime = false
                    for(let character of theTwoTimes){
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

                    const militaryTime1 = convertToMilitaryTime(time1)
                    const militaryTime2 = convertToMilitaryTime(time2)

                    return [parseInt(militaryTime1.trim()), parseInt(militaryTime2.trim())]
                }
                function convertToBasicTime(time){
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
                        newtimeSlotArray.push([convertToBasicTime(timeSlotOpening), convertToBasicTime(timeSlotClose)])
                        firstTimeDetected = true
                        }else{
                        let timeSlotOpening = times[1]
                        let timeSlotClose= militsryTimeData[indexOfMilitaryTimeArray+1][0]
                       
                        newtimeSlotArray.push([convertToBasicTime(timeSlotOpening), convertToBasicTime(timeSlotClose)])
                        firstTimeDetected = true
                        }
                        
                    }
                    if(lastTimeDetected===true){
                        let timeSlotOpening = times[1]
                        let timeSlotClose= availibilityEnd
                       
                        newtimeSlotArray.push([convertToBasicTime(timeSlotOpening), convertToBasicTime(timeSlotClose)])
                    }
                    else{
                        
                        let timeSlotOpening = times[1]
                        let timeSlotClose= militsryTimeData[indexOfMilitaryTimeArray+1][0]
                       
                        newtimeSlotArray.push([convertToBasicTime(timeSlotOpening), convertToBasicTime(timeSlotClose)])
                    }
                    indexOfMilitaryTimeArray++
                }
                debugger

                
                // let parentTimeArray = []
                // const timeDataToMap = JSON.parse(dayData.timeSlotsTaken)
                // timeDataToMap.map((availibiltyTime)=>{
                // availibiltyTime = availibiltyTime.toLowerCase()
                // let temptime1= ''
                // let temptime2= ''
                // let hitSecondTime = false
                // for(let character of availibiltyTime){
                //     if(character==='-'){
                //         hitSecondTime = true
                //     }
                //     if(hitSecondTime ===false){
                //         temptime1 = temptime1 + character
                //     }
                //     if(hitSecondTime ===true && character!=='-'){
                //         temptime2 = temptime2 + character
                //     }
                    
                // }
                // let timeArray = []
                // let time1 = temptime1.slice(0, -1)
                // let time2 = temptime2.substring(1).slice(0,-1)
                // timeArray = [time1, time2 ]
                
                // return parentTimeArray.push(timeArray)

                // })
                
                
                // setTimeSlotArray(parentTimeArray)
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