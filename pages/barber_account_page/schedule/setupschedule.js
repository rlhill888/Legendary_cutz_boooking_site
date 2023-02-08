import React, {useEffect, useState} from "react";
import { auth } from "../../../lib/mutations";
import { useRouter } from "next/router";
import TimeInputComponent from "../../../src/components/TimeInputComponent";
import mapOutYear from "../../../lib/mapOutYearObj";
import axios from "axios";
import { Button } from "@mui/material";
import Loading from '../../../src/components/Loading';
import pickApartIndividualTimesAndMakeThemMilitary from '../../../lib/pickApartIndividuakTimesAndMakeThemMilitary';
import Checkbox from '@mui/material/Checkbox';

function Setupschedule(){
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [barber, setBarber]= useState(null)
    const [weekdayArray, setWeekdayArray]= useState([false, false, false, false, false, false, false])
    const [updateChaneg, setUpdateChange]= useState(0)
    const [time, setTime]= useState([null, null, null, null, null, null, null])
    const [timeFinalized, setTimeFinalized]= useState(false)
    const [finalizeTime, setFinalizeTime]= useState(false)
    const [error, setError]= useState([])
    const [loading, setLoading]= useState(false)
    const router = useRouter()


    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    setBarber(res)
                    if(res.fiveYearScheduleCreated ===true){
                        router.push('/barber_account_page/schedule')
                    }
                
                })
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()
       
    }, [])
    if(loading){
        return(
            <Loading loadingText={'Creating Your Initial Calendar... This may take some time. Do Not Reload or Exit From this Page While Your Schedule is Being Created'}/>
        )
    }

    return(
    <>
    <h1>Since This is Your first time logging in, You should set up your schedule.</h1>
    <br />
    <h2>Are there any days you would like to consistently have off?</h2>
    <div>
        <h3>Monday <Checkbox color="secondary"  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[1] = !copyArray[1]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
          
        }} value={weekdayArray[1]} type='checkbox'></Checkbox></h3>
         <h3>Tuesday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[2] = !copyArray[2]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[2]} type='checkbox'></Checkbox></h3>
        <h3>Wednesday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[3] = !copyArray[3]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[3]} type='checkbox'></Checkbox></h3>
        <h3>Thursday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[4] = !copyArray[4]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[4]} type='checkbox'></Checkbox></h3>
         <h3>Friday <Checkbox color="secondary"  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[5] = !copyArray[5]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[5]} type='checkbox'></Checkbox></h3>
         <h3>Saturday <Checkbox color="secondary"  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[6] = !copyArray[6]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[6]} type='checkbox'></Checkbox></h3>
         <h3>Sunday <Checkbox color="secondary"  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[0] = !copyArray[0]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
        }} value={weekdayArray[0]} type='checkbox'></Checkbox></h3>
        
    </div>
    <br />
    <h2>Please Select the times you will be operating on every day of the week</h2>

    {weekdayArray.map((weekDay, index)=>{
         return(
            <TimeInputComponent key={`time input componet ${index}`} setError={setError} setTime={setTime} index={index} weekdayArray={weekdayArray} finalizeTime={finalizeTime} timeFinalized={timeFinalized}/>
        ) 
       
    })}
    <br />
    <Button
    color="secondary"
    variant="contained"
    onClick={ async ()=>{ 
       



        setFinalizeTime(previous=> !previous)
        let timeSucess= true
        let erorIndex= []
        let errorMessage= []

        for(let i = 0; i < 7; i++){
            const index = i
            if(time[index] === null && weekdayArray[index] ===false){
                timeSucess = false
                erorIndex.push(i)
            }
            if(time[index]){
                const militaryTimesForTime= pickApartIndividualTimesAndMakeThemMilitary(time[index])
                if(militaryTimesForTime[0] >= militaryTimesForTime[1]){
                    timeSucess = false
                    errorMessage.push(`Your end time is before your start time for this time slot: ${time[index]}`)
                }
                
            }
        }
        if(timeSucess=== false){
            console.log(`Please make sure you entered a time for ${erorIndex.map(error=>{
                return(` ${weekArray[error]}`)
            })}`)
            errorMessage.map(error=>{
                console.log(error)
            })
            return 
        }
        setLoading(true)
        let daysOffArray = []
        weekdayArray.map((day, index)=>{
            if(day){
                daysOffArray.push(index)
            }
        })
        const date = new Date()
        const currentYear = date.getFullYear()
        const yearArray = [currentYear, currentYear+1, currentYear+2, currentYear+3, currentYear+4, currentYear+5, currentYear+6, currentYear+7]
        let requestGood 
        yearArray.map(async (year)=>{
            const scheduleyear= mapOutYear(year, daysOffArray, time)
            try{
            const fetchRequest = await axios({
                method: 'POST',
                url: '/api/calendar/createInitialCalendar',
                data: {
                    yearData: scheduleyear,
                    year: year
                }

            })
            console.log(fetchRequest.data)
            requestGood = true
        }catch(error){
            console.log(error)
            requestGood = false
            setLoading(false)
        }
        if(requestGood){
            try{
               const fetchRequest = await axios({
                method: 'PATCH',
                url: '/api/barbers/UpdateBarberCalendarsMadeVar',
                data: {
                    daysOff: daysOffArray,
                    weeklySchedule: time

                }
            }) 
            console.log(fetchRequest.data)
            router.push('/barber_account_page/schedule')
            }catch(error){
                console.log(error)
                setLoading(false)
            }
        }
        })
    }}
    >Create Schedule</Button>


    </>
    )
}
export default Setupschedule