import React from "react";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from "swr";
import axios from "axios";

function SucessId(){

    const [purchaseInfo, setPurchaseInfo]= useState(null)
  

    const fetcher = url => axios.get(url).then(res => setPurchaseInfo(res.data))
    
    const router = useRouter()
    const session_id = router.query["session_id"]
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
export default SucessId