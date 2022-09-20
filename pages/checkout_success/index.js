import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from "swr";
import axios from "axios";


export async function getServerSideProps(){
    const { query } = useRouter()
    const session_id = router.query["session_id"]

    return{
        props: {
            session_id: query.session_id
        }
    }
}


function Sucess({session_id}){

    const [purchaseInfo, setPurchaseInfo]= useState(null)
  

    const fetcher = url => axios.get(url).then(res =>{ 
        res.json().then(res=>{
            setPurchaseInfo(res.data)
            console.log(res)
        })
    })
    
    console.log(session_id)

    const {data, error} = useSWR(
        ()=> `/api/checkout_sessions/${session_id}`,
        fetcher
    )

    return(
        <>
        <div>
            {error ? (
                <div>
                    <h1>There was an error</h1>
                    </div>
            ) : data ? (
                <div>
                    <h1>Successful Payment</h1>
                    <h1>more about opting in to recieve text message reminders about appointment </h1>
                    </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
        </>
    )
}
export default Sucess

