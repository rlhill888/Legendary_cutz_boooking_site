import react, { useState } from "react";
import Reciept from "./reciept";
import axios from "axios";
import getStripe from "../../lib/get-stripe";

function SchedulingStep5({timeObj, completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, recieptsArray, dateOfAppointment}){

  console.log(totalReceipt)
    const [totalReceipt, setTotalReciept]= useState({})
    const redirectToCheckout = async ()=> {

        const {
            data: {id},
        }=await axios.post('/api/checkout_sessions', )
        await axios.post('/api/appointments/createAppointment', {
            stripeSessionsId: id,
            appointmentStartTime: timeObj.appointmentStartTime,
            appointmentEndTime: timeObj.appointmentEndTime,
            totalPriceAfterDownPayment: totalReceipt.totalPrice -15,
            dateOfAppointment: dateOfAppointment,
            recieptDetails: JSON.stringify(recieptsArray),
            barberId: 8,
            appintmnetCustomerNames: JSON.stringify(['name']),
            phomeNumber: '215'

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