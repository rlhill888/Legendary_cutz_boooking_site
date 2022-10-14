import prisma from "../../../lib/prisma";

export default async function handler(req, res){
    const body = req.body
    if(req.method === 'PATCH'){
        try{
            const appointment = await prisma.appointment.findUnique({
                where: {
                    stripeSessionsId: body.stripeSessionsId
                }
            })
            if(appointment){
                const  updatedAppointemtn = await prisma.appointment.update({
                    where:{
                        id: appointment.id
                    },
                    data: {
                        canceledAppointment: true
                    }
                })
                res.json(updatedAppointemtn)
            }else{
                res.json({
                    error: 'appointment Not Found'
                }).status(404)
            }

        }catch(error){
            console.log(error)
        }
    }
}