import React, { useState, useEffect} from "react";
import Calendar from "../../../src/components/Calendar";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { auth } from "../../../lib/mutations";
import { useRouter } from "next/router";
import BarberScheduleAppointmentCard from "../../../src/components/BarberScheduleAppointmentCard";
import TimeInputComponent from "../../../src/components/TimeInputComponent";
import ScheduleTimeInput from "../../../src/components/ScheduleTimeInput";
import axios from "axios";
import TimeInput from "../../../src/components/TimeInput";
import convertToMilitaryTime from "../../../lib/convertToMilitaryTime";


function Scheduling(){
    const [date, setDate]= useState('')
    const [dayData, setDayData]= useState(null)
    const [barber, setBarber]= useState(null)
    const [weeklySchedule, setWeeklySchedule]= useState(null)
    const [showWeeklySchedule, setshowWeeklySchedule]= useState(false)
    const [changeAvailibilityButton, setChangeAvailibilityButton]= useState(false)
    const [dayBlocked, setDayBlocked]= useState(false)
    const [updateData, setUpdateData]= useState(1)
    const [showBlockOutPortionOfDayDiv, setShowBlockOutPortionOfDayDiv]= useState(false)
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

 
    const router= useRouter()
    console.log(date)
    useEffect(()=>{
        setChangeAvailibilityButton(false)
        if(dayData){
           if(dayData.availibility==='none'){
            console.log(dayData.availibility)
            setDayBlocked(true)
        }else{
            setDayBlocked(false)
        } 
        }
        
    }, [dayData, date])

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
        
        <Calendar updateCalendar={updateData}  barberId={barber.id} setDateOfAppointment={setDate} setDateOfAppointmentData={setDayData} barberScheduleMenu={true}/>


    {date ? 
    
    <>
    <div>
        <h2>{date}</h2>
        <br />
        {dayData.availibility === 'none' ? <h3>You are not availible for this day</h3> : 
         <h3>Your Availibility for this day is {dayData.availibility}</h3>
        }


        


        {
        changeAvailibilityButton ? <>
            <div>
            <button onClick={()=>{
            setChangeAvailibilityButton(false)
        }}>Close Change Availibility Menu </button>


                <h1>Change availibility</h1>

                <h3>{date} current availibility</h3>
               
                {dayBlocked ? <></> : <>
                
                <ScheduleTimeInput setUpdateData={setUpdateData} availibility={dayData.availibility} dayData={dayData}/>
                
                
                </>}
                <h3>Block Out Portion of day
                    <input type='checkbox' checked={showBlockOutPortionOfDayDiv} onChange={(e)=> setShowBlockOutPortionOfDayDiv(e.target.checked) }></input>
                </h3>
                {!showBlockOutPortionOfDayDiv ? <></> 
                : 
                
                <div>
                    <h3>What Portion of the day would you like to block off?</h3>
                    <TimeInput timeFunction={ async (startTime, endTime, fullTimeSlot)=>{

                        try{
                            const response = await axios({
                                method: 'PATCH',
                                url: '/api/barbers/schedule/blockOffTimeInDay',
                                data: {
                                    timeBlockedOff: fullTimeSlot,
                                    dayCalendarId: dayData.id

                                }
                            })

                            window.location.reload()
                        }catch(e){
                            console.log(e.response)
                        }
                    }} timeFunctionTitle={'Block off time portion'} />
                    
                </div>
                }

                 <h3>
                    Block Out Entire Day
                    <input checked={dayBlocked}
                    onClick={async (e)=>{ 
                        console.log(e.target.checked)
                        if(e.target.checked===true){
                            try{
                                const response = await axios({
                                    method: 'PATCH',
                                    url: '/api/barbers/schedule/updateSpecificDayAvailibility',
                                    data: {
                                        dayData,
                                        availibility: 'none'
                                    }
                                })
                                console.log(response.data)
                                setDayBlocked(true)
                                window.location.reload(false)
                            }catch(error){
                                console.log(error)
        
                            }

                        }else{
                            setDayBlocked(e.target.checked)
                        }
                        }} type='checkbox'></input>
                </h3>
                
                
            </div>
        </> :
        
        <>
        <button onClick={()=>{
            setChangeAvailibilityButton(true)
        }}>Change This Day's Availibility</button>
        </>
        }
        <br />


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