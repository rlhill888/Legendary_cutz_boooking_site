import prisma from "../../../lib/prisma";


export default async (req, res)=>{

    if(req.method === 'POST'){
        const body = req.body
        console.log(body)

        let appointment
        try{
            appointment = await prisma.appointment.create({
                data: {
                    stripeSessionsId: body.stripeSessionsId,
                    appointmentStartTime: body.appointmentStartTime,
                    appointmentEndTime: body.appointmentEndTime,
                    totalPriceAfterDownPayment: body.totalPriceAfterDownPayment,
                    dateOfAppointment: body.dateOfAppointment,
                    appintmnetCustomerNames: body.appintmnetCustomerNames,
                    phomeNumber: body.phomeNumber,
                    barberId: body.barberId,
                    recieptDetails: body.recieptDetails
                }
            })
            res.json(appointment)
            res.status(200)
        }catch(error){
            res.status(401).json({statusCode: 500, message: error.message})
        return 
        }
    }else{
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

}