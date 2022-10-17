import React from "react";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body

    
    if(barber && body.barberId===barber.id){
        let resArray = []
        console.log(body)
        const today = new Date()
        const updateBarber = await prisma.barber.update({
            where: {
                id: body.barberId
            },
            data: {
                weeklyAvailibility: JSON.stringify(body.weeklySchedule),
                offDays: JSON.stringify(body.daysOffArray)
            }
        })
        const days = await prisma.dayCalendar.findMany({
            where: {
                barber: {
                    id: body.barberId
                }
            }
        })
        const filteredDays = days.filter((day)=>{
            if(day.specialAvailibility ===true){
                return false
            }
            const dayDate = new Date(day.date)

            return dayDate >= today

        })
       

        filteredDays.map(async (day)=>{
            if(body.weeklySchedule[day.weekDayInt]=== null){
                try{
                    const updateDay = await prisma.dayCalendar.update({
                        where: {
                              id: day.id  
                            
                        },
                        data: {
                            availibility: 'none'
                        }
                    })
                    resArray.push(updateDay)
                }catch(error){
                    res.json({error: error}).status(422)
                }  


            }else{
              try{
                const updateDay = await prisma.dayCalendar.update({
                    where: {
                        id: day.id
                    },
                    data: {
                        availibility: body.weeklySchedule[day.weekDayInt]
                    }
                })
             resArray.push(updateDay)

            }catch(error){
                res.json({error: error}).status(422)
            }  


            }
            
        })

        return res.json({sucess: 'sucess'})
    }

})