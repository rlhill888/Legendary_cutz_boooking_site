import react, {useState} from "react";


function IndivisualCalendarDay({disabled, blankCalendarDate, day, availabilityStatus, setDateOfAppointment, disabledDay, year, month }){
    const monthArrayIndex= month
    month = month + 1
    
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

    function findDate(){
        let dateString = `${
            
            month < 10 ? 
            `0${month}` :
            month}/${day}/${year}`

        const date = new Date(dateString)

        const weekday = date.getDay()
        const weekArray= ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' ]

        const finalizedDateString = `${weekArray[weekday]}, ${dateString}`
        return finalizedDateString
    }

    return(
        <>
        <div onClick={()=>{
            
            if(!disabled && !blankCalendarDate && !disabledDay){

                let dateString = findDate()
                setDateOfAppointment(dateString)
            }
            
        }
        } className={`${disabled || disabledDay ? 'IndivisualCalendarDiv disabled' : 'IndivisualCalendarDiv'}`}>
            {blankCalendarDate ? 
            <> </> :
            <h2 
            className="calendarDayHeader"
            >{day}</h2>
        }
            
            
           { disabled ?  <></> :
           
           <center>

            {disabledDay ? <></> : 
<h2
            className={determineAvailabilityStatus()}
            >
                5
            </h2>

            }
            


            </center>}
        </div>
        </>
    )
}

export default IndivisualCalendarDay