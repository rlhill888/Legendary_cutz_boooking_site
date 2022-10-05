import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma.js'

export default async (req, res) =>{

    if(req.method === 'POST'){
        const salt = bcrypt.genSaltSync()
    // const { gmail, name,  password, phoneNumber, recieveNewAppointmentReminders, recieveCanceledAppointmentReminders } = JSON.parse(req.body)


    const body = JSON.parse(req.body)
 
    let barber 
    

    try{
        barber = await prisma.barber.create({
                data: {
                    gmail: body.gmail,
                    password: bcrypt.hashSync(body.password, salt), 
                    phoneNumber: parseInt(body.phoneNumber) ,
                    name: body.name,
                    recieveNewAppointmentReminders: body.recieveNewAppointmentReminders,
                    recieveCanceledAppointmentReminders: body.recieveCanceledAppointmentReminders,
                    offDays: ''
                }
            })
    } catch(e){
        res.status(401).json({statusCode: 500, message: e.message})
        return 
    }


    
    const token = jwt.sign({
        gmail: barber.gmail,
        id: barber.id,
        time: Date.now() 
    },
    'hello',
    {expiresIn: '8h'}
    
    )

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('BARBER_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
    )

    res.json(barber)
    }else{
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    
}