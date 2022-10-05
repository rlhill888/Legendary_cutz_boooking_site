import React from "react";
import { useRouter } from "next/router";


function BarberNavigationMenu(){

    const router = useRouter()
    return(
        <>
        <div
        style={{
            display: 'flex',
            flexDirection: 'row'
        }}
        >
            <button
            onClick={()=> router.push('/barber_account_page/services')}
            >
                Services
            </button>
            <button 
            onClick={()=> router.push('/barber_account_page/schedule')}
            >
                Schedule
            </button>
            <button
            onClick={()=> router.push('/barber_account_page/')}
            >
                Home
            </button>
            <button
            onClick={()=> router.push('/barber_account_page/messages')}
            >
                Messages
            </button>
            <button
            onClick={()=> router.push('/barber_account_page/account_settings')}
            >
                Account
            </button>

        </div>
        </>
    )
}

export default BarberNavigationMenu