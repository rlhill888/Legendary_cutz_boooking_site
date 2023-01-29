import prisma from '../../../lib/prisma.js'


export default async (req, res)=>{
    const body = req.body
    if(req.method === 'POST'){
        try{
            const appointment = await prisma.appointment.findUnique({
                where: {
                    id: body.id
                }
            })
            console.log(appointment)
            res.json(appointment)

        }catch(error){
            console.log(error)
            res.json({error: 'Appointemnt Not Found'}).status(401)
        }


    }
    
}