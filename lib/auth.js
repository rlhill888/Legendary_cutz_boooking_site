import jwt from 'jsonwebtoken'
import prisma from './prisma'

export const validateRoute = (handler)=>{
    return async (req, res)=>{
        const token = req.cookies.BARBER_ACCESS_TOKEN

        console.log(token)

        if(token){
            let barber

            try{
                const {id} = jwt.verify(token, 'hello')
                console.log(id)
                 barber = await prisma.barber.findUnique({
                    where: { id }
                })
                
                if(!barber){
                     res.json('Unauthorized')
                }

            }catch(error){
                res.status(401)
                res.json({error: 'Unauthorized'})
                return

            }
               return handler(req, res, barber)
        }
        else{
            res.status(401)
            res.json({error: 'Not authorized'})
            return 

        }
     

    }
}