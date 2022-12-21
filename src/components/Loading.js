import { useState } from "react"
import barberLogo from '../../src/pictures/Barber_Logo.png'
import Image from "next/image"
import LinearProgress from '@mui/material/LinearProgress';


export default function Loading({loadingText}){

    return(
    <div className="div">
        <div className="imageDiv">
           <Image layout="responsive" width='100%' height='100%'  src={barberLogo} /> 
        </div>
        {loadingText ? 
        <div className="loadingTextDiv">
            <h1>{loadingText}</h1>
        
        </div> :

        <></>
        
        }
        <div className="progressDiv">
            <LinearProgress color="secondary"  sx={{colorPrimary: {
    backgroundColor: 'black',
  }}}/>
        </div>
        

        <style jsx>{`
            .div{
                width: 100vw;
                height: 100vh;
                padding-top: 30px;
                background-color: black;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .imageDiv{
                position: relative;
                width: 80vw;
                max-width: 500px;
                height: auto;
                margin: auto;
                border: 10px solid #171717;
                border-radius: 20px;
                filter: drop-shadow(0 0 1.5rem crimson)
            }
            .loadingTextDiv{
                color: white;
                text-align: center;
            }

            .progressDiv{
               
                width: 90%;
                margin: auto;
                margin-top: 100px;
                filter: drop-shadow(0 0 0.75rem crimson)
            }
            
            
            `}
        </style>
    
    </div>
    )
}