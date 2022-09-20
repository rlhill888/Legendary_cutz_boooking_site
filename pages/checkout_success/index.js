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

    function mapNames(){

      
        return purchaseContents.customerNamesArray.map((name, index)=>{
                
                if(index=== purchaseContents.customerNamesArray.length - 1){
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
            setMadeFetchRequest(true)
            setData(res)
            setPurchaseContents( JSON.parse(res.metadata.data))
            console.log(JSON.parse(res.metadata.data)) 
            console.log(res)
        }))
    }

   

    return(
        <>
        <div>
            {error ? (
                <div>
                    <h1>There was an error</h1>
                    </div>
            ) : data ? (
                <div>
                    <h1>Successful Payment</h1>
                    {purchaseContents.customerNamesArray.length>1 ? <>
                    <h1>
                        
                        {`Appointments for ${mapNames()} `} 
                         were successfully scheduled for: 
                        <br />
                        <br />
                        {purchaseContents.startTime} - {purchaseContents.endTime}
                    
                    </h1>
                    
                    
                    </> : <>
                    <h1>{purchaseContents.customerNamesArray[0]} your appointment was successfully scheduled for: 
                        <br />
                        <br />
                        {purchaseContents.dateOfAppointment}
                        <br />
                        {purchaseContents.startTime} - {purchaseContents.endTime}
                         </h1>
                         
                    </>}

                    <br />
                         <h1>Price to Pay After Appointment is finished:
                            <br />
                            <br />
                            ${purchaseContents.totalPriceAfterDownPayment}
                         </h1>
                         <br />
                         <h3>Would you like to sign up to recive sms reminders and updates about your appointment?</h3>
                        
                    
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

