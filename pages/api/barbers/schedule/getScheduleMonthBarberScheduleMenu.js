import React from "react";
import prisma from "../../../../lib/prisma";
import axios from "axios";
import { validateRoute } from "../../../../lib/auth";
import convertToMilitaryTime from "../../../../lib/convertToMilitaryTime";


export default validateRoute(async (req, res, barber)=>{
    if(barber){
        const body = req.body
        console.log(body)
        if(req.method === 'POST'){
            console.log('tried')
            try{
                const month = await prisma.MonthCalendar.findUnique({
                    where: {
                        monthBarberId: {
                            barberId: body.barberId,
                            monthDate: body.monthDate
                        }
                    },
                    include: {
                        days: {
                            include: {
                                appointments: {
                                    where: {
                                        downPaymentPaid: true
                                    }
                                }
                            }
                        },
    
                    }
                })
                
            let newRenderedMonth = {...month}

            for(let day in newRenderedMonth.days){
                
                const sortedAppointments = newRenderedMonth.days[day].appointments.sort((a, b)=>{
                    console.log(convertToMilitaryTime(a.appointmentStartTime))
                    const firstTimeMilitaryTimes = convertToMilitaryTime(a.appointmentStartTime)
                    const secondTimeMilitaryTimes = convertToMilitaryTime(b.appointmentStartTime)
                    return firstTimeMilitaryTimes - secondTimeMilitaryTimes
                })
                
                newRenderedMonth.days[day].appointments= sortedAppointments
            }
            return res.json(newRenderedMonth)
            }catch(error){
                console.log(error)
                return res.json(error)
            }
        }
    }
})