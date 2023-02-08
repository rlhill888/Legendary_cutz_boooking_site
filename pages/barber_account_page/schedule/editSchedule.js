import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import { auth } from "../../../lib/mutations";
import axios from "axios";
import TimeInputComponent from "../../../src/components/TimeInputComponent";
import UpdateTimeInputComponent from "../../../src/components/UpdateTimeComponent";
import Loading from '../../../src/components/Loading';
import pickApartIndividualTimesAndMakeThemMilitary from '../../../lib/pickApartIndividuakTimesAndMakeThemMilitary';
import Errors from "../../../src/components/Errors";
import BarberNavigationMenu from "../../../src/components/BarberNavigationMenu";
import Checkbox from '@mui/material/Checkbox';


function EditSchedule(){
    const [barber, setBarber]= useState(null)
    const [weeklySchedule, setWeeklySchedule]= useState(null)
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [weekdayArray, setWeekdayArray]= useState([false, false, false, false, false, false, false])
    const [time, setTime]= useState([null, null, null, null, null, null, null])
    const [timeFinalized, setTimeFinalized]= useState(false)
    const [finalizeTime, setFinalizeTime]= useState(false)
    const [updateChaneg, setUpdateChange]= useState(0)
    const [loading, setLoading]= useState(false)
    const [errorsArray, setErrorsArray]= useState([])

    const [error, setError]= useState([])
    console.log(`time:`,time)
    const router = useRouter()
    useEffect(  ()=>{
        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    if(res.fiveYearScheduleCreated===false){
                        router.push('/barber_account_page/schedule/setupschedule')
                    }
                    if(res.fiveYearScheduleCreated===true){
                        setBarber(res)
                        setWeeklySchedule(JSON.parse(res.weeklyAvailibility))
                        let weeklyAvailibility = JSON.parse(res.weeklyAvailibility)
                        let copyWeekdayArray= []
                        weeklyAvailibility.map((weekDay)=>{
                            if(weekDay===null){
                                return  copyWeekdayArray.push(true)
                            }else{
                               return  copyWeekdayArray.push(false) 
                            }
                           
                        })
                        console.log(copyWeekdayArray)
                        setWeekdayArray(copyWeekdayArray)
                        setTime(JSON.parse(res.weeklyAvailibility))
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
    if(!barber){
        return <Loading />
    }
    if(loading){
        return(
            <Loading loadingText={'Creating Your Initial Calendar... This may take some time. Do Not Reload or Exit From this Page While Your Schedule is Being Created'}/>
        )
    }

    return(
        <>
        <BarberNavigationMenu></BarberNavigationMenu>
        <Errors errorsArray={errorsArray} setErrorsArray={setErrorsArray}/>
        <div>
        <h3>Monday <Checkbox 
        color="secondary"
        onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[1] = !copyArray[1]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[1]} checked={weekdayArray[1]}type='checkbox'></Checkbox></h3>
         <h3>Tuesday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[2] = !copyArray[2]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[2]} checked={weekdayArray[2]}type='checkbox'></Checkbox></h3>
        <h3>Wednesday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[3] = !copyArray[3]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[3]} checked={weekdayArray[3]}type='checkbox'></Checkbox></h3>
        <h3>Thursday <Checkbox color="secondary"  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[4] = !copyArray[4]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[4]} checked={weekdayArray[4]}type='checkbox'></Checkbox></h3>
         <h3>Friday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[5] = !copyArray[5]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[5]} checked={weekdayArray[5]}type='checkbox'></Checkbox></h3>
         <h3>Saturday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[6] = !copyArray[6]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[6]} checked={weekdayArray[6]}type='checkbox'></Checkbox></h3>
         <h3>Sunday <Checkbox color="secondary" onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[0] = !copyArray[0]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[0]} checked={weekdayArray[0]}type='checkbox'></Checkbox></h3>
        
    </div>
    <br />
    {weekdayArray.map((weekDay, index)=>{
         return(
            <UpdateTimeInputComponent time={time} key={`time input componet ${index}`} setError={setError} setTime={setTime} index={index} weekdayArray={weekdayArray} finalizeTime={finalizeTime} timeFinalized={timeFinalized}/>
        ) 
       
    })}
    <br />
    <button
    onClick={ async ()=>{ 
        
        setFinalizeTime(previous=> !previous)
        let timeSucess= true
        let erorIndex= []
        let errorMessage= []

        let errors= []

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
            if(erorIndex.length >=1){
                errors.push(`Please make sure you entered a time for ${erorIndex.map(error=>{
                    return(` ${weekArray[error]}`)
                })}`)
            }
            
            errorMessage.map(error=>{
                errors.push(error)
            })
            setErrorsArray(errors)
            return 
        }

        setLoading(true)
        let daysOffArray = []
        weekdayArray.map((day, index)=>{
            if(day){
                daysOffArray.push(index)
            }
        })

        try{
            const response = await axios({
                method: 'PATCH',
                data: {
                    daysOffArray,
                    weeklySchedule: time,
                    barberId: barber.id
                },
                url: '/api/barbers/schedule/updateSchedule'
            })
            console.log(response.data)
            router.push('/barber_account_page/schedule')
        }catch(error){
           return console.log(error)
        }

    }}
    >Update Schedule</button>
        </>
    )
}

export default EditSchedule