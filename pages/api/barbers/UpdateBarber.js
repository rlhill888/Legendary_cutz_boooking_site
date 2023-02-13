import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    console.log(parseInt(body.phoneNumber))
    if(barber && req.method==='PATCH'){
        try{
        const updateBarber = await prisma.barber.update({
                    where: {
                        id: barber.id
                    },
                    data: {
                       name: body.name,
                       gmail: body.gmail,
                       phoneNumber: body.phoneNumber
                    }
                })

                return res.json(updateBarber)
        }catch(error){
            console.log(error)
            return res.status(422).json({error: error})
        }
    }

   
})