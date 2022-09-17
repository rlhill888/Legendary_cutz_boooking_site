import react, {useState} from "react";
import Calendar from "./Calendar";
import SpecificTimeOfDaySelector from "./SpecificTimeOfDaySelector";

function SchedulingStep4(){

    const [dateOfAppointment, setDateOfAppointment]= useState(null)


    // Going to be a variable set up in state. when day is clicked on calendar, a new open time slot array for that day will be pushed up into the variable up in state
    // below is a temp time slot array
    const timeSlotArray = [
        ['10:00am', '12:30pm'],
        ['2:00pm', '5:30pm'],
        ['6:45pm', '9:00pm']
    ]

    return(
        <>Step 4
        <Calendar setDateOfAppointment={setDateOfAppointment}/>

        {dateOfAppointment ? <SpecificTimeOfDaySelector timeSlotArray={timeSlotArray} dateOfAppointment={dateOfAppointment} /> : <> </>}

        </>
    )
}

export default SchedulingStep4