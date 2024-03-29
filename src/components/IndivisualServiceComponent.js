import React, {useState, useEffect} from "react";
import { Button } from "@mui/material";


function IndivisualServiceComponent({service, setUpdateServices, setErrorsArray}){
    const[currentlyShowing, setCurrentlyShowing]= useState('')
    const [name, setName]=useState(service.name)
    const [time, setTime]=useState(service.time)
    const [price, setPrice]= useState(service.price)
    if(currentlyShowing === 'update'){
        return(
            <>
            <form onSubmit={(e)=>{
                e.preventDefault()
                let error = false
                if(name.trim() === ''){
                    error= true
                    setErrorsArray((previous)=>{
                        let copyArray= [...previous]
                        copyArray.push('The service name cannot be blank')
                        return copyArray
                    })
                }
                console.log(time)
                if(`${time}`.trim() === ''){
                    error= true
                    setErrorsArray((previous)=>{
                        let copyArray= [...previous]
                        copyArray.push('The service time cannot be blank')
                        return copyArray
                    })
                }
                if(`${price}`.trim() === ''){
                    error= true
                    setErrorsArray((previous)=>{
                        let copyArray= [...previous]
                        copyArray.push('The service price cannot be blank')
                        return copyArray
                    })
                }
                if(error){
                    return
                }
                fetch('/api/barbers/services/UpdateService', {
                    method: 'PATCH',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        barberId: service.barberId,
                        id: service.id,
                        name,
                        time,
                        price
                    })
                }).then(res=>{
                    if(res.ok){
                        res.json().then(res=>{
                            console.log(res)
                            setUpdateServices(previous=> previous +1)
                            setCurrentlyShowing('')
                        }
                            
                        )
                    }else{
                        res.json().then(
                            res=> console.log(res)
                        )
                    }
                })

            }}>
            <h2>Service Name</h2>
            <input value={name} onChange={(e)=> setName(e.target.value)}></input>

            <h3>Total durration:</h3>
            <input value={time} onChange={(e)=> setTime(e.target.value)}></input>

            <h3>Service Price:</h3>
            <input value={price} onChange={(e)=> setPrice(e.target.value)}></input>

            <br />
            <br />
            <Button color="secondary" type="button" onClick={()=>setCurrentlyShowing('') }>Back</Button>
            <Button  color="secondary" type='submit'>Change Service</Button>
            </form>
            <br />
            <div>
            
            </div>
            </>
        )
    }

    return(
        <>
         <h2>{service.name}</h2>

        <h3>Total durration: {service.time} minutes</h3>

        <h3>${service.price}</h3>
        <div>
        <Button color="secondary" onClick={()=>setCurrentlyShowing('update') }>Change {service.name}</Button>
        <Button color="secondary" onClick={()=>{
            fetch('/api/barbers/services/Delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    id: service.id
                })
            })
            .then(res=>{
                if(res.ok){
                    res.json().then(res=>{ 
                        setUpdateServices(previous=> previous +1)
                        setCurrentlyShowing('')
                        console.log(res)})
                }else{
                    res.json().then(res=> console.log(res))
                }
            })
        }}>Delete Service</Button>
        </div>
        </>
    )
}

export default IndivisualServiceComponent