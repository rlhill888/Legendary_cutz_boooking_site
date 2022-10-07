import prisma from "../../../../lib/prisma";
import { validateRoute } from "../../../../lib/auth";
import { integerPropType } from "@mui/utils";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(body)
    if(barber && barber.id === body.barberId){
       if(req.method==='POST'){
        let service

        try{
            service =  await prisma.service.create({
                data: {
                    barberId: body.barberId,
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
        res.json({error: 'there was a error'})
    }

   
})