import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma.js'

export default async (req, res)=>{
    console.log(req.body)
    const body = req.body

    const barber = await prisma.barber.findUnique({
        where: {
            gmail: body.gmail
        }
    })
    // console.log(barber)

    if(barber && bcrypt.compareSync(body.password, barber.password)){
        const token = jwt.sign({
            id: barber.id,
            gmail: barber.gmail
        }, 'hello', {
            expiresIn: '8h'
        })

        res.setHeader('Set-Cookie', cookie.serialize('BARBER_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }))

        res.json(barber)
        // change secret token when deploying app
    }else{
        res.status(401)
        res.json({error: 'Gmail or password is invalid'})
    }
}