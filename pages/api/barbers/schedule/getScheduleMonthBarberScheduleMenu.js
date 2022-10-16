import React from "react";
import prisma from "../../../../lib/prisma";
import axios from "axios";
import { validateRoute } from "../../../../lib/auth";


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
                                appointments: true
                            }
                        },
    
                    }
                })
                console.log('month:', month)
                return res.json(month)
            }catch(error){
                console.log(error)
                return res.json(error)
            }
        }
    }
})