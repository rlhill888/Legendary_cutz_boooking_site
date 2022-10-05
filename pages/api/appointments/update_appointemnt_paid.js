import prisma from "../../../lib/prisma";

export default async (req, res)=>{
    const body = req.body
    console.log(body)
    if(req.method === 'POST'){

        let StripeSessionFound = false
        let sessionPaid = false
        const session_id = req.body.session_id
        fetch(`http://localhost:3000/api/checkout_sessions/${session_id}`).then(res=>{
        if(res.ok){
            
            res.json().then(res=>{
                StripeSessionFound = true
                
                if(res.payment_status==='paid'){
                    sessionPaid = true
                }
        })
        }})
        console.log(StripeSessionFound)
        if(StripeSessionFound === true){
            try{
                const appointment = await prisma.appointment.update({
                    where: { appointmentId: body.id},
                    data: { downPaymentPaid: true}

                })
            }catch(error){
            res.status(404)
            res.json({error: 'Appointemnt Not Found'})
            }
            return 
        }
        if(StripeSessionFound=== false){
            res.status(404)
            res.json({error: 'Stripe Session Not Found'})
            return
        }
    }
        
    
}