import React from "react";
import { useEffect } from "react";
import { auth } from "../../lib/mutations";
import { useRouter } from "next/router"; 

function Home(){
    const router = useRouter()

    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> console.log(res))
            }else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })
        }

        fetchData()
       
    }, [])

    return(
        <>This the homepage</>
    )
}

export default Home