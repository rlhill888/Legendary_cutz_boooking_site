import prisma from '../../../lib/prisma'

export default async function handler(req, res){
    if(req.method === 'GET'){
        try{
        const barbers = await prisma.barber.findMany({
            where: {
                barberActive: true
            }
        })
       res.json(barbers)
    }catch(error){
        res.json(error)
    }
    }
    
}