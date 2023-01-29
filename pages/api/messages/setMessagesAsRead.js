import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
  console.log('hit route')
  const body=req.body
    if(barber && req.method === 'PATCH'){
        const messageArray= JSON.parse(body.unreadMessageArray)

        let resArray= []

        messageArray.map( async message =>{
            try{

                const updateMessage = await prisma.message.update({
                    where: {
                        id: message.id
                    },
                    data: {
                        messageSeen: true
                    }
                })
                resArray.push(message)

            }catch(error){
                console.log(error)
            }
        })

        res.json(resArray)

    }

   
})