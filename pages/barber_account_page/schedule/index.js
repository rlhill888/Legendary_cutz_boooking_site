import React, { useState} from "react";
import Calendar from "../../../src/components/Calendar";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";


function Scheduling(){
    const [date, setDate]= useState('')
    console.log(date)

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        schedule
        <br />
        <br />
        <Calendar setDateOfAppointment={setDate}/>
        </>
    )
}

export default Scheduling