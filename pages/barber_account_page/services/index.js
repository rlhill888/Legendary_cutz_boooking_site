import React, {useState} from "react";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import { useRouter } from "next/router";

function Services(){

    const [editing, setEditing]= useState(false)
    const router = useRouter()
    return(
        <>
        <BarberNavigationMenu />
        <div>
            {
                editing === false ? 
                <div>
                <h1>Here Are the Services You Currently Offer</h1>
                {
                // List of all barber's services goe here
                }
            </div> :
          
            <div>
                <h1>Services</h1>
                <br />
                <br />
                <button onClick={()=>{
                    router.push('services/createService')
                }}>Create a New Service</button>
                <br />
                <br />
            </div>
            }
            <button onClick={()=> setEditing(previous=> !previous)}>Edit Services</button>
        
        </div>
        </>
    )
}

export default Services