import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    if(barber){
        try{
            const barbersMessages = await prisma.message.findMany({
                where: {
                    barberId: barber.id
                }
            })
            let badgeNumber = 0;
            for(let message of barbersMessages){
                if(!message.messageSeen){
                    badgeNumber++
                }
            }
            res.json(badgeNumber)

        }catch(error){
            return res.json({error: error})
        }
    }

   
})