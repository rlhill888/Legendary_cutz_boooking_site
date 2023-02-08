import React, {useState, useEffect} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import { Button, TextField } from "@mui/material";
import Errors from "../../../src/components/Errors";


function CreateService(){
    const [name, setName]= useState('')
    const [serviceDurration, setServiceDurration]= useState('')
    const [servicePrice, setServicePrice]= useState('')
    const router = useRouter()
    const [barber, setBarber]= useState('')
    const [errorsArray, setErrorsArray]= useState([])

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
        <Errors errorsArray={errorsArray} setErrorsArray={setErrorsArray}></Errors>
        <form
        onSubmit={(e)=>{
            e.preventDefault()
            let errors = false
            if(name.trim()  === ''){
                errors= true
                setErrorsArray((previous)=>{
                    let copyArray = [...previous]
                    copyArray.push('The service name cannot be blank')
                    return copyArray
                })
            }
            if(serviceDurration.trim()  === ''){
                errors= true
                setErrorsArray((previous)=>{
                    let copyArray = [...previous]
                    copyArray.push('The service duration cannot be blank')
                    return copyArray
                })
                
            }
            if(servicePrice.trim() === ''){
                errors= true
                setErrorsArray((previous)=>{
                    let copyArray = [...previous]
                    copyArray.push('The service price cannot be blank')
                    return copyArray
                })
                
            }
            if(errors){
                return
            }
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
        <TextField sx={{input: {color: 'white'}}} color="secondary" variant="standard" value={name} onChange={(e)=> setName(e.target.value)}></TextField>
        <br />
        <h2>Service Duration</h2>
        <TextField sx={{input: {color: 'white'}}} color="secondary" variant="standard" type='number' value={serviceDurration} onChange={(e)=>{ setServiceDurration(e.target.value)}}></TextField> 
        <h2>Service Price</h2>
        <TextField sx={{input: {color: 'white'}}} color="secondary" variant="standard" type='number' value={servicePrice} onChange={(e)=>{ setServicePrice(e.target.value)}}></TextField>
        <br />
        <br />
        {
            //make input for uploading pictures
        }

        <Button type="submit" variant="contained" color="secondary">Create New Service</Button>
        </form>
       
        </>
    )
}

export default CreateService