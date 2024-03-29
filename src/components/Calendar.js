import react, {useEffect, useState} from "react";
import IndivisualCalendarDay from "./Calendar_components/IndivisualCalendarDay";
import axios from "axios";
import Loading from "./Loading";
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


function Calendar({setDateOfAppointment, disableSelectionsForPreviousDaysPastTodaysDate, barberId, setDateOfAppointmentData, barberScheduleMenu, blockOutUnavailibleDays, updateCalendar, setResetFunction, resetValue}){
    const monthArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekArray= ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' ]
    const calendarNumberOfWeeksInAMonthArray = [1, 2, 3, 4, 5, 6]
    const [firstofMonthDay, setFirstOfMonthDay]= useState(null)
    const [month, setMonth]= useState(null)
    const [year, setYear]= useState(null)
    const [date, setDate]= useState(null)
    const [todaysDay, setTodaysDay]= useState(null)
    const [monthData, setMonthData]= useState(null)
    const [calendarLoading, setCalendarLoading]= useState(false)

    // going to fetch barbers availability inside of this function to find out what each day looks like
    useEffect( ()=>{
        (async ()=> {
    const newdate = new Date()
            setDate(newdate)
            const todayDay = newdate.getUTCDate()
            setTodaysDay(todayDay)
            const newmonth = newdate.getMonth()
            const newyear = newdate.getFullYear()

            
            if(!year){
                setYear(newyear)
            }
            let firstofMonth
            if(month ===null){
                firstofMonth = new Date(`${newmonth + 1}/1/${newyear}`)
            }
            if(month){
                firstofMonth = new Date(`${month + 1}/1/${year}`)
                
            }
            if(month === 0){
                firstofMonth = new Date(`${month + 1}/1/${year}`)
            }
            
            const firstofMonthDay= firstofMonth.getDay();
            if(!month && month!== 0){
                setMonth(newmonth)
            }
            let monthVar
            let yearVar
            if(!month && month!== 0){
                monthVar = newmonth + 1
                yearVar = newyear
            }
            if(month || month === 0){
                monthVar = month + 1
                yearVar = year
            }
            setFirstOfMonthDay(firstofMonthDay)
            try{
                const url = barberScheduleMenu ? '/api/barbers/schedule/getScheduleMonthBarberScheduleMenu' : '/api/barbers/schedule/getScheduleMonth'
                const response = await axios({
                    method: 'POST',
                    url: `${url}`,
                    data: {
                        barberId: barberId,
                        monthDate: `${monthVar}/${yearVar}`
                    }
                })
                function compare(a, b){
                    return a.day - b.day
                }
                let data = response.data
                let dataDaysArray = data.days.sort(compare)
                data.days = dataDaysArray
                setMonthData(data)
                setCalendarLoading(false)
            }catch(error){
                console.log(error)
            }
        })()
        
    
    }, [month, year, updateCalendar])


    function mapCalendarOut(){
        const todayDate = new Date()
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear()
        let foundFirstOfMonthStartDate = false
        let dayCount = 1;
        const monthArray = [31,28,31,30,31,30,31,31,30,31,30,31]

        return calendarNumberOfWeeksInAMonthArray.map(week=>{
            if(!firstofMonthDay && firstofMonthDay!==0){
                return(
                    <>
                    </>
                )
            }

            return <div 
            key={`${week} week mapped out`}
            style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                {
                
                mapOutWeeks()
               
                }
                
                
            </div>
    
            })
            let startDayCount = false


            function mapOutWeeks(){
                
                return weekArray.map((day, index)=>{
                    let dayData = monthData.days[dayCount-1]

                   
                    
                    
                    if(startDayCount===true){
                       dayCount++ 
                       dayData = monthData.days[dayCount-1]
                    }
                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false &&  dayCount <= todaysDay -1 && month === todayMonth && year === todayYear && disableSelectionsForPreviousDaysPastTodaysDate){
                    startDayCount = true
                    foundFirstOfMonthStartDate = true
                    return   <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays} setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} disabledDay day={dayCount} year={year} month={month} dayData={dayData}/>
                }

                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false &&  dayCount <= todaysDay -1 ){
                    startDayCount = true
                    foundFirstOfMonthStartDate = true
                    return   <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays} setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} availabilityStatus={3}  day={dayCount} year={year} month={month} dayData={dayData}/>
                }

                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false){
                   
                    foundFirstOfMonthStartDate = true
                    return <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays} setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} day={dayCount} availabilityStatus={2} year={year} month={month} dayData={dayData}/>
                }


                if(foundFirstOfMonthStartDate === false && index !== firstofMonthDay || dayCount > monthArray[month]){
                    
                    return <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays} setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} disabled blankCalendarDate year={year} month={month} dayData={dayData}/>
                }


                if( dayCount <= todaysDay -1 && month === todayMonth && year === todayYear && disableSelectionsForPreviousDaysPastTodaysDate){
                   
                    return   <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays}  setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} disabledDay day={dayCount} year={year} month={month} dayData={dayData}/>
                }


                else{
                  
                    return <IndivisualCalendarDay key={`${month} ${index} Calendar Mapped Out`} resetValue={resetValue} setResetFunction={setResetFunction} blockOutUnavailibleDays={blockOutUnavailibleDays}  setDateOfAppointmentData={setDateOfAppointmentData} setDateOfAppointment={setDateOfAppointment} day={dayCount}  availabilityStatus={3} year={year} month={month} dayData={dayData}/>
                }
                
            })
            }
         
    }

    function determineIfMonthAndYearAreBeforeTodaysDate(){

        const todayDate = new Date()
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear()
        if(todayYear < year){
            return true
        }
        if(todayYear <= year && todayMonth < month){
            return true
        }else{
            return false
        }

    }

    if(monthData===null){
        return(
            <>
            <div
            style={{
                width: '100vw',
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <CircularProgress color="secondary" />
            </div>
            
            </>
        )
    }
    return(
        <div>

        {disableSelectionsForPreviousDaysPastTodaysDate ? 
            determineIfMonthAndYearAreBeforeTodaysDate() ?
             <Button
             
             color="secondary"
             onClick={()=>{
                setResetFunction(resetValue)
                setCalendarLoading(true)
                 if(month - 1 < 0){
                     setYear(year - 1)
                     return setMonth(11)
                 }else{
                     setMonth(previous=> previous - 1)
                 }
             }}
             >Previous Month</Button> : 
             <><Button  color="secondary" disabled>Previous Month</Button> </>
             
             
             
             :
             <Button
             color="secondary"
             onClick={()=>{
                setResetFunction(resetValue)
                setCalendarLoading(true)
                 if(month - 1 < 0){
                     setYear(year - 1)
                     return setMonth(11)
                 }else{
                     setMonth(previous=> previous - 1)
                 }
             }}
             >Previous Month</Button>
    
        }
        
        <Button color="secondary"onClick={()=>{
            
            setResetFunction(resetValue)
            setCalendarLoading(true)
            if(month + 1 > 11){
                setYear(year + 1)
                return setMonth(0)
            }else{
                setMonth(previous=> previous + 1)
            }
        }}>Next Month</Button>
        <h1>{monthArray[month]} {year}</h1>
        <div
        style={{
            display: 'flex',
            flexDirection: 'row'
        }}
        >
        
          {weekArray.map(weekday=>{
            return <div
            className="caledarWeekdayHeader"
            key={`week day calendar mapped out ${weekday}`}
            >
                <h3>
                    {weekday}
                </h3>
            </div>
        })}  
        </div>
        
        {
        calendarLoading ?
        <div
            style={{
                width: '100vw',
                height: '30vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <CircularProgress color="secondary" />
        </div>

        :
        <div
        className="calendarDaysDiv"
        >
            {mapCalendarOut()}
        </div>
        
        
        }
        <style jsx>{`
            
            .calendarDaysDiv{
            }
            `}

        </style>
       
        </div>
    )
}

export default Calendar