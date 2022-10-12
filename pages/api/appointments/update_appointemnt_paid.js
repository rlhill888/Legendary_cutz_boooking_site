import axios from "axios";
import prisma from "../../../lib/prisma";

export default async (req, res)=>{
    const body = req.body
    if(req.method === 'POST'){
        const session_id = req.body.session_id

        try{
            const response = await axios({
                method: 'GET',
                url: `http://localhost:3000/api/checkout_sessions/${session_id}`
            })
            if(response.data.payment_status==='paid'){
                try{
                   const  appointment = await prisma.appointment.update({
                        where: { stripeSessionsId: body.session_id},
                        data: { downPaymentPaid: true}
                           
                    })
                    console.log('appointmnet:', appointment)
                    res.json(appointment)
                }catch(error){
                    res.json({error: error})
                }
            }
        }catch(error){
            console.log(error)
            res.json({error: error})
        }
    //      fetch(`http://localhost:3000/api/checkout_sessions/${session_id}`).then( async response=>{
    //     if(response.ok){
            
    //         response.json().then(async (response)=>{
    //             StripeSessionFound = true
                
    //             if(res.payment_status==='paid'){
    //                 sessionPaid = true
    //                 try{
    //                     appointment = await prisma.appointment.update({
    //                        where: { stripeSessionsId: body.session_id},
    //                        data: { downPaymentPaid: true}
       
    //                    })
                     
    //                }catch(error){
    //                res.status(404).send({error: 'Appointemnt Not Found'})
    //                res.json({error: 'Appointemnt Not Found'})
    //                }
    //                return res.json(appointment)
                   
    //             }
    //     })
    //     }else{
    //         res.status(404)
    //         res.json({error: 'Stripe Session Not Found'})
    //         return

    //     }
    // })
    }
        
   
}