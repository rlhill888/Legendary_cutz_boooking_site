import React, {useState, useEffect} from "react";
import { useRouter } from "next/router"; 
import { useSWRConfig } from "swr";
import { auth } from "../../lib/mutations";
import { Button, TextField } from "@mui/material";

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
        <div className="mainDiv">

        <div>

        
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
            <TextField sx={{input: {color: 'white'}}} variant='standard' color="secondary" value={gmail} onChange={(e)=> changeState(e, setGmail)}></TextField>
            <br />
            <h2>Password</h2>
            <br />
            <TextField sx={{input: {color: 'white'}}} variant='standard' color="secondary" value={password} onChange={(e)=> changeState(e, setPassword)}></TextField> 
            <br />
            <br />
            <Button color="secondary" variant='contained' type="submit">Log In</Button>
            </form>
            <h3>New Barber?</h3>
            <br />
            <Button color='secondary' onClick={()=> router.push(`/barber_account_page/signup`)}>Sign Up Here</Button>

        </div>
        <style jsx>{`

            .mainDiv{
                display: 'flex';
                justify-content: 'center';
                align-items: center;
                height: 80vh;
                width: 300px;
                

            }

            .subDiv{
                height: auto;
                width: auto;
                padding: 35px;

            }
            
            
            `}</style>

        
        </ div>
    )
}

export default login