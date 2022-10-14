import prisma from "../../../lib/prisma";


export default async (req, res)=>{

    const body = req.body
    function pickAppartIndivisualTimesAndMakeThemMilitary(theTwoTimes){
        let temptime1= ''
        let temptime2= ''
        let hitSecondTime = false
        for(let character of theTwoTimes){
            if(character==='-'){
                hitSecondTime = true
            }
            if(hitSecondTime ===false){
                temptime1 = temptime1 + character
            }
            if(hitSecondTime ===true && character!=='-'){
                temptime2 = temptime2 + character
            }
            
        }
        let timeArray = []
        let time1 = temptime1.slice(0, -1)
        let time2 = temptime2.substring(1).slice(0,-1)

        const militaryTime1 = convertToMilitaryTime(time1)
        const militaryTime2 = convertToMilitaryTime(time2)

        return [parseInt(militaryTime1.trim()), parseInt(militaryTime2.trim())]
    }

    function convertToMilitaryTime(time){
        let hitMinute = false
        let amOrPm= ''

        let hour= ''
        let minute= ''

        for(let character of time){
            if(character.toLowerCase() === 'a'){
                amOrPm='am'
                break
            }
            if(character.toLowerCase() === 'p'){
                amOrPm='pm'
                break
            }
            if(hitMinute === false && character!==':'){
                hour = hour + character
            }
            if(hitMinute === true && character!==':'){
                minute = minute + character
            }
            if(character === ':'){
                hitMinute= true
            }
        }

        if(amOrPm==='pm'){
            if(parseInt(hour)===12){

            }else{
                const hourInt = parseInt(hour)
                hour = (hourInt + 12).toString()
                
            }
        }

        return `${hour}${minute}`
    }

    


   
    if(req.method === 'POST'){
        let appointmentTimesWithinSlot = true
        const dayCalendar = await prisma.dayCalendar.findUnique({
            where:{
                id: body.dayCalendarId
            }
        })
        if(!dayCalendar){
            return res.json({error: 'The data for the day you are trying to schedule this appointment for was not found'}).status(404)
        }

        let appointment
        let yearId
        let monthId
        let timeSlotsTakenArray

        if(dayCalendar.timeSlotsTaken === ''){

         timeSlotsTakenArray = []
        const militaryTimesForAppointmentTime= pickAppartIndivisualTimesAndMakeThemMilitary(`${body.appointmentStartTime} - ${body.appointmentEndTime}`)
        

       

        

        

        for(let timeSlot of timeSlotsTakenArray){
            const militaryTimesForTimeSlot = pickAppartIndivisualTimesAndMakeThemMilitary(timeSlot)
            if((militaryTimesForAppointmentTime[0] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[0] < militaryTimesForTimeSlot[1]) || (militaryTimesForAppointmentTime[1] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[1] < militaryTimesForTimeSlot[1])){
                appointmentTimesWithinSlot = false
                return res.json({error: 'Appointment Time Conflicts With Barber Schedule Time'}).status(422)
            }else{
                appointmentTimesWithinSlot = true
            }
        }   

        }else{
         timeSlotsTakenArray = JSON.parse(dayCalendar.timeSlotsTaken)
        const militaryTimesForAppointmentTime= pickAppartIndivisualTimesAndMakeThemMilitary(`${body.appointmentStartTime} - ${body.appointmentEndTime}`)

        

        

        for(let timeSlot of timeSlotsTakenArray){
            const militaryTimesForTimeSlot = pickAppartIndivisualTimesAndMakeThemMilitary(timeSlot)
            if((militaryTimesForAppointmentTime[0] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[0] < militaryTimesForTimeSlot[1]) || (militaryTimesForAppointmentTime[1] > militaryTimesForTimeSlot[0] && militaryTimesForAppointmentTime[1] < militaryTimesForTimeSlot[1])){
                appointmentTimesWithinSlot = false
                return res.json({error: 'Appointment Time Conflicts With Barber Schedule Time'}).status(422)
            }else{
                appointmentTimesWithinSlot = true
            }
        }   
        }
        


        if(appointmentTimesWithinSlot=== true){
            // sort time slots functipn
            timeSlotsTakenArray.push(`${body.appointmentStartTime} - ${body.appointmentEndTime}`)

            timeSlotsTakenArray = timeSlotsTakenArray.sort((a, b)=>{
                const firstTimeMilitaryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(a)
                const secondTimeMilitaryTimes = pickAppartIndivisualTimesAndMakeThemMilitary(b)
                return firstTimeMilitaryTimes[0] - secondTimeMilitaryTimes[0]
            })
            try{
                const updateDay = await prisma.dayCalendar.update({
                    where: {
                        id: dayCalendar.id
                    },
                    data: {
                        timeSlotsTaken: JSON.stringify(timeSlotsTakenArray) 
                    }
                })

            }catch(error){
                console.log(error)
                res.json({error: error})
            }
        try{
            const year = await prisma.yearCalendar.findUnique({
                where: {
                    yearBarberId: {
                        year: body.year,
                        barberId: body.barberId
                    }
                }
            })
            yearId = year.id
        }catch(error){
            console.log(error)
        }

        try{
            const month = await prisma.monthCalendar.findUnique({
                where: {
                    monthBarberId: {
                        monthDate: body.monthDate,
                        barberId: body.barberId
                    }
                }
            })
            monthId = month.id
        }catch(error){
            console.log(error)
        }
        console.log(yearId)
        
        try{
            appointment = await prisma.appointment.create({
                data: {
                    barber:{ 
                        connect:{ 
                        id: body.barberId}},
                    stripeSessionsId: body.stripeSessionsId,
                    appointmentStartTime: body.appointmentStartTime,
                    appointmentEndTime: body.appointmentEndTime,
                    totalPriceAfterDownPayment: body.totalPriceAfterDownPayment,
                    dateOfAppointment: body.dateOfAppointment,
                    appintmnetCustomerNames: body.appintmnetCustomerNames,
                    phomeNumber: body.phomeNumber,
                    
                    recieptDetails: body.recieptDetails,
                    dayCalendar: {
                        connect: {
                            id: body.dayCalendarId
                        }
                    },
                    yearCalendar: {
                        connect: {
                            id: yearId
                        }
                    },
                    monthCalendar: {
                        connect: {
                            id: monthId
                        }
                    }

                }
            })
            res.json(appointment)
            res.status(200)
        }catch(error){
            console.log(error)
            res.status(401).json({statusCode: 500, message: error.message})
        return 
        }            
        }else{
            console.log('false')
        }


       
    }else{
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

}