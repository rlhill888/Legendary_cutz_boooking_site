import prisma from '../../../lib/prisma.js'


export default async (req, res)=>{
    const body = req.body
    if(req.method === 'POST'){
        const appointment = await prisma.appointment.findUnique({
        where: {
            stripeSessionsId: body.stripeSessionsId
        }
    })

    if(appointment){
        res.status(200)
        return res.json(appointment)
    }else{
        res.status(404)
        res.json({error: 'Appointemnt Not Found'})
        return 
    }


    }
    
}