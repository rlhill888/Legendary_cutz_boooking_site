import prisma from "../../../lib/prisma";

export default async (req, res)=>{
    const body = req.body
    console.log(body)
    if(req.method === 'POST'){
        let appointment
        let StripeSessionFound = false
        let sessionPaid = false
        const session_id = req.body.session_id
         fetch(`http://localhost:3000/api/checkout_sessions/${session_id}`).then( async response=>{
        if(response.ok){
            
            response.json().then(async (response)=>{
                StripeSessionFound = true
                
                if(res.payment_status==='paid'){
                    sessionPaid = true
                    try{
                        appointment = await prisma.appointment.update({
                           where: { stripeSessionsId: body.session_id},
                           data: { downPaymentPaid: true}
       
                       })
                     
                   }catch(error){
                   res.status(404).send({error: 'Appointemnt Not Found'})
                   res.json({error: 'Appointemnt Not Found'})
                   }
                   return res.json(appointment)
                   
                }
        })
        }else{
            res.status(404)
            res.json({error: 'Stripe Session Not Found'})
            return

        }
    })
    }
        
   
}