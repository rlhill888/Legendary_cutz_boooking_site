import React, {useState, useEffect} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import { Button } from "@mui/material";


function CreateService(){
    const [name, setName]= useState('')
    const [serviceDurration, setServiceDurration]= useState('')
    const [servicePrice, setServicePrice]= useState('')
    const router = useRouter()
    const [barber, setBarber]= useState('')

    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> setBarber(res))
            }else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })
        }

        fetchData()
       
    }, [])
    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        <form
        onSubmit={(e)=>{
            e.preventDefault()
            fetch('/api/barbers/services/CreateService', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    barberId: barber.id,
                    time: serviceDurration,
                    price: servicePrice,
                    name: name
                })
            }).then(
                res=>{
                    if(res.ok){
                        res.json().then(res=>{
                            console.log(res)
                            router.push('/barber_account_page/services')
                        })
                    }else{
                        res.json().then(res=>{
                            console.log(res)
                        })
                    }
                }
            )
        }}
        >
        <h1>Create a new Service</h1>
        <br />
        <h2>Service Name</h2>
        <input value={name} onChange={(e)=> setName(e.target.value)}></input>
        <br />
        <h2>Service Duration</h2>
        <input type='number' value={serviceDurration} onChange={(e)=>{ setServiceDurration(e.target.value)}}></input> 
        <h2>Service Price</h2>
        <input type='number' value={servicePrice} onChange={(e)=>{ setServicePrice(e.target.value)}}></input>
        <br />
        <br />
        {
            //make input for uploading pictures
        }

        <Button variant="contained" color="secondary">Create New Service</Button>
        </form>
       
        </>
    )
}

export default CreateService