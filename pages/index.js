
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import axios from "axios";
export default function Home() {
  const [barbers, setBarbers]= useState(null)
  const router = useRouter()
  console.log(barbers)
  useEffect(()=>{
    (async ()=>{
      try{
        const response = await axios ({
          method: 'GET',
          url: '/api/barbers/getBarbers'
        })
        setBarbers(response.data)
      }catch(error){
        console.log(error)
      }
      }
    )()
  }, [])
  //^ this array will be fetched from backend
    if(!barbers){
      return(
        <h1>Loading...</h1>
      )
    }

  return (
   <>
   <div>
    <h1>Select a barber you would like to book with</h1>
    {barbers.map((barber)=>{
      return(
        <button onClick={()=>{
          router.push(`/barbers/${barber.id}`)
        }} >{barber.name}</button>
      )
    })}
   </div>
    
    
   </>
  )
}
