import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from "swr";
import axios from "axios";




function Sucess(){

    const [purchaseInfo, setPurchaseInfo]= useState(null)
    const [madeFetchRequest, setMadeFetchRequest]= useState(false)
    const [data, setData]= useState(false)
    const [error, setError]= useState(false)
    const [purchaseContents, setPurchaseContents]= useState({})
    const [customerNamesArray, setCustomersNamesArray]= useState(null)
    const [reciept, setReciept]= useState(null)

    console.log(reciept)
    function mapNames(){

      
        return customerNamesArray.map((name, index)=>{
                
                if(index === customerNamesArray.length- 1){
                    return ` and ${name}`
                }else{
                    return ` ${name}`
                }
            })
    }

  

    const router = useRouter()
    const session_id = router.query["session_id"]

    if(session_id && madeFetchRequest===false){
        fetch(`/api/checkout_sessions/${session_id}`).then(res=> res.json().then(res=>{
            // if(res.ok){
            setMadeFetchRequest(true)
            setData(res)
            console.log(res)
             fetch(`api/appointments/find_Appointemnt`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stripeSessionsId: session_id
                })
             })
            .then(res => res.json()).then(res=>{
                setPurchaseContents(res)
                setCustomersNamesArray(JSON.parse(res.appintmnetCustomerNames))
                setReciept(JSON.parse(res.recieptDetails))
                if(res.appointmentPaid === false){
                    // make fetch request to google clendars here
                    const changeAppointemntPaid = async ()=>{
                    await axios.post('/api/appointments/update_appointemnt_paid', {
                        session_id: session_id,
                        Appointmentid: purchaseContents.id
                    }).then(res=> res.json().then(res=> console.log(res)))
                    }
                    changeAppointemntPaid()
                    

                }
            })
            // }else{
            //     setMadeFetchRequest(true)
            //     setError(res)
            //     console.log(res)
            // }
           
        }))
    }

   

    return(
        <>
        <div>
            {error ? (
                <div>
                    <h1>There was an error</h1>
                    </div>
            ) : purchaseContents && customerNamesArray && reciept ? (
                <div>
                    <h1>Successful Payment</h1>
                    <br />
                    {reciept.length === 1 ? reciept.map(reciept=>{
                        return(
                            <>
                            <div>
                                <h3>Your Appoitnment Services:</h3>
                                <ol>
                                    {reciept.Services.map(service=>{
                                        return <li>{service}</li>
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
                                <ol>
                                    {reciept.Services.map(service=>{
                                        return <li>{service}</li>
                                    })}
                                </ol>
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
                        {purchaseContents.startTime} - {purchaseContents.endTime}
                         </h1>
                         
                    </>}

                    <br />
                         <h1>Total Price to Pay After Appointment is Finished:
                            <br />
                            <br />
                            ${purchaseContents.totalPriceAfterDownPayment}
                         </h1>
                         <br />
                         <h3>Would you like to sign up to recive sms reminders and updates about your appointment?</h3>
                         Yes<input type='checkbox'></input>
                         No<input type='checkbox'></input>
                    
                    </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
        </>
    )
}
export default Sucess

