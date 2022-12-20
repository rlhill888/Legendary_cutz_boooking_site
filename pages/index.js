
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button } from "@mui/material";
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
   <div className="otterDiv">
    <div className="mainDiv">
    <h1 className="header">SELECT A BARBER</h1>
    <div className="buttonsDiv">
          {barbers.map((barber)=>{
      return(
        <Button color="secondary" style={{width: '100%'}} variant="contained" onClick={()=>{
          router.push(`/barbers/${barber.id}`)
        }} >{barber.name}</Button>
      )
    })}
    </div>

    </div>

    <style jsx>{`
      

      .header{
        font-size: 24px;
        
      }
      .otterDiv{
        {/* background-image: url('https://images.squarespace-cdn.com/content/v1/60046b784616fd2204d5d47e/1611506127459-U4OB3EF20S7OZZ8LWS36/barber%2Bcheckout.jpg');
        background-size: cover; */}
        

      }
      .barberButton{
        width: 100%;
      }
      .buttonsDiv{
        width: 100%;
        overflow-y: auto;
        height: 70%;
      }
      
      
      `}


    </style>
   </div>
    
    
   </>
  )
}
