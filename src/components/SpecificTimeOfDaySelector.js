import react from "react";
import SpecificTimeSlot from "./SpecificTimeSlot";


function SpecificTimeOfDaySelector({timeSlotArray, dateOfAppointment}){

    return (
        <>
        <div>
            <h2>{dateOfAppointment}</h2>
            <br />
            {timeSlotArray.map(times =>{
                return(
                    <>
                        <SpecificTimeSlot />
                        <br />
                    </>
                )
            })}

        </div>
        </>
    )

}

export default SpecificTimeOfDaySelector