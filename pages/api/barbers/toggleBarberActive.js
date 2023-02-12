import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(parseInt(body.phoneNumber))
    if(barber.Admin && req.method==='PATCH' && barber){
        try{
            const updateBarber = await prisma.barber.update({
            where: {
                id: body.barberId,
            },
            data: {
                barberActive: body.barberActiveValue
            }
        })
        return res.json(updateBarber)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }else{
        return res.status(401).json('you are not authorized to make this request')
    }

   
})