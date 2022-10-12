import prisma from "../../../lib/prisma";


export default async (req, res)=>{
   
    if(req.method === 'POST'){
        const body = req.body

        let appointment
        let yearId
        let monthId
        try{
            const year = await prisma.yearCalendar.findUnique({
                where: {
                    yearBarberId: {
                        year: body.year,
                        barberId: body.barberId
                    }
                }
            })
            yearId = year.id
        }catch(error){
            console.log(error)
        }

        try{
            const month = await prisma.monthCalendar.findUnique({
                where: {
                    monthBarberId: {
                        monthDate: body.monthDate,
                        barberId: body.barberId
                    }
                }
            })
            monthId = month.id
        }catch(error){
            console.log(error)
        }
        console.log(yearId)
        
        try{
            appointment = await prisma.appointment.create({
                data: {
                    barber:{ 
                        connect:{ 
                        id: body.barberId}},
                    stripeSessionsId: body.stripeSessionsId,
                    appointmentStartTime: body.appointmentStartTime,
                    appointmentEndTime: body.appointmentEndTime,
                    totalPriceAfterDownPayment: body.totalPriceAfterDownPayment,
                    dateOfAppointment: body.dateOfAppointment,
                    appintmnetCustomerNames: body.appintmnetCustomerNames,
                    phomeNumber: body.phomeNumber,
                    
                    recieptDetails: body.recieptDetails,
                    dayCalendar: {
                        connect: {
                            id: body.dayCalendarId
                        }
                    },
                    yearCalendar: {
                        connect: {
                            id: yearId
                        }
                    },
                    monthCalendar: {
                        connect: {
                            id: monthId
                        }
                    }

                }
            })
            res.json(appointment)
            res.status(200)
        }catch(error){
            console.log(error)
            res.status(401).json({statusCode: 500, message: error.message})
        return 
        }
    }else{
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

}