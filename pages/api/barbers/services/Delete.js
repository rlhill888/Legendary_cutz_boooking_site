import prisma from "../../../../lib/prisma";
import { validateRoute } from "../../../../lib/auth";

export default validateRoute(async (req, res, barber)=>{
   
    const body = req.body
    if(barber){
        let findService
        findService = await prisma.service.findUnique({
            where: {
                id: body.id
            }
        })
       if(req.method==='DELETE' && findService.barberId === barber.id){
        let service
    
        try{
            service =  await prisma.service.delete({
                where: {
                    id: body.id
                }
            })
            res.status(200).json({message: 'service deleted'})
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