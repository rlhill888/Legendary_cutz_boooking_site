import React, {useState, useEffect} from "react";
import axios from "axios";


function MessagesAppointmentCard({id}){
    const [openDetails, setOpenDetails]= useState(false)
    const [appointment, setAppointment]= useState(null)
    const [recieptObj, setRecieptObj]=useState(null)

    useEffect(()=>{
        async function findAppointment(){

            try{
                const appointmentToBeFound = await axios({
                    method: 'POST',
                    url: '/api/appointments/findAppointemntById',
                    data: {
                        id: id
                    }
                })
                console.log(appointmentToBeFound)
                
                setAppointment(appointmentToBeFound.data)
            }catch(error){
                console.log('there was an error')
                console.log(error)
                
            }
        }
        findAppointment()
    }, [])

    useEffect(()=>{
        if(appointment){
            setRecieptObj(JSON.parse(appointment.recieptDetails))
        }
    },[appointment])
    console.log(recieptObj)

    function findNameString(){
        let string = ''
        const nameArray = JSON.parse(appointment.appintmnetCustomerNames)
        if(nameArray.length === 1){
            return nameArray[0]
        }else{
            nameArray.map((name, index)=>{
                if(index === 0){
                    return string = string + `${name}`
                }
                if(index === nameArray.length - 1){
                    return string = string + ` and ${name}`
                }else{
                    return string = string + `, ${name}`
                }
            })
            return string
        }
    }

    if(!appointment || !recieptObj){
        return <h1>
            Loading...
        </h1>
    }

    if(openDetails === false){
        return(
            <>
            <div>
                <button onClick={()=>setOpenDetails(!openDetails) }>
                {openDetails ? 'Close Appointment Deatails' : 'Open Appointment Details'}
                </button>
            </div>
            
            </>
        )
    }
    return (

        <>
        <div>
        <h3>Total Price of Appointment After Downpayment: ${appointment.totalPriceAfterDownPayment}</h3>   
        <h4>Appoitnment Time: {appointment.appointmentStartTime} - {appointment.appointmentEndTime}</h4>
        <h4>Phone Number: {appointment.phomeNumber}</h4>
        <h4>Reciepts And Services-</h4>
        {recieptObj.length === 1 ? recieptObj.map(reciept=>{
                        return(
                            <>
                            <div>
                                <h3>Appoitnment Services:</h3>
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
                    
                    : recieptObj.map(reciept=>{
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
        <h3></h3>

        {appointment.canceledAppointment ?
        
             <></>

        :

        <>
        <button
        onClick={async ()=>{
            try{
              const response = await axios({
                url: '/api/appointments/cancel_appointment',
                method: 'PATCH',
                data: {
                    stripeSessionsId: appointment.stripeSessionsId
                }
            }) 
            console.log(response.data) 
            window.location.reload(false)
            }catch(error){
                console.log(error)
            }
            
         }}
        >Cancel Appointment</button> 
        </>

        }
        
       
        <br />
        <br />


        <button  onClick={()=>setOpenDetails(!openDetails) }>
            
            {openDetails ? 'Close Appointment Details' : 'Open Appointment Details'}
        </button>
        
        </div>
        </>
    )
}

export default MessagesAppointmentCard