import react, {useState} from "react";


function IndivisualCalendarDay({disabled, blankCalendarDate, day, availabilityStatus, setDateOfAppointment, disabledDay, year, month, dayData, setDateOfAppointmentData, blockOutUnavailibleDays, resetValue, setResetFunction}){
    const monthArrayIndex= month
    month = month + 1
    if(dayData){
        if(blockOutUnavailibleDays && dayData.availibility==='none'){
            disabled = true
    }
    }
    
    const numberOfAppointments = dayData ? dayData.appointments.length : null
    function determineAvailabilityStatus(){
        
        if(numberOfAppointments>=8){
            return 'calendarAppointmentNumberHeader lowAvailability'
        }
        if(numberOfAppointments>=5){
            return 'calendarAppointmentNumberHeader mediumAvailability'
        }
        if(numberOfAppointments<=3){
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
        <div style={blankCalendarDate ? {opacity: '0'} : {}} onClick={()=>{
            console.log('click')
            setResetFunction(resetValue)
            setDateOfAppointmentData(dayData)
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
            >
                {day}
                </h2>
        }
            
            
           { disabled ?  <></> :
           
           <center>

            {disabledDay ? <></> : 
<h2
            className={determineAvailabilityStatus()}
            >
                {/* {numberOfAppointments} */}
            </h2>

            }
            


            </center>}
        </div>
        </>
    )
}

export default IndivisualCalendarDay