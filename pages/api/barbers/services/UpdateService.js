import prisma from "../../../../lib/prisma";
import { validateRoute } from "../../../../lib/auth";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(body)
    if(barber){
        let findService
        findService = await prisma.service.findUnique({
            where: {
                id: body.id
            }
        })
       if(req.method==='PATCH' && findService.barberId === barber.id){
        let service
    
        try{
            service =  await prisma.service.update({
                where: {
                    id: body.id
                },
                data: {
                    time: parseInt(body.time),
                    price: parseFloat(body.price) ,
                    name: body.name
                }
            })
            res.json(service)
            return

        }catch(e){
            res.status(500).json({statusCode: 500, message: e.message})
            return
        }
    }  
    }else{
        res.status(401)
        res.json({error: 'You are unauthorized to make this request'})
    }

   
})