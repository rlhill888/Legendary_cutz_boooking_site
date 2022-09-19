import React from "react";
import { useRouter } from 'next/router';
import useSWR from "swr";

function CheckoutSuccess(){
    const {
        query: {session_id}
    } = useRouter()

    const {data, error} = useSwr(
        ()=> `/api/checkout_sessions/${session_id}`
    )

    return(
        <>Success</>
    )
}
export default CheckoutSuccess