import React, {useState, useEffect} from "react";
import { useRouter } from "next/router"; 
import { useSWRConfig } from "swr";
import { auth } from "../../lib/mutations";

function login(){

    const [gmail, setGmail]= useState('')
    const [password, setPassword]= useState('')
    const [loading, setLoading]= useState(false)
    const router = useRouter()

    function changeState(e, setFunction){
            setFunction(e.target.value)
    }

    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(router.push('/barber_account_page'))
            }
        })
        }

        fetchData()
       
    }, [])
    return(
        <>
        <form onSubmit={ async (e)=>{
            e.preventDefault()
            console.log(gmail, password)
            setLoading(true)
            await auth('signin', {gmail, password}).then(res=>{
                if(res.ok){
                    res.json().then(res=>{
                        console.log(res)
                        setLoading(false)
                        router.push('/barber_account_page')
                    })
                    

                }else{
                    setLoading(false)
                    res.json().then(res => console.log(res))
                }
            } )
          
            
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