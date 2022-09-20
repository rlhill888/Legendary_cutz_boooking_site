import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {

    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res){

    if(req.method === 'POST'){
        let event;
        try{
            const rawBody = await buffer(req)
            const signature = req.headers['stripe-signature']

            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET

            )
        }catch(error){
            console.log(`Error message: ${error.message}`)
            res.status(400).send(` Webhook Error: ${error.message}`)
            return 
        }

        console.log('Success:', event.id)

        if(event.type === 'checkout.session.completed'){
            console.log('Payment recieved!')
        }else{
            console.warn(`unhandled event type: ${event.type}`)
        }
        res.json({received: true})

    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}