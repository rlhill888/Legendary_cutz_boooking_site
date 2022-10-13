import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(parseInt(body.phoneNumber))
    if(barber && req.method==='PATCH'){
        try{
        const updateBarber = await prisma.barber.update({
                    where: {
                        id: barber.id
                    },
                    data: {
                       name: body.name,
                       gmail: body.gmail,
                       phoneNumber: parseInt(body.phoneNumber),
                       recieveNewAppointmentReminders: body.currentlyRecievingAppointmentReminders,
                       recieveCanceledAppointmentReminders: body.currentlyRecievingCancelReminders
                    }
                })

                return res.json(updateBarber)
        }catch(error){
            return res.json({error: error})
        }
    }

   
})