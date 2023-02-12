import React from "react";
import prisma from "../../../../lib/prisma";
import axios from "axios";
import { validateRoute } from "../../../../lib/auth";

export default validateRoute(async (req, res, barber)=>{


    if(barber){
        const body = req.body
        console.log(body)
        try{
            const day = await prisma.dayCalendar.findUnique({
                where: {
                    dayBarberId: {
                        date: body.date,
                        barberId: barber.id
                    }
                },
                include: {
                    appointments: {
                        where: {
                            downPaymentPaid: true
                        }
                    }
                }
            })
            res.json(day)

        }catch(error){
            res.json({error: error})

        }

    }
})