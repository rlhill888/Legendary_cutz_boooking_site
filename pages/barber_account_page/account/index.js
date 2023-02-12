import React, {useState, useEffect} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import axios from "axios";
import Loading from '../../../src/components/Loading';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Admin from "../../../src/components/Admin";
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
        return <Loading />
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


        <Button
        variant="contained"
        color='secondary'
        onClick={()=> setEditMode(true)}
        >
            Edit Account Information
        </Button>
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

       
        <h2>Name: {barber.name}</h2><TextField sx={{input: {color: 'white'}}} variant='filled' color="secondary" value={name} onChange={(e)=> setName(e.target.value)}></TextField>
        <h2>Gmail: {barber.gmail}</h2><TextField sx={{input: {color: 'white'}}} variant='filled' color="secondary" value={gmail} onChange={(e)=> setGmail(e.target.value)}></TextField>
        <h2>Phone Number: {barber.phoneNumber}</h2><TextField sx={{input: {color: 'white'}}} variant='filled' color="secondary" type={'number'} value={phoneNumber} onChange={(e)=>{
            if(e.target.value>=0 && e.target.value < 10000000000){
                  setPhoneNumber(parseInt(e.target.value))
            }
              
        }}></TextField>
        {/* <br />
        <h2>Upload Appointments to your Google Calendar
           <input type='checkbox' checked={currentlyRecievingAppointmentReminders} onChange={()=> setCurrentlyRecevingAppointmentReminders(!currentlyRecievingAppointmentReminders)}></input> 
        </h2>
        
        <h2>Recieve SMS Notfications about Cancelled Appoitnments
           <input type='checkbox' checked={currentlyRecievingCancelReminders} onChange={()=> setCurrentlyRecievingCancelREminders(!currentlyRecievingCancelReminders)}></input> 
        </h2> */}
        <br />
        <br />
        <Button variant="contained"
        color='secondary' type="submit">Update Account</Button>
         </form>
         <br />
        <Button
        color='secondary'
        onClick={()=> setEditMode(false)}
        >
        Back
        </Button>
        </>
    }
    return(
        <>
        <BarberNavigationMenu />
        <br />
        <div>

            {barberMenuShowing}

        {barber.Admin ? <Admin /> : <></>}
        </div></>
    )
}

export default Account