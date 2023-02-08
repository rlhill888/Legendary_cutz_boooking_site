import React, {useState, useEffect} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import IndivisualServiceComponent from "../../../src/components/IndivisualServiceComponent";
import Loading from '../../../src/components/Loading';
import Errors from "../../../src/components/Errors";
import { Button } from "@mui/material";

function Services(){

    const [editing, setEditing]= useState(false)
    const router = useRouter()
    const [barber, setBarber]= useState(null)
    const [updateServices, setUpdateServices]= useState(1)
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
       
    }, [updateServices])

    if(!barber){
        return(
            <>
            <Loading />
            </>
        )
    }
    return(
        <>
        <BarberNavigationMenu />
        <Errors errorsArray={errorsArray} setErrorsArray={setErrorsArray}></Errors>
        <div>
            {
                editing === false ? 
                <div>
                <h1>Here Are the Services You Currently Offer</h1>
                {
                barber.services.map((service)=>{
                    return(
                        <div key={`${service.name}, ${service.id}`}> 
                        <h2>{service.name}</h2>

                        <h3>Total durration: {service.time} minutes</h3>

                        <h3>${service.price}</h3>
                        </div>
                    )
                })
                }
            </div> :
          
            <div>
                <h1>Services</h1>
                <br />
                <br />
                <Button  variant="contained" onClick={()=>{
                    router.push('services/createService')
                }}>Create a New Service</Button>
                <br />
                <br />
                {
                barber.services.map((service)=>{
                    return(
                        <IndivisualServiceComponent setErrorsArray={setErrorsArray} setUpdateServices={setUpdateServices} key={`service: ${service.id}`} service={service}/>
                    )
                })
                }
                <br />
            </div>
            }
            <Button variant="contained" onClick={()=> setEditing(previous=> !previous)}>
                {
                    !editing ? 'Edit Services' : 'Back'
                }</Button>
        
        </div>
        </>
    )
}

export default Services