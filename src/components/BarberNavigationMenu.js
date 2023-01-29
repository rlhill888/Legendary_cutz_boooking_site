import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from "@mui/material";
import Icon from '@mui/material/Icon';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Badge from '@mui/material/Badge';
import axios from "axios";


function BarberNavigationMenu(){

    const router = useRouter()
    const [messageBadgeNumber, setMessageBadgeNumber]= useState(null)

    useEffect(()=>{
        async function fetchBadgeNumber(){
            const badgeNumber = await axios({
                url: '/api/messages/messageNavigationBadgeIcons'
            })
            // setMessageBadgeNumber(badgeNumber.data)
            setMessageBadgeNumber(badgeNumber.data)
        }
        fetchBadgeNumber()

    }, [])
    return(
        <>
        <div>
            <ButtonGroup
            fullWidth
            >
                <Button
                variant="contained"
                onClick={()=> router.push('/barber_account_page/services')}
                >
                    <DesignServicesIcon color="secondary"/>
                </Button>
                <Button 
                variant="contained"
                onClick={()=> router.push('/barber_account_page/schedule')}
                >
                    <CalendarMonthIcon color="secondary"/>
                </Button>
                <Button
                variant="contained"
                onClick={()=> router.push('/barber_account_page/')}
                >
                    <HomeIcon color="secondary"/>
                </Button>
                <Button
                variant="contained"
                onClick={()=> router.push('/barber_account_page/messages')}
                >
                    <Badge style={{
                        color: 'black'
                    }} badgeContent={messageBadgeNumber} color='tertiary'>
                      <MailIcon color="secondary"/>  
                    </Badge>
                    
                </Button>
                <Button
                variant="contained"
                onClick={()=> router.push('/barber_account_page/account')}
                >
                    <AccountCircleIcon color="secondary"/>
                </Button>

            </ButtonGroup>


        </div>
        </>
    )
}

export default BarberNavigationMenu