import react, {useState} from "react";
import SpecificTimeSlot from "./SpecificTimeSlot";


function SpecificTimeOfDaySelector({timeSlotArray, dateOfAppointment, totalAppointmentTime, totalAppointmentTimeInt}){

    const [activatedTimeSlot, setActivatedTimeSlot]= useState(0)

    function mapSpecificTimeSlots(){
        let specificTimeSlotId = 0

        return timeSlotArray.map(times =>{
            specificTimeSlotId++
            return(
                <>
                    <SpecificTimeSlot totalAppointmentTime={totalAppointmentTime} times={times} specificTimeSlotId={specificTimeSlotId} activatedTimeSlot={activatedTimeSlot} setActivatedTimeSlot={setActivatedTimeSlot} totalAppointmentTimeInt={totalAppointmentTimeInt}/>
                    <br />
                </>
            )
        })

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