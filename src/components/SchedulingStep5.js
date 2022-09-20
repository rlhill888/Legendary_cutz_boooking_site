import react, { useState } from "react";
import Reciept from "./reciept";
import axios from "axios";
import getStripe from "../../lib/get-stripe";

function SchedulingStep5({timeObj, completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, recieptsArray, dateOfAppointment}){

  console.log('recieptsArray:', recieptsArray)
    const [totalReceipt, setTotalReciept]= useState({})
    const redirectToCheckout = async ()=> {

        const {
            data: {id},
        }=await axios.post('/api/checkout_sessions', {
            startTime: timeObj.appointmentStartTime,
            endTime: timeObj.appointmentEndTime,
            totalPriceAfterDownPayment: totalReceipt.totalPrice - 15,
            customerNamesArray: Object.keys(completePurchaseObj),
            dateOfAppointment
         
        })

        const stripe = await getStripe()
        console.log(getStripe())
        await stripe.redirectToCheckout({sessionId: id})
    }
    function turnRecieptsArrayIntoAString(){
        
    }

    return(

        <>
        step 5 
        <Reciept totalReceipt={totalReceipt} setTotalReciept={setTotalReciept} setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime}  completePurchaseObj={completePurchaseObj} timeObj={timeObj}/>
        <button
        onClick={()=>{
            redirectToCheckout()
        }}
        >Pay $15 Down Deposit</button>




        </>
    )
}

export default SchedulingStep5