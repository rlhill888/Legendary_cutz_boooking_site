import React from "react";
import {useSession, signIn, signOut} from 'next-auth/react'

function GoogleAuthLoginComponent(){
    const {data: session}= useSession()
    if(session){
        console.log(session)
        return(
            <div>
                <h3>The Event was Successfully added to your calendar</h3>
                <button onClick={()=>{
                    signOut()
                }}>Sign Out</button>
            </div>
        )
    }else{
     return(
        <div>
            <button onClick={()=>{ signIn()}}>Sign Into Google Account</button>
        </div>
    )   
    }
    
}

export default GoogleAuthLoginComponent