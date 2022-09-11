import react, {useState} from "react";


function IndivisualCalendarDay({disabled, blankCalendarDate, day}){


    return(
        <>
        <div className={`${disabled ? 'IndivisualCalendarDiv disabled' : 'IndivisualCalendarDiv'}`}>
            {blankCalendarDate ? 
            <> </> :
            <h2 
            className="calendarDayHeader"
            >{day}</h2>
        }
            
            
           { disabled ?  <></> : <h2
            className="calendarAppointmentNumberHeader"
            >
                5
            </h2>}
        </div>
        </>
    )
}

export default IndivisualCalendarDay