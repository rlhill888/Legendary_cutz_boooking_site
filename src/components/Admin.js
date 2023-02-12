import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';



function Admin(){
    const [openAdminOptions, setOpenAdminOptions]= useState(false)
    const [barbers, setBarbers]= useState(null)
    const [barberSearch, setBarberSearch]= useState('')
    const [refetchBarbers, setRefetchBarbers]= useState(0)

    useEffect(()=>{

        async function fetchBarbers(){
         const barbers = await axios({
            url: '/api/barbers/adminGetBarbers',
            method: 'GET',
        }) 
        let newBarbersArray = barbers.data.sort()
        setBarbers(barbers.data)
        }

        fetchBarbers()
        

    }, [refetchBarbers])

    return(
        <div className="div">
        {
            
            openAdminOptions ? 
            <div>
                <h3>Barbers List</h3>
                <SearchIcon style={{marginRight: '10px'}} color="secondary"/>
                <TextField value={barberSearch} onChange={(e)=> setBarberSearch(e.target.value.toLowerCase()) } sx={{input: {color: 'white'}}} variant="standard" color="secondary"></TextField>

                <div className="barberListDiv">
                    {
                        barbers.filter(barber=> barber.name.toLowerCase().includes(barberSearch)).map((barber)=>{
                            return(
                                <div  
                                className="barberNameListDiv"
                                key={`admin barber names list${barber.id}`}> 
                                <h3>{barber.name}</h3>
                                {barber.barberActive ?  <Button 
                                onClick={async ()=>{
                                    try{
                                        const response = await axios({
                                            url: '/api/barbers/toggleBarberActive',
                                            method: 'PATCH',
                                            data: {
                                                barberId: barber.id,
                                                barberActiveValue: false
                                            }
                                        })
                                        console.log(response.data)
                                        setRefetchBarbers(previous=> previous + 1)

                                    }catch(error){
                                        console.log(error)
                                    }
                                }}
                                sx={{color: '#00FF00'}}>Active</Button> : <Button 
                                onClick={async ()=>{
                                    try{
                                        const response = await axios({
                                            url: '/api/barbers/toggleBarberActive',
                                            method: 'PATCH',
                                            data: {
                                                barberId: barber.id,
                                                barberActiveValue: true
                                            }
                                        })
                                        console.log(response.data)
                                        setRefetchBarbers(previous=> previous + 1)

                                    }catch(error){
                                        console.log(error)
                                    }
                                }}
                                sx={{color: '#FF0000'}}>Inactive</Button>}
                               
                                
                                

                                </div>
                            )
                        })
                    }

                </div>

                <Button
                style={{marginTop: '40px'}}
                variant="contained"
                color="secondary"
                onClick={()=>{
                    setOpenAdminOptions(false)
                }}
                >Close Admin Menu</Button>
            </div>

            :
            
            <Button
            variant="contained"
            color="secondary"
            onClick={()=>{
                setOpenAdminOptions(true)
            }}>Open Admin Menu</Button>
        
        }

        <style jsx>{`
            
            .div{
                margin-top: 20px;
            }
            .barberListDiv{
                max-height: 80vh;
                overflow-y: auto;
                margin-top: 15px;
            }
            .barberNameListDiv{
                display: flex;
                flex-direction: row;
                padding: 10px;
                width: 80vw;
                border: 1px solid black;
                border-radius: 12px;
                margin: 10px 20px;
                justify-content: space-between;
            }
            `}</style>



        </div>
    )
}

export default Admin