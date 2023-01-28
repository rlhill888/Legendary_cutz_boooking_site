import React from "react";
import prisma from "../../../../lib/prisma";
import axios from "axios";
import { validateRoute } from "../../../../lib/auth";
import convertToMilitaryTime from "../../../../lib/convertToMilitaryTime";


export default validateRoute(async (req, res, barber)=>{
    if(barber){
        const body = req.body
        console.log(body)
        if(req.method === 'PATCH'){
            try{
                const day = await prisma.dayCalendar.findUnique({
                    where: {
                        id: body.dayCalendarId
                    }
                })
                console.log(day)
                const blockedOffTimesArray= JSON.parse(day.blockedOffTimesArray)
                const timeSlotTakenArray = JSON.parse(day.timeSlotsTaken)

                //removing blocked off time from blocked off time array array
                blockedOffTimesArray.splice(blockedOffTimesArray.indexOf(body.timeBlockedOff) , 1)

                //removing time slot from time slot array
                timeSlotTakenArray.splice(timeSlotTakenArray.indexOf(body.timeBlockedOff) , 1)
                
                try{
                    const newDay = await prisma.dayCalendar.update({
                        where: {
                            id: body.dayCalendarId
                        },
                        data: {
                            timeSlotsTaken: JSON.stringify(timeSlotTakenArray),
                            blockedOffTimesArray: JSON.stringify(blockedOffTimesArray)
                        } 
                    })
                    console.log(`new blocked off times array: ${blockedOffTimesArray}`)
                    console.log(`New time slot array: ${timeSlotTakenArray}`)

                    res.json(newDay)

                }catch(error){
                    console.log(error)
                    return res.json(error)
                }


                console.log(body.timeBlockedOff)

            }catch(error){
                console.log(error)
                return res.json(error)
            }
        }
    }
})