import prisma from "../../../../lib/prisma";


export default async  function handler(req, res){
    const body = req.body
    console.log(body)
    if(req.method === 'POST'){
        console.log('tried')
        try{
            const month = await prisma.MonthCalendar.findUnique({
                where: {
                    monthBarberId: {
                        barberId: body.barberId,
                        monthDate: body.monthDate
                    }
                },
                include: {
                    days: {
                        include: {
                            appointments: {
                                select: {
                                    dateOfAppointment: true
                                }
                            }
                        }
                    }
                }
            })
            console.log('month:', month)
            return res.json(month)
        }catch(error){
            console.log(error)
            return res.json(error)
        }
    }
     
}