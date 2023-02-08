import React, {useState} from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";


function signUp(){
    const [gmail, setGmail]= useState('')
    const [password, setPassword]= useState('')
    const [name, setName]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [phoneNumber, setPhoneNumber]= useState('')
    const [recieveAppintmentReminders, setRecieveAppointmentReminders]= useState(false)
    const [recieveCancelledAppintmentReminders, setRecieveCancelledAppointmentReminders]= useState(false)

    const router= useRouter() 

    function changeFunction(e, setFunction){
        setFunction(e.target.value)
    }

    return(
        <div className="div">
        <h1>Sign Up</h1>
        <br />
        <form onSubmit={(e)=>{
            e.preventDefault()
            fetch('/api/signup', {
                method: 'POST',
                Headers: {
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify({
                    gmail: gmail,
                    password: password,
                    name: name,
                    phoneNumber: phoneNumber,
                    recieveNewAppointmentReminders: recieveAppintmentReminders,
                    recieveCanceledAppointmentReminders: recieveCancelledAppintmentReminders,

                }) 
            })
            .then((res)=>{
                if(res.ok){
                    res.json()
                    .then(res=>{
                        console.log(res)
                        router.push('/barber_account_page/schedule/setupschedule')
                    })
                }
                else{
                    res.json()
                    .then(res=>{
                        console.log(res)
                    })
                }
            })
        }}>
            <h2>First Name </h2>
            <input value={name} onChange={(e)=>changeFunction(e, setName) }></input>
            <br />
            <h2> Gmail </h2>
            <input value={gmail} onChange={(e)=>changeFunction(e, setGmail) }></input>
            <br />
            <h2> Password </h2>
            <input value={password} onChange={(e)=>changeFunction(e, setPassword) }></input>
            <br />
            <h2>Confirm Password</h2>
            <input value={confirmPassword} onChange={(e)=>changeFunction(e, setConfirmPassword) }></input>
            <br />
            <h2>Phone Number</h2>
            <input value={phoneNumber} onChange={(e)=>changeFunction(e, setPhoneNumber) }></input>
            {/* <br />
            <h2>Recieve Appointment Reminders</h2>
            <input type='checkbox' value={recieveAppintmentReminders} onChange={(e)=> setRecieveAppointmentReminders(previous => !previous) }></input>
            <h2>Recieve Canceled Appointment Reminders</h2>
            <input type='checkbox' value={recieveCancelledAppintmentReminders} onChange={(e)=>{

                console.log(recieveCancelledAppintmentReminders)
                setRecieveCancelledAppointmentReminders(previous => !previous)
            }
                 }></input> */}
            <br />
            <br />
            <Button color="secondary" variant="contained" type='submit'>Create Account</Button>
            
            
            

        </form>
        <style jsx>{`
            .div{
                text-align: center;
            }
            
            
            `}</style>
        </div>
    )
}

export default signUp