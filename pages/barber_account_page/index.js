import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../lib/mutations";
import { useRouter } from "next/router"; 
import BarberNavigationMenu from "../../src/components/BarberNavigationMenu";
import axios from "axios";
import BarberScheduleAppointmentCard from "../../src/components/BarberScheduleAppointmentCard";
import Loading from '../../src/components/Loading'


function Home(){
    const router = useRouter()
    const [barber, setBarber]= useState(null)
    const  [dayData, setDayData]= useState(null)
    const [totalMoney, setTotalMoney]= useState(null)
    // const value = mapOutYear(2022)

    // console.log(value)

    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    setBarber(res)})
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()

       
       
    }, [])

    useEffect(()=>{
        if(barber){
            (async ()=>{
               
        const todayDate = new Date()
        const todayMonth = todayDate.getMonth()
        const todayYear = todayDate.getFullYear()
        const todayDay= todayDate.getDate()
        const date = `${todayMonth + 1}/${todayDay}/${todayYear}`

        try{
            const response = await axios({
                method: 'PATCH',
                url: '/api/barbers/schedule/getTodaysAppointments',
                data: {
                    date: date
                }

            })
            setDayData(response.data)
            console.log(response.data)
            let total = 0
            response.data.appointments.map((appointment)=>{
                total = total + (appointment.totalPriceAfterDownPayment + 15)
            })
            setTotalMoney(total)
            
            
        }catch(error){

        }
        })() 
        }
       
        

        

    }, [barber])

    if(!barber || !dayData){
        return(
            <>
            <Loading />
            </>
        )
    }

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        <h1>{dayData.date}</h1>
        {dayData.availibility === 'none' ? <h1>You are scheduled as unavailibile today</h1> : <h1>Your Schedule for today is from {dayData.availibility} </h1>}
        {dayData.appointments.length > 0 ? 
        <div>
        <h2>The total amount of money you should be making today is ${totalMoney}</h2>
        <br />
        <h1>Your Appointments For Today</h1>
        <div>
        {dayData.appointments.map((appointment =>{
                return ( <BarberScheduleAppointmentCard key={`${appointment.id}`} appointment={appointment}/>)
            }))}
        </div>
        </div>
        :
        <div>
            <h1>You do not have any Appoitnments Scheduled for Today</h1>
        </div>
    }
    
        
        
        </>
    )
}

export default Home