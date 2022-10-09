import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../lib/mutations";
import { useRouter } from "next/router"; 
import BarberNavigationMenu from "../../src/components/BarberNavigationMenu";


function Home(){
    const router = useRouter()
    const [barber, setBarber]= useState(null)
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

    if(!barber){
        return(
            <>
            <h1>Loading...</h1>
            </>
        )
    }

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        This the homepage {barber.name}</>
    )
}

export default Home