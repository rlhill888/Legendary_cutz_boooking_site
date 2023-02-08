import React from "react";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";
import pickApartIndividualTimesAndMakeThemMilitary from "../../../../lib/pickApartIndividuakTimesAndMakeThemMilitary";
import convertMilitaryTimeToRegularTime from "../../../../lib/convertMilitaryTimeToRegularTime";

export default validateRoute(async (req, res, barber)=>{

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
        if(amOrPm==='am' && parseInt(hour)===12 ){
            hour = '00'

        }

        return `${hour}${minute}`

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

    function createSpaceInTime(time){
        let hitAmOrPm = false
        let index= -1
        let string = ''
        for(let character of time){
            index++
            if(character.toLowerCase() === 'a' || character.toLowerCase() === 'p'){
                hitAmOrPm = true
                string = string + ' '
                break;
            }else{
                string = string + character
            }
            
        }
        const newString = string + time.substring(index)
        return newString
    }


    ///



    if(req.method === 'PATCH' && barber){


        const body = req.body

        try{
        const day = await prisma.dayCalendar.findUnique({
            where: {
                id: body.dayCalendarId
            },
            include: {
                appointments: true
            }
        })

        
        const blockedOffTimesArray = JSON.parse(day.blockedOffTimesArray)
        const timeToBeBlockedOff = body.timeBlockedOff
        const timeSlotsTaken = JSON.parse(day.timeSlotsTaken)
        const timeBlockedOffMilitaryTime = pickAppartIndivisualTimesAndMakeThemMilitary(timeToBeBlockedOff)

        const dayAvailibilityMilitaryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(day.availibility)

        if(blockedOffTimesArray.length >=1){
            for(let time of blockedOffTimesArray){
                const timeSlotMilitaryTime= pickAppartIndivisualTimesAndMakeThemMilitary(time)
                if((timeSlotMilitaryTime[0] > timeBlockedOffMilitaryTime[0] && timeSlotMilitaryTime[0] < timeBlockedOffMilitaryTime[1]) || (timeSlotMilitaryTime[1] > timeBlockedOffMilitaryTime[0] && timeSlotMilitaryTime[1] < timeBlockedOffMilitaryTime[1]) ){
                    res.status(422).send({error: 'Blocked Off Time Interferes With another blocked off time', time: time})
                }
            }  
        }

        if(timeSlotsTaken.length >=1){
            for(let time of timeSlotsTaken){
                const timeSlotMilitaryTime= pickAppartIndivisualTimesAndMakeThemMilitary(time)
                console.log(`${timeSlotMilitaryTime[0]} > ${timeBlockedOffMilitaryTime[0]} and ${timeSlotMilitaryTime[0]} < ${timeBlockedOffMilitaryTime[1]}`)
                if((timeSlotMilitaryTime[0] > timeBlockedOffMilitaryTime[0] && timeSlotMilitaryTime[0] < timeBlockedOffMilitaryTime[1]) || (timeSlotMilitaryTime[1] > timeBlockedOffMilitaryTime[0] && timeSlotMilitaryTime[1] < timeBlockedOffMilitaryTime[1]) ){
                    console.log('true')

                    let stripeSessionsId
                    const appointmentIndex = day.appointments.findIndex(appointment=>{
                    console.log(time)
                    console.log(`${createSpaceInTime(appointment.appointmentStartTime)} - ${ createSpaceInTime(appointment.appointmentEndTime)}`)

                        return time === `${(appointment.appointmentStartTime)} - ${(appointment.appointmentEndTime)}`
                    })

                    console.log(`apppointment index:`, appointmentIndex)
                    stripeSessionsId = day.appointments[appointmentIndex].stripeSessionsId
                    return res.status(422).send({error: 'Blocked Off Time Interferes With a Scheduled Appointment', time: time, stripeSessionsId})
                    
                }else{
                    console.log('false')
                }

            }            
        }

        if((timeBlockedOffMilitaryTime[0] < dayAvailibilityMilitaryTimes[0] || timeBlockedOffMilitaryTime[0] > dayAvailibilityMilitaryTimes[1] || timeBlockedOffMilitaryTime[1] < dayAvailibilityMilitaryTimes[0] || timeBlockedOffMilitaryTime[1] > dayAvailibilityMilitaryTimes[1])){
            
            return res.status(422).send({error: 'Blocked Off Time Is Not Within Day Availibility'})
        }








        
       
        let newBlockedOffTimesArray = [...blockedOffTimesArray, body.timeBlockedOff.toLowerCase()]
   
        try{
            const updatedDay = await prisma.dayCalendar.update({
                where: {
                    id: day.id
                },
                data: {
                    blockedOffTimesArray: JSON.stringify(newBlockedOffTimesArray)
                }
            })
        }catch(error){
            return res.status(405).send('Error adding blocked off time to day')
        }



        

        let newTimeSlotArray = []
        let blockOffTimeStartTime= null
        let blockOffTimeEndTime= null

        for( let timeSlot of timeSlotsTaken){
            const timeSlotMilitraryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(timeSlot)
           
            
            if((timeSlotMilitraryTimes[0] > timeBlockedOffMilitaryTime[0] && timeSlotMilitraryTimes[0] < timeBlockedOffMilitaryTime[1]) || (timeSlotMilitraryTimes[1] > timeBlockedOffMilitaryTime[0] && timeSlotMilitraryTimes[1] < timeBlockedOffMilitaryTime[1]) ){
            
                if( (timeSlotMilitraryTimes[1] > timeBlockedOffMilitaryTime[0] && timeSlotMilitraryTimes[1] < timeBlockedOffMilitaryTime[1]) && timeSlotMilitraryTimes[0] < timeBlockedOffMilitaryTime[0]){
                    blockOffTimeStartTime= timeSlotMilitraryTimes[0]
                }
                

                if(timeSlotMilitraryTimes[1] > timeBlockedOffMilitaryTime[1] ){
                    blockOffTimeEndTime= timeSlotMilitraryTimes[1]
                }

                
            }else{
                newTimeSlotArray.push(timeSlot)
                
            }

        }

        if(!blockOffTimeStartTime){
            blockOffTimeStartTime=  timeBlockedOffMilitaryTime[0]
        }

        if(!blockOffTimeEndTime){
            blockOffTimeEndTime=  timeBlockedOffMilitaryTime[1]
        }


        let timeSlotArray= (JSON.parse(day.timeSlotsTaken))
        let newTimeSlotArrayToSetAsTimeSlotInDataBase= []
        // console.log(newTimeSlotArrayToSetAsTimeSlotInDataBase)

        
        
        // console.log(`TimeSlot Start Time: ${blockOffTimeStartTime}`, `TimeSlot End Time: ${blockOffTimeEndTime}`)
        timeSlotArray.map((timeSlot, index)=>{

            const militaryTimes = pickApartIndividualTimesAndMakeThemMilitary(timeSlot)
            // console.log((militaryTimes[0] > blockOffTimeStartTime && militaryTimes[0] < blockOffTimeEndTime) || (militaryTimes[1] > blockOffTimeStartTime && militaryTimes[1] < blockOffTimeEndTime))

            // console.log('military time 0', militaryTimes[0])
            // console.log('military time 1', militaryTimes[1])
            if((militaryTimes[0] > blockOffTimeStartTime && militaryTimes[0] < blockOffTimeEndTime) || (militaryTimes[1] > blockOffTimeStartTime && militaryTimes[1] < blockOffTimeEndTime)){
                // console.log(newTimeSlotArrayToSetAsTimeSlotInDataBase)
                console.log(`${timeSlot} should be taken out of array`)
                
            }else{
                console.log(`${timeSlot} should remain in array`)
                newTimeSlotArrayToSetAsTimeSlotInDataBase.push(timeSlot)
            }
        })

        

        newTimeSlotArrayToSetAsTimeSlotInDataBase.push(`${convertMilitaryTimeToRegularTime(blockOffTimeStartTime)} - ${convertMilitaryTimeToRegularTime(blockOffTimeEndTime)}`)

        newTimeSlotArrayToSetAsTimeSlotInDataBase.sort((a, b)=>{
            const firstTimeMilitaryTimes = pickApartIndividualTimesAndMakeThemMilitary(a)
            const secondTimeMilitaryTimes = pickApartIndividualTimesAndMakeThemMilitary(b)
            return firstTimeMilitaryTimes[0] - secondTimeMilitaryTimes[0]
        })

        const newDay = await prisma.dayCalendar.update({
            where: {
                id: day.id
            },
            data: {
                timeSlotsTaken: JSON.stringify(newTimeSlotArrayToSetAsTimeSlotInDataBase)
            }
        })


        console.log('newArray', newTimeSlotArrayToSetAsTimeSlotInDataBase)
        console.log(newDay)

        
        res.json(newTimeSlotArrayToSetAsTimeSlotInDataBase)

        


        }catch(error){
            res.status(405).send('Something went wrong')
            console.log(error)
            // res.json(error).status(404)
        }

        
    }

})