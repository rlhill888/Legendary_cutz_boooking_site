import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { PrismaClient } from '@prisma/client'
import prisma from '../../lib/prisma.js'

export default async (req, res) =>{
    const salt = bcrypt.genSaltSync()
    const { gmail, name,  password, phoneNumber, recieveNewAppointmentReminders, recieveCanceledAppointmentReminders } = req.body
 
    let barber 
    

    try{
        barber = await prisma.barber.create({
                data: {
                    gmail: gmail,
                    password: bcrypt.hashSync(password, salt), 
                    phoneNumber: phoneNumber,
                    name: name,
                    recieveNewAppointmentReminders: recieveNewAppointmentReminders,
                    recieveCanceledAppointmentReminders: recieveCanceledAppointmentReminders
                }
            })
    } catch(e){
        res.json({error: e})
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
}