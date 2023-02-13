import React, {useState} from "react";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "@mui/material";


function BarberScheduleAppointmentCard({appointment, setAppointmentModalOpen, setAppointmentModalJSX, setAppointmentModalTitle}){
    const [openDetails, setOpenDetails]= useState(false)
    const recieptObj = JSON.parse(appointment.recieptDetails)
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

    if(!appointment){
        return <h1>
            Loading...
        </h1>
    }

    if(openDetails === false){
        return(
            <>
            <div>
                <h3>{findNameString()} {appointment.appointmentStartTime} - {appointment.appointmentEndTime}</h3>
                <Button variant="contained" color="secondary" onClick={()=>{
                    setAppointmentModalOpen(true) 
                    setAppointmentModalTitle(`Appointment for ${findNameString()}: ${appointment.appointmentStartTime} - ${appointment.appointmentEndTime}`)
                    setAppointmentModalJSX(
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
                                        return <li key={`appointment service ${service.id}`}>{service}</li>
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
                                        return <li key={`appointment service ${service.id}`}>{service}</li>
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
        <Button
        color="secondary"
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
        >Cancel Appointment</Button> 
        </>

        }
        
       
        <br />
        <br />


        
        
        </div>
        
        </>
                    )
                }
                }>
                Open Appointment Details
                </Button>
            </div>
            
            </>
        )
    }
    return (

        <>
        

            
        
        </>
    )
}

export default BarberScheduleAppointmentCard