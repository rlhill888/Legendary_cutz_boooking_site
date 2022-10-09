import react, {useEffect, useState} from "react";
import IndivisualCalendarDay from "./Calendar_components/IndivisualCalendarDay";


function Calendar({setDateOfAppointment, disableSelectionsForPreviousDaysPastTodaysDate}){
    const monthArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekArray= ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' ]
    const calendarNumberOfWeeksInAMonthArray = [1, 2, 3, 4, 5, 6]
    const [firstofMonthDay, setFirstOfMonthDay]= useState(null)
    const [month, setMonth]= useState(null)
    const [year, setYear]= useState(null)
    const [date, setDate]= useState(null)
    const [todaysDay, setTodaysDay]= useState(null)

    // going to fetch barbers availability inside of this function to find out what each day looks like
    useEffect(()=>{
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
        
        setFirstOfMonthDay(firstofMonthDay)
        console.log(`First Day of Month: ${weekArray[firstofMonthDay]}`)
    }, [month, year])
    function mapCalendarOut(){
        const todayDate = new Date()
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear()
        let foundFirstOfMonthStartDate = false
        let dayCount = 1;
        const monthArray = [31,28,31,30,31,30,31,31,30,31,30,31]

        return calendarNumberOfWeeksInAMonthArray.map(week=>{
            console.log(firstofMonthDay)
            if(!firstofMonthDay && firstofMonthDay!==0){
                return(
                    <>
                    </>
                )
            }

            return <div style={{
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
                    if(startDayCount===true){
                       dayCount++ 
                    }
                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false &&  dayCount <= todaysDay -1 && month === todayMonth && year === todayYear && disableSelectionsForPreviousDaysPastTodaysDate){
                    startDayCount = true
                    foundFirstOfMonthStartDate = true
                    return   <IndivisualCalendarDay setDateOfAppointment={setDateOfAppointment} disabledDay day={dayCount} year={year} month={month}/>
                }
                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false &&  dayCount <= todaysDay -1 ){
                    startDayCount = true
                    foundFirstOfMonthStartDate = true
                    return   <IndivisualCalendarDay setDateOfAppointment={setDateOfAppointment} availabilityStatus={3}  day={dayCount} year={year} month={month}/>
                }

                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false){
                   
                    foundFirstOfMonthStartDate = true
                    return <IndivisualCalendarDay setDateOfAppointment={setDateOfAppointment} day={dayCount} availabilityStatus={2} year={year} month={month}/>
                }
                if(foundFirstOfMonthStartDate === false && index !== firstofMonthDay || dayCount > monthArray[month]){
                    
                    return <IndivisualCalendarDay setDateOfAppointment={setDateOfAppointment} disabled blankCalendarDate year={year} month={month}/>
                }
                if( dayCount <= todaysDay -1 && month === todayMonth && year === todayYear && disableSelectionsForPreviousDaysPastTodaysDate){
                   
                    return   <IndivisualCalendarDay setDateOfAppointment={setDateOfAppointment} disabledDay day={dayCount} year={year} month={month}/>
                }
                else{
                  
                    return <IndivisualCalendarDay  setDateOfAppointment={setDateOfAppointment} day={dayCount}  availabilityStatus={3} year={year} month={month}/>
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
    console.log(determineIfMonthAndYearAreBeforeTodaysDate())
    return(
        <>

        {disableSelectionsForPreviousDaysPastTodaysDate ? 
            determineIfMonthAndYearAreBeforeTodaysDate() ?
             <button
             onClick={()=>{
                 if(month - 1 < 0){
                     setYear(year - 1)
                     return setMonth(11)
                 }else{
                     setMonth(previous=> previous - 1)
                 }
             }}
             >Previous Month</button> : 
             <><button disabled>Previous Month</button> </>
             
             
             
             :
             <button
             onClick={()=>{
                 if(month - 1 < 0){
                     setYear(year - 1)
                     return setMonth(11)
                 }else{
                     setMonth(previous=> previous - 1)
                 }
             }}
             >Previous Month</button>
    
        }
        
        <button onClick={()=>{
            if(month + 1 > 11){
                setYear(year + 1)
                return setMonth(0)
            }else{
                setMonth(previous=> previous + 1)
            }
        }}>Next Month</button>
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
            >
                <h3>
                    {weekday}
                </h3>
            </div>
        })}  
        </div>
        
        {mapCalendarOut()}
       
        </>
    )
}

export default Calendar