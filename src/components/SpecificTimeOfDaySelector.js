import { formControlClasses } from "@mui/material";
import react, {useState} from "react";
import SpecificTimeSlot from "./SpecificTimeSlot";


function SpecificTimeOfDaySelector({timeSlotArray, dateOfAppointment, totalAppointmentTime, totalAppointmentTimeInt, setTimeObj, setSchedulingStep, dayData}){
    console.log(timeSlotArray)
    const [activatedTimeSlot, setActivatedTimeSlot]= useState(0)

    function mapSpecificTimeSlots(){
        let specificTimeSlotId = 0
        if(timeSlotArray!=='' && timeSlotArray){
            return timeSlotArray.map(times =>{
            specificTimeSlotId++
            return(
                <>
                    <SpecificTimeSlot setTimeObj={setTimeObj} totalAppointmentTime={totalAppointmentTime} times={times} specificTimeSlotId={specificTimeSlotId} activatedTimeSlot={activatedTimeSlot} setActivatedTimeSlot={setActivatedTimeSlot} totalAppointmentTimeInt={totalAppointmentTimeInt} setSchedulingStep={setSchedulingStep}/>
                    <br />
                </>
            )
        })
        }
        

    }
    if(dayData.availibility==='none'){
        return(
            <>
            <h2>{dateOfAppointment}</h2>
            <h3>The barber is not taking appointments for this day</h3>
            </>

        )
    }
    if(timeSlotArray===''){
        return(<>
        <h2>{dateOfAppointment}</h2>
        <h3>You can make an appointment any time from {dayData.availibility}</h3>
        </>)
    }

    return (
        <>
        <div>
            <h2>{dateOfAppointment}</h2>
            <br />
            {mapSpecificTimeSlots()}

        </div>
        </>
    )

}

export default SpecificTimeOfDaySelector