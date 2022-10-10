import prisma from '../../../lib/prisma'

export default async function handler(req, res){
    const body = req.body
    if(req.method === 'POST'){
        try{
        const barber = await prisma.barber.findUnique({
            where: {
                id: parseInt(body.id)
            },
            include: {
                services: true
            }
        })
       res.json(barber)

    }catch(error){
        console.log(error)
        res.json(error)
    }
    }
    
}