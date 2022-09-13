import react, {useEffect, useState} from "react";
import IndivisualCalendarDay from "./Calendar_components/IndivisualCalendarDay";


function Calendar(){
    
    const weekArray= ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat' ]
    const calendarNumberOfWeeksInAMonthArray = [1, 2, 3, 4, 5, 6]
    const [firstofMonthDay, setFirstOfMonthDay]= useState(null)
    const [month, setMonth]= useState(null)
    const [year, setYear]= useState(null)
    const [date, setDate]= useState(null)
    console.log(firstofMonthDay)
    useEffect(()=>{
        const newdate = new Date()
        setDate(newdate)
        const newmonth = newdate.getMonth()
        const newyear = newdate.getFullYear()
        setYear(newyear)
        const firstofMonth = new Date(`${newmonth + 1} 1, ${newyear}`)
        console.log(firstofMonth)
        const firstofMonthDay= firstofMonth.getDay();
        setMonth(newmonth)
        setFirstOfMonthDay(firstofMonthDay)
        console.log(`First Day of Month: ${weekArray[firstofMonthDay]}`)
    }, [])
    function mapCalendarOut(){

        let foundFirstOfMonthStartDate = false
        let dayCount = 0;
        const monthArray = [31,28,31,30,31,30,31,31,30,31,30,31]

        return calendarNumberOfWeeksInAMonthArray.map(week=>{
            if(!firstofMonthDay){
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
            function mapOutWeeks(){
                return weekArray.map((day, index)=>{
                console.log(index)
                if(index === firstofMonthDay && foundFirstOfMonthStartDate === false){
                    dayCount++
                    foundFirstOfMonthStartDate = true
                    return <IndivisualCalendarDay day={dayCount} availabilityStatus={2} />
                }
                if(foundFirstOfMonthStartDate === false && index !== firstofMonthDay || dayCount > monthArray[month]){
                    
                    return <IndivisualCalendarDay disabled blankCalendarDate/>
                }
                else{
                    dayCount++
                    return <IndivisualCalendarDay  day={dayCount}  availabilityStatus={3} />
                }
                
            })
            }
         
    }
    return(
        <>
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