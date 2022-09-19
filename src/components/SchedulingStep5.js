import react from "react";
import Reciept from "./reciept";

function SchedulingStep5({timeObj, completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, setSchedulingStep}){

    console.log(timeObj, completePurchaseObj)
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
        step 5 
        <Reciept setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime}  completePurchaseObj={completePurchaseObj} timeObj={timeObj}/>
        <button
        onClick={()=>{
            redirectToCheckout()
        }}
        >Proceed to Checkout</button>



        </>
    )
}

export default SchedulingStep5