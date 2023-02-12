import axios from "axios";
import prisma from "../../../lib/prisma";
import pickAppartIndivisualTimesAndMakeThemMilitary from '../../../lib/pickApartIndividuakTimesAndMakeThemMilitary';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res)=>{
    const body = req.body
    if(req.method === 'POST'){
        const session_id = req.body.session_id

        try{
            const response = await axios({
                method: 'GET',
                url: `http://localhost:3000/api/checkout_sessions/${session_id}`
            })
            if(response.data.payment_status==='paid'){
                const appointmentDay = await prisma.appointment.findUnique({
                    where: { stripeSessionsId: body.session_id},
                    include: {
                        dayCalendar: true
                    }
                })

                const dayCalendar = await prisma.dayCalendar.findUnique({
                    where:{
                        id: appointmentDay.dayId
                    }
                })
                ////
                let timeSlotsTakenArray
                let appointmentTimesWithinSlot = true

                if(dayCalendar.timeSlotsTaken === '' || dayCalendar.timeSlotsTaken==='[]'){
        
                 timeSlotsTakenArray = []
                const militaryTimesForAppointmentTime= pickAppartIndivisualTimesAndMakeThemMilitary(`${appointmentDay.appointmentStartTime} - ${appointmentDay.appointmentEndTime}`)
                
        
               
        
                
        
                
        
                for(let timeSlot of timeSlotsTakenArray){
                    const militaryTimesForTimeSlot = pickAppartIndivisualTimesAndMakeThemMilitary(timeSlot)
                    if((militaryTimesForAppointmentTime[0] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[0] < militaryTimesForTimeSlot[1]) || (militaryTimesForAppointmentTime[1] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[1] < militaryTimesForTimeSlot[1])){
                        appointmentTimesWithinSlot = false
                        return res.status(422).json({error: 'Someone else booked the appointment before the down payment was paid'})
                    }
                }   
        
                }else{
                 timeSlotsTakenArray = JSON.parse(dayCalendar.timeSlotsTaken)
                const militaryTimesForAppointmentTime= pickAppartIndivisualTimesAndMakeThemMilitary(`${appointmentDay.appointmentStartTime} - ${appointmentDay.appointmentEndTime}`)
        
                
        
                
        
                for(let timeSlot of timeSlotsTakenArray){
                    const militaryTimesForTimeSlot = pickAppartIndivisualTimesAndMakeThemMilitary(timeSlot)
                    if((militaryTimesForAppointmentTime[0] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[0] < militaryTimesForTimeSlot[1]) || (militaryTimesForAppointmentTime[1] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[1] < militaryTimesForTimeSlot[1])){
                        appointmentTimesWithinSlot = false
                        return res.status(422).json({error: 'Someone else booked the appointment before the down payment was paid'})
                    }
                }   
                }
                
        
        
                if(appointmentTimesWithinSlot=== true){
                    timeSlotsTakenArray.push(`${appointmentDay.appointmentStartTime} - ${appointmentDay.appointmentEndTime}`)
                }

                timeSlotsTakenArray = timeSlotsTakenArray.sort((a, b)=>{
                    const firstTimeMilitaryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(a)
                    const secondTimeMilitaryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(b)
                    return firstTimeMilitaryTimes[0] - secondTimeMilitaryTimes[0]
                })
                try{
                    const updateDay = await prisma.dayCalendar.update({
                        where: {
                            id: dayCalendar.id
                        },
                        data: {
                            timeSlotsTaken: JSON.stringify(timeSlotsTakenArray) 
                        }
                    })
        
                }catch(error){
                    console.log(error)
                  return  res.json({error: error})
                }

                ///
        
                try{
                   const  appointment = await prisma.appointment.update({
                        where: { stripeSessionsId: body.session_id},
                        data: { downPaymentPaid: true}
                           
                    })
                    console.log('appointmnet:', appointment)
                    res.json(appointment)
                }catch(error){
                    res.json({error: error})
                }
            }else{
                res.status(422).json({error: 'down payment not paid'})
            }
        }catch(error){
            console.log(error)
            res.json({error: error})
        }
    }
        
   
}