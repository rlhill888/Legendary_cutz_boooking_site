import { parse } from "cookie";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res){
    if(req.method === 'POST'){
        try{
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                line_items: [{
                    price: 'price_1LjepNK1OiA3f83feYSv8llN', quantity: 1
                }],
                success_url: `${req.headers.origin}/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/`,
                metadata: {data: JSON.stringify(req.body)}
            })
            res.status(200).json(session);
        } catch(error){
            res.status(500).json({statusCode: 500, message: error.message})
        }

    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }

}