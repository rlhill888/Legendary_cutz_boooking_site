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
import Modal from '../../../src/components/Modal';
import Loading from '../../../src/components/Loading';
import { Button } from "@mui/material";
import Errors from '../../../src/components/Errors'


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
    const [blockedOffTimeAppointementErrorTime, setBlockedOffTimeAppointementErrorTime]= useState(null)
    const [cancelAppointmentStripeSessionId, setCancelAppointmentStripeSessionId]= useState(null)
    const [appointmentModalOpen, setAppointmentModalOpen]= useState(false)
    const [appointmentModalJSX, setAppointmentModalJSX]= useState(null)
    const [appointmentModalTitle, setAppointmentModalTitle]= useState(null)
    const [reRender, setReRender]= useState(0)
    const [errorsArray, setErrorsArray]= useState([])
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

 
    const router= useRouter()
    useEffect(()=>{
        setChangeAvailibilityButton(false)
        if(dayData){
           if(dayData.availibility==='none'){
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

    function detectBlockedTimeErrors(){
            return(
            <div>
                <h3>
                    The time you tried to block off iterferes with an appoinment from {blockedOffTimeAppointementErrorTime}. Would you like to cancel this appointment?
                </h3>
                <br />
                <button onClick={async ()=>{

                    try{
                        const response = await axios({
                        url: '/api/appointments/cancel_appointment',
                        method: 'PATCH',
                        data: {
                            stripeSessionsId: cancelAppointmentStripeSessionId
                        }
                        }).then( async ()=>{
                            try{
                                const response = await axios({
                                    method: 'PATCH',
                                    url: '/api/barbers/schedule/blockOffTimeInDay',
                                    data: {
                                        timeBlockedOff: fullTimeSlot,
                                        dayCalendarId: dayData.id
        
                                    }
                                })
                                window.location.reload(false)
                            }catch(e){
                                console.log(e.response)
                            }
                        })
                    

                    


                    }catch(error){
                        console.log(error.response)
                    }
                    
                }}>Yes</button>
                <button onClick={()=> setBlockedOffTimeAppointementErrorTime(null)}>No</button>
            </div>
            )
    }

  

    if(!barber || !weeklySchedule){
        return(
            <>
            <Loading />
            </>
        )
    }

    return(
        <>
       
        <Modal modalActive={appointmentModalOpen} setModalActive={setAppointmentModalOpen} title={appointmentModalTitle}>
                {appointmentModalJSX}
        </Modal>

    <Modal modalActive={showWeeklySchedule} setModalActive={setshowWeeklySchedule} title={'Your Weekly Schedule'}>
            <div>
                {weeklySchedule.map((day, index)=>{
                    if(day===null){
                        return <h4 key={`${day} ${index} weekly schedule`}>{weekArray[index]}: You are off on {weekArray[index]}</h4>
                    }else{
                        return <h4 key={`${day} ${index} weekly schedule`}>{weekArray[index]}: {day}</h4>
                    }
                })}
                <Button
                color="secondary"
                onClick={()=>{
                    router.push('schedule/editSchedule')
                }}
                >Edit Schedule</Button>
                <br />
                <br />
            </div> 
        </Modal>

        <Modal modalActive={changeAvailibilityButton} setModalActive={setChangeAvailibilityButton} title={'Change Availibility Menu'}>
        {date ? 

            <div>

            <h3>{date} current availibility</h3>

            {dayBlocked ? <></> : <>

            <ScheduleTimeInput setUpdateData={setUpdateData} availibility={dayData.availibility} dayData={dayData}/>


            </>}
            <br />
            <Button color="secondary"  onClick={()=> setShowBlockOutPortionOfDayDiv(previous=> !previous)}>{showBlockOutPortionOfDayDiv ? 'Close Block Off Times Menu' : 'Open Block Off Times Menu' }</Button>
            {!showBlockOutPortionOfDayDiv ? <></> 
            : 

            <div>
                <h3>What Portion of the day would you like to block off?</h3>
                <TimeInput setErrorsArray={setErrorsArray} timeFunction={ async (startTime, endTime, fullTimeSlot)=>{

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
                        if(e.response.data.error === 'Blocked Off Time Interferes With a Scheduled Appointment'){
                            setBlockedOffTimeAppointementErrorTime(e.response.data.time)
                            setCancelAppointmentStripeSessionId(e.response.data.stripeSessionsId)
                        }
                        if(e.response.data.error ==='Blocked Off Time Interferes With another blocked off time'){
                            console.log('Blocked Off Time Interferes With another blocked off time')
                        }
                    }
                }} timeFunctionTitle={'Block off time portion'} />
                {blockedOffTimeAppointementErrorTime ? 

                    detectBlockedTimeErrors()

                    :
                    <></>
                
                
                }

                <h3>Currently Blocked Out Times:</h3>
                {JSON.parse(dayData.blockedOffTimesArray).map((time, index)=>{
                    return(
                        <p
                        key={`${index} ${time} blocked off times array`}
                        >{time} 
                        <Button
                        // when this button is clicked, remove that time that is blocked off
                        color="secondary"
                        onClick={async ()=>{
                            try{
                                const response = await axios({
                                    method: 'PATCH',
                                    url: '/api/barbers/schedule/removeBlockedOffTime',
                                    data: {
                                        timeBlockedOff: time,
                                        dayCalendarId: dayData.id

                                    }
                                })
                                window.location.reload()
                            }catch(e){
                                console.log(e.response)
                            }
                        }}
                        >X</Button>
                        </p>
                    )
                })}
                
            </div>
            }

            <h3>
                Block Out Appointment Scheduling for the rest of this Day
                <input checked={dayBlocked}
                onClick={async (e)=>{ 
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
                            setErrorsArray((previous)=>{
                                let copyArray = [...previous]
                                copyArray.push(error)
                                return copyArray
                            })

                        }

                    }else{
                        setDayBlocked(e.target.checked)
                    }
                    }} type='checkbox'></input>
            </h3>


            </div> : <></>
        
        }
        

        </Modal>

        <BarberNavigationMenu></BarberNavigationMenu>
        <Errors setErrorsArray={setErrorsArray} errorsArray={errorsArray}></Errors>


        
        
        
        <br />
        <br />

    <Button 
    variant="contained"
    onClick={()=>{
        setshowWeeklySchedule(previous=> !previous)
    }}
    >Show Schedule</Button>
   
       <br />
        <br />
        
        <Calendar setResetFunction={setDate} resetValue={''} updateCalendar={updateData}  barberId={barber.id} setDateOfAppointment={setDate} setDateOfAppointmentData={setDayData} barberScheduleMenu={true}/>


    {date ? 
    
    <>
    <div>
        <h2>{date}</h2>
        <br />
        {
        dayData.availibility === 'none' ? <h3>You are not availible for this day</h3> : 
         <h3>Your Availibility for this day is {dayData.availibility}</h3>
        }

        <Button variant="contained" onClick={()=>{
            setChangeAvailibilityButton(true)
        }}>Change This days Availibility</Button>
        <br />


        {
            dayData.timeSlotsTaken === '' ? 
            <h3>You do not have any appointments for this day yet</h3> :
            <div>
            <h3>Appointments for this day:</h3>
            <br />
            {dayData.appointments.map((appointment =>{
                return ( <BarberScheduleAppointmentCard key={`${appointment.id}`} appointment={appointment} appointmentModalOpen={appointmentModalOpen} setAppointmentModalJSX={setAppointmentModalJSX} setAppointmentModalTitle={setAppointmentModalTitle} setAppointmentModalOpen={setAppointmentModalOpen}/>)
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