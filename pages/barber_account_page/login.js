import React, {useState} from "react";
import { useRouter } from "next/router";

function login(){

    const [gmail, setGmail]= useState('')
    const [password, setPassword]= useState('')
    const router = useRouter()

    function changeState(e, setFunction){
            setFunction(e.target.value)
    }
    return(
        <>
        <form onSubmit={(e)=>{
            e.preventDefault()
            console.log(gmail, password)
        }}>

           
        <h1>Login</h1>
       
        <br />
        <h2>Gmail</h2>
         <br />
        <input value={gmail} onChange={(e)=> changeState(e, setGmail)}></input>
        <br />
        <h2>Password</h2>
        <br />
        <input value={password} onChange={(e)=> changeState(e, setPassword)}></input> 
        <br />
        <br />
        <button type="submit">Log In</button>
        </form>
        <h3>New Barber?</h3>
        <br />
        <button onClick={()=> router.push(`/barber_account_page/signup`)}>Sign Up Here</button>

        
        </>
    )
}

export default login