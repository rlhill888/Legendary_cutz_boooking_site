import react, {useState} from "react";


function IndivisualCalendarDay({disabled, blankCalendarDate, day, availabilityStatus}){
    function determineAvailabilityStatus(){
        if(availabilityStatus===1){
            return 'calendarAppointmentNumberHeader lowAvailability'
        }
        if(availabilityStatus===2){
            return 'calendarAppointmentNumberHeader mediumAvailability'
        }
        if(availabilityStatus===3){
            return 'calendarAppointmentNumberHeader highAvailability'
        }else{
            return 'calendarAppointmentNumberHeader'
        }
    }

    return(
        <>
        <div className={`${disabled ? 'IndivisualCalendarDiv disabled' : 'IndivisualCalendarDiv'}`}>
            {blankCalendarDate ? 
            <> </> :
            <h2 
            className="calendarDayHeader"
            >{day}</h2>
        }
            
            
           { disabled ?  <></> :
           
           <center>
            <h2
            className={determineAvailabilityStatus()}
            >
                5
            </h2>
            </center>}
        </div>
        </>
    )
}

export default IndivisualCalendarDay