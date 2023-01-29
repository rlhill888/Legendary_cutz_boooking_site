import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
  console.log('hit route')
    if(barber){
        try{
            const barbersMessages = await prisma.message.findMany({
                where: {
                    barberId: barber.id
                }
            })
            res.json(barbersMessages.reverse())

        }catch(error){
            return res.json({error: error})
        }
    }

   
})