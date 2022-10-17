import React, { useState, useEffect} from "react";
import Calendar from "../../../src/components/Calendar";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { auth } from "../../../lib/mutations";
import { useRouter } from "next/router";
import BarberScheduleAppointmentCard from "../../../src/components/BarberScheduleAppointmentCard";


function Scheduling(){
    const [date, setDate]= useState('')
    const [dayData, setDayData]= useState(null)
    const [barber, setBarber]= useState(null)
    const [weeklySchedule, setWeeklySchedule]= useState(null)
    const [showWeeklySchedule, setshowWeeklySchedule]= useState(false)
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    console.log(dayData)

 
    const router= useRouter()
    console.log(date)

    useEffect( ()=>{
        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    if(res.fiveYearScheduleCreated===false){
                        router.push('/barber_account_page/schedule/setupschedule')
                    }
                    if(res.fiveYearScheduleCreated===true){
                        setBarber(res)
                        setWeeklySchedule(JSON.parse(res.weeklyAvailibility))
                    }
                    })
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()
       
    }, [])

  

    if(!barber || !weeklySchedule){
        return(
            <>
            <h1>Loading...</h1></>
        )
    }

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        
        <br />
        <br />

        {showWeeklySchedule ? 
        
        <div>
        <h3>Your Weekly Schedule: </h3>
    {weeklySchedule.map((day, index)=>{
        if(day===null){
            return <h4>{weekArray[index]}: You are off on {weekArray[index]}</h4>
        }else{
            return <h4>{weekArray[index]}: {day}</h4>
        }
    })}
    <button
    onClick={()=>{
        router.push('schedule/editSchedule')
    }}
    >Edit Schedule</button>
    <br />
    <br />
    <button
     onClick={()=>{
        setshowWeeklySchedule(previous=> !previous)
    }}
    >Close Schedue</button>
    </div> 

    : 

    <> 
    <button 
    
    onClick={()=>{
        setshowWeeklySchedule(previous=> !previous)
    }}
    >Show Schedule</button>
    </>
    
    }
       <br />
        <br />
        
        <Calendar  barberId={barber.id} setDateOfAppointment={setDate} setDateOfAppointmentData={setDayData} barberScheduleMenu={true}/>


    {date ? 
    
    <>
    <div>
        <h2>{date}</h2>
        <br />
        {dayData.availibility === 'none' ? <h3>You are not availible for this day</h3> : 
         <h3>Your Availibility for this day is {dayData.availibility}</h3>
        }
        {
            dayData.timeSlotsTaken === '' ? 
            <h3>You do not have any appointments for this day yet</h3> :
            <div>
            <h3>Appointments for this day:</h3>
            <br />
            {dayData.appointments.map((appointment =>{
                return ( <BarberScheduleAppointmentCard key={`${appointment.id}`} appointment={appointment}/>)
            }))}
            </div>
        }
       
    </div>
     </> 
    
    : 
    
    <> 
    </>}

        </>
    )
}

export default Scheduling