import react from "react";

function Checkout(){
    const redirectToCheckout = async ()=> {

        const {
            data: {id},
        }=await axios.post('/api/checkout_sessions', {
            items: {price: 15}
        })

        const stripe = await getStripe()
        await stripe.redirectToCheckout({sessionId: id})

    }

    return(
        <>
        checkout
        
        </>
    )
}

export default Checkout