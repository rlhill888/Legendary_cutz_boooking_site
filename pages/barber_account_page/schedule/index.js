import React, { useState, useEffect} from "react";
import Calendar from "../../../src/components/Calendar";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { auth } from "../../../lib/mutations";
import { useRouter } from "next/router";


function Scheduling(){
    const [date, setDate]= useState('')
    const [barber, setBarber]= useState(null)
    const router= useRouter()
    console.log(date)

    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    if(res.barberActive===false){
                        router.push('/barber_account_page/schedule/setupschedule')
                    }
                    if(res.barberActive===true){
                        setBarber(res)
                    }
                    })
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()
       
    }, [])

  

    if(!barber){
        return(
            <>
            <h1>Loading...</h1></>
        )
    }

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        schedule
        <br />
        <br />
        <Calendar setDateOfAppointment={setDate}/>
        </>
    )
}

export default Scheduling