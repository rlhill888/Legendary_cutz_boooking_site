import React, {useState} from "react";
import axios from "axios";


function BarberScheduleAppointmentCard({appointment}){
    const [openDetails, setOpenDetails]= useState(false)
    const recieptObj = JSON.parse(appointment.recieptDetails)
    console.log(recieptObj)

    if(openDetails === false){
        return(
            <>
            <div>
                <h3>Appointment for {JSON.parse(appointment.appintmnetCustomerNames)}, {appointment.appointmentStartTime} - {appointment.appointmentEndTime}</h3>
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
        {appointment.canceledAppointment ? <h3>This Appointment has been cancelled</h3> : <></>}
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

export default BarberScheduleAppointmentCard