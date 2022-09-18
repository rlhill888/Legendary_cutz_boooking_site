import react from "react";
import Reciept from "./reciept";

function SchedulingStep5({timeObj, completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, setSchedulingStep}){

    console.log(timeObj, completePurchaseObj)

    return(

        <>
        step 5 
        <Reciept setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime}  completePurchaseObj={completePurchaseObj} timeObj={timeObj}/>
        <button
        onClick={()=>{
            setSchedulingStep(previous=> previous + 1)
        }}
        >Proceed to Checkout</button>



        </>
    )
}

export default SchedulingStep5