import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import axios from "axios";

export default validateRoute(async (req, res, barber)=>{
    const body = req.body

    const yearData = body.yearData

    async function createYear(yearInt){
        try{
            const year = await prisma.yearCalendar.create({
                data: {
                    calendarObj: '',
                    barberId: barber.id,
                    year: yearInt
                }
            })
            return year

        }catch(error){
            if(error.response){
                return res.json({error: error})

            }else if(error.request){
                return res.json({error: error})

            }else{
                return res.json({message: 'sum bad happened'})
            }
        }

    }

    async function createMonth(monthNameString, monthNumber, monthDate, yearId){

        try{

                const month = await prisma.monthCalendar.create({
                    data: {
                        month: monthNameString,
                        monthNumber: monthNumber,
                        monthDate: monthDate,
                        barberId: barber.id,
                        yearId: yearId
                    }
                })
                return month

        }catch(error){

            if(error.response){
                return res.json({error: error})

            }else if(error.request){
                return res.json({error: error})

            }else{
                return res.json({message: 'sum bad happened'})
            }

        }

    }
    async function createDay(dayInt, availibility, weekDayInt, weekDayString, dayBlockedOff, dateString, monthId, yearId){

        try{

            const day = await prisma.dayCalendar.create({
                data: {
                    day: dayInt,
                    availibility: availibility,
                    weekDayInt: weekDayInt,
                    weekDayString: weekDayString,
                    dayBlockedOff: dayBlockedOff,
                    date: dateString,
                    barberId: barber.id,
                    monthId: monthId,
                    yearId: yearId,
                    timeUnavailable: '',
                }
            })
            return day

        }catch(error){

            if(error.response){
                return res.json({error: error})

            }else if(error.request){
                return res.json({error: error})

            }else{
                return res.json({message: 'sum bad happened'})
            }


        }

    }





    const monthArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const theYear = body.year
    if(barber && barber.fiveYearScheduleCreated === false){
        const newYear= await createYear(theYear)
        for(let month in yearData){
            
            const monthNameString = monthArray[month - 1]
            const monthDate= `${month}/${theYear}`
            const newMonth = await createMonth(monthNameString, parseInt(month - 1), monthDate, newYear.id)
            
            for(let day in yearData[month]){
                let availability
                const weekDayInt =  yearData[month][day].weekday
                const weekDayString= weekday[weekDayInt]
                let dayBlockedOff
                const date = `${month}/${day}/${theYear}`
                if(yearData[month][day].availability === false && yearData[month][day].unavailability === true){
                    dayBlockedOff = true
                }else{
                    dayBlockedOff = false
                }

                if(yearData[month][day].availability===false){
                    availability = 'none'
                }
                if(yearData[month][day].availability){
                    availability = yearData[month][day].availability
                }
                
                const newDay = await createDay(parseInt(day), availability, weekDayInt, weekDayString, dayBlockedOff, date, newMonth.id, newYear.id)
            }

        }


            
        return res.json({message: 'done'})
    }

   
})