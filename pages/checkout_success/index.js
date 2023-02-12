import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from "swr";
import axios from "axios";
import GoogleAuthLoginComponent from "../../src/components/GoogleAuthLoginComponent";
import Loading from '../../src/components/Loading';
import { Button } from "@mui/material";



function Sucess(){

    const [data, setData]= useState(false)
    const [error, setError]= useState(false)
    const [purchaseContents, setPurchaseContents]= useState({})
    const [customerNamesArray, setCustomersNamesArray]= useState(null)
    const [contentOk, setContentOk]= useState(null)
    const [reciept, setReciept]= useState(null)

    const router = useRouter()

    function mapNames(){

      
        return customerNamesArray.map((name, index)=>{
                
                if(index === customerNamesArray.length- 1){
                    return ` and ${name}`
                }else{
                    return ` ${name}`
                }
            })
    }

    function generateJSXErrors(){
        if(error === 'down payment not paid'){
            return(
                <div> 
                    <h1>Your Downpayment for your appointment was not paid</h1>

                </div> 
            )
        }
        if(error === 'Someone else booked the appointment before the down payment was paid'){
            return(
                <div>
                    <h2>Unfortunately another customer has booked an appointment that interferes with the time you selected for your appointment. Thier appointment was booked right before you finalized your payment.
                        Your appointment has been cancelled, and you will be refunded.

                       
                    </h2> 
                    <br />
                    <Button onClick={()=>{
                        router.push('/')
                    }} variant="contained" color="secondary">Reschedule Appointment Again for another time</Button>

                </div>
            )
        }else{
            return(
                <div>
                    <h2>An error has occurred, please contact your barber about your appointment.</h2>
                </div>
            )
        }
    }

  

    const session_id = router.query["session_id"]

    useEffect(()=>{
        if(session_id){
    (async ()=>{
                try{
                    const response = await axios({
                        method: 'GET',
                        url: `/api/checkout_sessions/${session_id}`
                    })
                    setData(response.data)
                    try{
                        const response = await axios({
                            method: 'POST',
                            url: `api/appointments/find_Appointemnt`,
                            data: {
                                stripeSessionsId: session_id
                            }
                        })
                        console.log(response.data)
                        setPurchaseContents(response.data)
                        setCustomersNamesArray(JSON.parse(response.data.appintmnetCustomerNames))
                        setReciept(JSON.parse(response.data.recieptDetails))
                        if(response.data.downPaymentPaid=== false){
                            console.log('Updating appointmnet')
                        try{
                            const response = await axios.post('/api/appointments/update_appointemnt_paid', {
                                    session_id: session_id,
                                     Appointmentid: purchaseContents.id
                                 })
                                 console.log( response.data)
                                 setContentOk(true)
                        }catch(error){
                            console.log(error.response.data.error)
                            return setError(error.response.data.error)
                        }         
                    }
                    setContentOk(true)

                    }catch(error){
                        console.log(error)
                    }
                    console.log(response.data.error)
                }catch(error){
                    setError(error)
                    console.log(error)
                }
            })()
        }
        
    }, [session_id])

   

    return(
        <>
        <div className="mainDiv"
        style={{
            overflowY: 'auto'
        }}
        >
            {error ? 
            generateJSXErrors()
             : purchaseContents && customerNamesArray && reciept && contentOk ?  (
                <div>
                    <h1>Successful Payment</h1>
                    <br />
                    {reciept.length === 1 ? reciept.map(reciept=>{
                        return(
                            <>
                            <div>
                                <h3>Your Appoitnment Services:</h3>
                                <ol style={{textAlign: 'left'}}>
                                    {reciept.Services.map(service=>{
                                        return <li key={`service ${service.id}`}>{service}</li>
                                    })}
                                </ol>
                            </div>
                            <br />
                            
                            </>
                        )
                    })
                    
                    : reciept.map(reciept=>{
                        return(
                            <>
                            <div>
                                <h2>Reciept for {reciept.Name}</h2>
                                <h3>Services:</h3>
                                <div>
                                  <ol style={{textAlign: 'left'}}>
                                    {reciept.Services.map(service=>{
                                        return <li key={`service ${service.id}`}>{service}</li>
                                    })}
                                    </ol>  
                                </div>
                                
                                <br />
                                <h2>Total Time of Services for {reciept.Name} {reciept.totalDurration}</h2>
                                <h2>Total Price for {reciept.Name} {reciept.totalPrice}</h2>
                            </div>
                            <br />
                            
                            </>
                        )
                    })}
                    {customerNamesArray.length>1 ? <>
                    <h1>
                        
                        {`Appointments for ${mapNames()} `} 
                         were successfully scheduled for: 
                        <br />
                        <br />
                        {purchaseContents.appointmentStartTime} - {purchaseContents.appointmentEndTime}
                    
                    </h1>
                    
                    
                    </> : <>
                    <h1>{customerNamesArray[0]} your appointment was successfully scheduled for: 
                        <br />
                        <br />
                        {purchaseContents.dateOfAppointment}
                        <br />
                        {purchaseContents.appointmentStartTime} - {purchaseContents.appointmentEndTime}
                         </h1>
                         
                    </>}

                    <br />
                         <h1>Total Price to Pay After Appointment is Finished:
                            <br />
                            <br />
                            ${purchaseContents.totalPriceAfterDownPayment}
                         </h1>
                         <br />
                         <br />
                         <Button color="secondary" onClick={async ()=>{
                            try{
                              const response = await axios({
                                url: '/api/appointments/cancel_appointment',
                                method: 'PATCH',
                                data: {
                                    stripeSessionsId: session_id
                                }
                            }) 
                            console.log(response.data) 
                            window.location.reload(false)
                            }catch(error){
                                console.log(error)
                            }
                            
                         }}>Cancel Appointment</Button>
                         <br />
                    
                    </div>
            ) : (
                <div style={{
                    position:'fixed',
                    width: '100vw',
                    height: '100vh',
                    top: '0',
                    left: '0'
                }}>
                    <Loading />
                </div>
            )}
        </div>
        </>
    )
}
export default Sucess

