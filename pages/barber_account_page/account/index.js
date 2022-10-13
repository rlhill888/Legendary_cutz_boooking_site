import React, {useState, useEffect} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import axios from "axios";
function Account(){
    const [editMode, setEditMode]= useState(false)
    const [barber, setBarber]= useState(null)

    const [name, setName]= useState(null)
    const [gmail, setGmail]= useState(null)
    const [phoneNumber, setPhoneNumber]= useState(null)
    const [currentlyRecievingAppointmentReminders, setCurrentlyRecevingAppointmentReminders]= useState(null)
    const [currentlyRecievingCancelReminders, setCurrentlyRecievingCancelREminders]= useState(null)
    const [update, setUpdate]= useState(1)

    const router= useRouter()
    let barberMenuShowing

    useEffect( ()=>{
        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    setBarber(res)
                    setName(res.name)
                    setGmail(res.gmail)
                    setPhoneNumber(res.phoneNumber)
                    setCurrentlyRecevingAppointmentReminders(res.recieveNewAppointmentReminders)
                    setCurrentlyRecievingCancelREminders(res.recieveCanceledAppointmentReminders)
                }
                    
                    )
            }else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })
        }

        fetchData()
       
    }, [update])

    if(!barber){
        return <h1>Loading...</h1>
    }

    if(editMode === false){
        barberMenuShowing = <>

        <h1>Account</h1>

        <br />
        <h2>Name: {barber.name}</h2>
        <h2>Gmail: {barber.gmail}</h2>
        <h2>Phone Number: {barber.phoneNumber}</h2>
        {barber.recieveNewAppointmentReminders ? <h2>You are currently recieving appointment reminders</h2> : <h2>You are currently not recieving appointment reminders</h2>}
        {barber.recieveCanceledAppointmentReminders ? <h2>You are currently recieving sms messages if a customer cancels their appointment</h2> : <h2>You are not recieving sms messages if a customer cancels their appointment</h2>}


        <button
        onClick={()=> setEditMode(true)}
        >
            Edit Account Information
        </button>
        </>
    }
    if(editMode === true){
        barberMenuShowing = <>
        <h1>Account</h1>
        <br />
        <form onSubmit={async (e)=>{
            e.preventDefault()
            try{
                const response = await axios({
                    method: 'PATCH',
                    url: '/api/barbers/UpdateBarber',
                    data:{
                        name: name,
                        gmail: gmail, 
                        phoneNumber: phoneNumber,
                        currentlyRecievingAppointmentReminders: currentlyRecievingAppointmentReminders,
                        currentlyRecievingCancelReminders: currentlyRecievingCancelReminders
                    }
                })
                console.log(response.data)
                setUpdate(previous=> previous+1)
                console.log(update)
                setEditMode(false)
            }catch(error){
                console.log(error)
            }
        }}>

       
        <h2>Name: {barber.name}</h2><input value={name} onChange={(e)=> setName(e.target.value)}></input>
        <h2>Gmail: {barber.gmail}</h2><input value={gmail} onChange={(e)=> setGmail(e.target.value)}></input>
        <h2>Phone Number: {barber.phoneNumber}</h2><input type={'number'} value={phoneNumber} onChange={(e)=>{
            if(e.target.value>=0 && e.target.value < 10000000000){
                  setPhoneNumber(parseInt(e.target.value))
            }
              
        }}></input>
        <br />
        <h2>Recieve SMS notifications about newly scheduled appointments 
           <input type='checkbox' checked={currentlyRecievingAppointmentReminders} onChange={()=> setCurrentlyRecevingAppointmentReminders(!currentlyRecievingAppointmentReminders)}></input> 
        </h2>
        
        <h2>Recieve SMS Notfications about Cancelled Appoitnments
           <input type='checkbox' checked={currentlyRecievingCancelReminders} onChange={()=> setCurrentlyRecievingCancelREminders(!currentlyRecievingCancelReminders)}></input> 
        </h2>
        <button type="submit">Update Account Settings</button>
         </form>
         <br />
        <button
        onClick={()=> setEditMode(false)}
        >
        Back
        </button>
        </>
    }
    return(
        <>
        <BarberNavigationMenu />
        <br />
        <div>

            {barberMenuShowing}
        </div></>
    )
}

export default Account