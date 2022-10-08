export default function mapOutYear(year, daysOffArray, availibilityArray){
    let yearObj = {}
    const startDate = new Date(`01/01/${year}`)
    let daysInEachMonth = []
    if(year % 4 === 0){
        daysInEachMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }if(year % 4 !== 0){
        daysInEachMonth = [31, 28, 31, 30,31,30, 31, 31, 30, 31, 30, 31]
    }

    daysInEachMonth.map((numberOfDaysInTheMonth, index)=>{

        const month = index + 1
        yearObj = {...yearObj, 
        [month] : {
        }
        }


        for(let i = 0; i < numberOfDaysInTheMonth; i ++){
            const date = new Date(`${month}/${i+1}/${year}`)
            const weekday = date.getDay()
            let unavailability= null
            daysOffArray.forEach((dayOff)=>{
                if(weekday===dayOff){
                    unavailability= true
                }
            })

            
            yearObj[month] = {...yearObj[month], [i + 1]: {

                availability: unavailability ? false :  availibilityArray[weekday] === null ? true : availibilityArray[weekday],
                unavailability: unavailability,
                weekday: weekday,
                appointmentTimeSlotsTaken: []
            }}
        }
    })


    return(yearObj)
}