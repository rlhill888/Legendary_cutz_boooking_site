import React from "react";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(body)

    if(barber){
        let day
        // if(body.blockOutDay){
        //     try{
        //         const updatedAvailibility = await prisma.dayCalendar.update({
        //             where: {
        //                 dayBarberId: {
        //                     date: body.dayData.date,
        //                     barberId: barber.id
        //                 }
        //             },
        //             data: {
        //                 availibility: 'none',
        //                 specialAvailibility: true
        //             }
        //         })
        //         return res.json(updatedAvailibility)
    
        //     }catch(error){
        //         return res.json(error)
        //     }

        // }
        try{
            day = await prisma.dayCalendar.findUnique({
                where: {
                    dayBarberId: {
                        date: body.dayData.date,
                        barberId: barber.id
                    }
                }
            })
            if(!day){
                return res.json({error: 'Day Not Found'}).status(404)
            }
        }catch(error){
            res.json({error: error})
        }
        if(day.availibility === body.availibility){
            return res.json({error: 'Availibility for this day is the same as the one inputted'}).status(422)
        }


        try{
            const updatedAvailibility = await prisma.dayCalendar.update({
                where: {
                    dayBarberId: {
                        date: body.dayData.date,
                        barberId: barber.id
                    }
                },
                data: {
                    availibility: body.availibility,
                    specialAvailibility: true
                }
            })
            res.json(updatedAvailibility)

        }catch(error){
            res.json(error)
        }
    }else{
        res.json({error: 'Unauthorized'}).status(401)
    }
})