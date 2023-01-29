import prisma from "../../../lib/prisma";

export default async function handler(req, res){
    const body = req.body

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



    if(req.method === 'PATCH'){
        try{
            const appointment = await prisma.appointment.findUnique({
                where: {
                    stripeSessionsId: body.stripeSessionsId
                },
                include: {
                    dayCalendar: true
                }
            })
            if(appointment){
                const dayTimeSlotArray = JSON.parse(appointment.dayCalendar.timeSlotsTaken)
                console.log(dayTimeSlotArray.indexOf(`${createSpaceInTime(appointment.appointmentStartTime)} - ${createSpaceInTime(appointment.appointmentEndTime)}`))
                dayTimeSlotArray.splice( dayTimeSlotArray.indexOf(`${createSpaceInTime(appointment.appointmentStartTime)} - ${createSpaceInTime(appointment.appointmentEndTime)}`), 1)

                const  updatedAppointemtn = await prisma.appointment.update({
                    where:{
                        id: appointment.id
                    },
                    data: {
                        canceledAppointment: true
                    }
                })
                const updatedDayCalendar = await prisma.dayCalendar.update({
                    where: {
                        id: appointment.dayCalendar.id
                    },
                    data: {
                        timeSlotsTaken: JSON.stringify(dayTimeSlotArray)
                    }
                })

                function findNameString(){
                    let string = ''
                    const nameArray = JSON.parse(appointment.appintmnetCustomerNames)
                    if(nameArray.length === 1){
                        return nameArray[0]
                    }else{
                        nameArray.map((name, index)=>{
                            if(index === 0){
                                return string = string + `${name}`
                            }
                            if(index === nameArray.length - 1){
                                return string = string + ` and ${name}`
                            }else{
                                return string = string + `, ${name}`
                            }
                        })
                        return string
                    }
                }

                const today = new Date();
                const date =  (today.getMonth()+1) + '/' +  today.getDate() + '/' + today.getFullYear();
                const time = today.getHours() + ":" + today.getMinutes();

                

                const cancelMessage = await prisma.message.create({
                    data: {
                        title: `Appointment for ${findNameString()} Cancelled`,
                        cancelledAppointmentNotification: true,
                        cancelledAppointmentId: appointment.id,
                        messageText: `Appointment for ${findNameString()} has been cancelled on ${date} at ${time}`,
                        messageData: '',
                        barber:{ 
                            connect:{ 
                                id: appointment.barberId
                            }
                        }
                    }
                })
                console.log(updatedDayCalendar)
                res.json(updatedAppointemtn)
            }else{
                res.json({
                    error: 'appointment Not Found'
                }).status(404)
            }

        }catch(error){
           return  console.log(error)
        }
    }
}