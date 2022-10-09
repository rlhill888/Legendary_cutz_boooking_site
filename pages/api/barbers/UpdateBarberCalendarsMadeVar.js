import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body
    if(barber && req.method==='PATCH'){
        try{
        const updateBarber = await prisma.barber.update({
                    where: {
                        id: barber.id
                    },
                    data: {
                        fiveYearScheduleCreated: true
                    }
                })

                return res.json(updateBarber)
        }catch(error){
            return res.json({error: error})
        }
    }

   
})