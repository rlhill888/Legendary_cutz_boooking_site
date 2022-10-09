import React, {useEffect, useState} from "react";
import { auth } from "../../../lib/mutations";
import { useRouter } from "next/router";
import TimeInputComponent from "../../../src/components/TimeInputComponent";
import mapOutYear from "../../../lib/mapOutYearObj";
import axios from "axios";

function Setupschedule(){
    const weekArray= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [barber, setBarber]= useState(null)
    const [weekdayArray, setWeekdayArray]= useState([false, false, false, false, false, false, false])
    const [updateChaneg, setUpdateChange]= useState(0)
    const [time, setTime]= useState([null, null, null, null, null, null, null])
    const [timeFinalized, setTimeFinalized]= useState(false)
    const [finalizeTime, setFinalizeTime]= useState(false)
    const [error, setError]= useState([])
    const router = useRouter()


    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    setBarber(res)})
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()
       
    }, [])

    return(
    <>
    <h1>Since This is Your first time logging in, You should set up your schedule.</h1>
    <br />
    <h2>Are there any days you would like to consistently have off?</h2>
    <div>
        <h3>Monday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[1] = !copyArray[1]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[1]} type='checkbox'></input></h3>
         <h3>Tuesday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[2] = !copyArray[2]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[2]} type='checkbox'></input></h3>
        <h3>Wednesday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[3] = !copyArray[3]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[3]} type='checkbox'></input></h3>
        <h3>Thursday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[4] = !copyArray[4]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[4]} type='checkbox'></input></h3>
         <h3>Friday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[5] = !copyArray[5]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[5]} type='checkbox'></input></h3>
         <h3>Saturday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[6] = !copyArray[6]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[6]} type='checkbox'></input></h3>
         <h3>Sunday <input  onChange={(e)=> {
            let copyArray = weekdayArray
            copyArray[0] = !copyArray[0]
            setWeekdayArray(copyArray)
            setUpdateChange(previous=> previous +1)
            console.log(copyArray)
        }} value={weekdayArray[0]} type='checkbox'></input></h3>
        
    </div>
    <br />
    <h2>Please Select the times you will be operating on every day of the week</h2>

    {weekdayArray.map((weekDay, index)=>{
         return(
            <TimeInputComponent key={`time input componet ${index}`} setError={setError} setTime={setTime} index={index} weekdayArray={weekdayArray} finalizeTime={finalizeTime} timeFinalized={timeFinalized}/>
        ) 
       
    })}
    <br />
    <button
    onClick={ async ()=>{ 
        
        setFinalizeTime(previous=> !previous)
        let timeSucess= true
        let erorIndex= []

        for(let i = 0; i < 7; i++){
            const index = i
            if(time[index] === null && weekdayArray[index] ===false){
                timeSucess = false
                erorIndex.push(i)
            }
        }
        if(timeSucess=== false){
            console.log(`Please make sure you entered a time for ${erorIndex.map(error=>{
                return(` ${weekArray[error]}`)
            })}`)
            return 
        }
        let daysOffArray = []
        weekdayArray.map((day, index)=>{
            if(day){
                daysOffArray.push(index)
            }
        })
        const date = new Date()
        const currentYear = date.getFullYear()
        const yearArray = [currentYear, currentYear+1, currentYear+2, currentYear+3, currentYear+4]
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
        }catch(error){
            console.log(error)
        }
        })
       
    }}
    
    >Create Schedule</button>


    </>
    )
}
export default Setupschedule