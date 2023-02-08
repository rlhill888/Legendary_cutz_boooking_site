import react, { useState } from "react";
import Reciept from "./reciept";
import axios from "axios";
import getStripe from "../../lib/get-stripe";
import { Button } from "@mui/material";
import Loading from "./Loading";

function SchedulingStep5({timeObj, completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, recieptsArray, dateOfAppointment, barberId, dayData, nameArray, setSchedulingStep}){
    let testDate

    if(dateOfAppointment.toLowerCase().includes('thurs')){
        testDate = dateOfAppointment.substring(6).trim()
    }else{
        testDate = dateOfAppointment.substring(4).trim()
    }
  console.log(testDate)
    const [totalReceipt, setTotalReciept]= useState({})
    const [startedCheckoutProcess, setStartedCheckoutProcess]= useState(false)

    const redirectToCheckout = async ()=> {

        function figureOutMonthDate(month, year){
            if(parseInt(month) < 10 && month.length > 1){
                let newMonth = month
                newMonth= newMonth.substring(1)
                console.log(`${newMonth}/${year}`)
                return `${newMonth}/${year}`
            }else{
                return `${month}/${year}`
            }
        }

        let testDate
        let month= ''
        let year= ''
        let day= ''

        let detectedMonth = false
        let detectedDay = false
        let detectedYear = false

        if(dateOfAppointment.toLowerCase().includes('thurs')){
            testDate = dateOfAppointment.substring(6).trim()
        }else{
            testDate = dateOfAppointment.substring(4).trim()
        }

        for(let character of testDate){
            if(detectedMonth===false && character === '/'){
                detectedMonth = true
            }
            if(detectedMonth===false){
                month = month + character
            }
             if(detectedMonth === true && detectedDay === false && character !== '/'){
                detectedDay = true
            }
            if(detectedMonth === true && detectedDay === true  && character!=='/' && detectedYear === false){
                day = day + character
            }
            if(detectedMonth === true && detectedDay === true  && character==='/' && detectedYear === false){
                detectedYear = true
            }
            if(detectedMonth === true && detectedDay === true && character!=='/' && detectedYear === true){
                year = year+ character
            }
           
        }

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
            barberId: barberId,
            appintmnetCustomerNames: JSON.stringify(nameArray),
            phomeNumber: '215', 
            dayCalendarId: dayData.id,
            monthDate: figureOutMonthDate(month, year),
            year: parseInt(year)

        })

        const stripe = await getStripe()
        console.log(getStripe())
        await stripe.redirectToCheckout({sessionId: id})

    }
    function turnRecieptsArrayIntoAString(){
        
    }
    if(startedCheckoutProcess){
        return(
            <Loading loadingText={'Proceeding To Checkout...'}/>
        )
    }

    return(

        <div className="mainDiv" style={{
            overflowY: 'auto'
        }}>
        <Button onClick={()=>{
            setSchedulingStep(previous => previous - 1)
        }} color="secondary">Back</Button>
        <Reciept totalReceipt={totalReceipt} setTotalReciept={setTotalReciept} setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime}  completePurchaseObj={completePurchaseObj} timeObj={timeObj}/>
        <Button
        variant="contained"
        color="secondary"
        onClick={()=>{
            
            setStartedCheckoutProcess(true)
            redirectToCheckout()
        }}
        >Pay $15 Down Deposit</Button>




        </div>
    )
}

export default SchedulingStep5