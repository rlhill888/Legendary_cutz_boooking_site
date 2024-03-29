import react, {useEffect, useState} from "react";

function Reciept({completePurchaseObj, setTotalAppointmentTime, setTotalAppointmentTimeInt, timeObj, totalReceipt, setTotalReciept}){


const [recieptsArray, setrecieptsArray]= useState([])




console.log('Everything', totalReceipt)
useEffect(()=>{
traverseCompletePurchseObj()


}, [])

setTotalAppointmentTimeInt(totalReceipt.totalTime)

function makeDurrationStringForTotalTime(){
    if(totalReceipt.totalTime >59){
        let hours = totalReceipt.totalTime/60
        hours = Math.trunc(hours)
        let remaindingTime = totalReceipt.totalTime - (hours*60)
        if(remaindingTime===0){
            let stringVariable = `${hours} hour${ hours > 1 ? 's' : ''}`
            setTotalAppointmentTime(stringVariable)
            return `${hours} hour${ hours > 1 ? 's' : ''}`
        }
        if(remaindingTime>0){

            let stringVariable =  `${hours} hour${ hours > 1 ? 's' : ''} and ${remaindingTime} minute${ remaindingTime > 1 ? 's' : ''}`
            setTotalAppointmentTime( stringVariable)
            return `${hours} hour${ hours > 1 ? 's' : ''} and ${remaindingTime} minute${ remaindingTime > 1 ? 's' : ''}`
        }
        
    }else{
        let stringVariable = `${totalReceipt.totalTime} minute${totalReceipt.totalTime > 1 ? 's' : ''}`
        setTotalAppointmentTime(stringVariable)
        return `${totalReceipt.totalTime} minute${totalReceipt.totalTime > 1 ? 's' : ''}`
    }
 }
function traverseCompletePurchseObj(){

    let totalObj ={
        totalPrice: 0,
        totalDurration: 0
    }

let namesArray = Object.keys(completePurchaseObj)

namesArray.map((name)=> getReciept(completePurchaseObj[`${name}`], name))
function getReciept(obj, key){

    let totalIndivisualObj = { 
    serviceNames: [],
    totalDurration: 0,
    totalPrice: 0
 }
 traverse(obj)

 function traverse(obj){
    for( let key in obj){
        if(key.toString() === 'durration'){
            totalIndivisualObj.totalDurration = totalIndivisualObj.totalDurration + obj[key]
            totalObj.totalDurration= totalObj.totalDurration + obj[key]
        }
        if(key.toString() === 'price'){
            totalIndivisualObj.totalPrice = totalIndivisualObj.totalPrice + obj[key]
            totalObj.totalPrice = totalObj.totalPrice + obj[key]
        }
        if(key.toString() !== 'price' && key.toString() !== 'durration'){
            totalIndivisualObj.serviceNames.push(key.toString())
        }
        if(Object.keys(obj[key]).length>0){
        traverse(obj[key])
        }else{
        
        }
    }
 }
 function makeDurrationString(){
    if(totalIndivisualObj.totalDurration >59){
        let hours = totalIndivisualObj.totalDurration/60
        hours = Math.trunc(hours)
        let remaindingTime = totalIndivisualObj.totalDurration - (hours*60)
        if(remaindingTime===0){
            setTotalAppointmentTime(`${hours} hour${ hours > 1 ? 's' : ''}`)
            return `${hours} hour${ hours > 1 ? 's' : ''}`
        }
        if(remaindingTime>0){
            setTotalAppointmentTime(`${hours} hour${ hours > 1 ? 's' : ''} and ${remaindingTime} minute${ remaindingTime > 1 ? 's' : ''}`)
            return `${hours} hour${ hours > 1 ? 's' : ''} and ${remaindingTime} minute${ remaindingTime > 1 ? 's' : ''}`
        }
        
    }else{
        setTotalAppointmentTime(`${totalIndivisualObj.totalDurration} minute${totalIndivisualObj.totalDurration > 1 ? 's' : ''}`)
        return `${totalIndivisualObj.totalDurration} minute${totalIndivisualObj.totalDurration > 1 ? 's' : ''}`
    }
 }


 let recieptObj = {
    Name: `${[key].toString()}:`,
    Services: [],
    totalPrice: `$${totalIndivisualObj.totalPrice}`,
    totalDurration: `${makeDurrationString()}`
 }
 totalIndivisualObj.serviceNames.map((name=>{ 
    return recieptObj.Services.push(`${name} - $${completePurchaseObj[key][name].price}`)}))

 setrecieptsArray((previous)=>{
    let copyArray = previous
    if(previous.length>= namesArray.length){
        return previous
    }else{
        copyArray.push(recieptObj)
        return copyArray
    }
    
 })
 console.log( 
    `Reciept for ${[key].toString()}-----`,
    `Services: ${totalIndivisualObj.serviceNames.map((name=>{ return ` ${name}`}))},`,
    `total Price: $${totalIndivisualObj.totalPrice},`,
    `total Durration: ${totalIndivisualObj.totalDurration} minutes`
 )
}
setTotalReciept((previous)=>{
    let copyObj = {...previous}

    copyObj.totalTime = totalObj.totalDurration
    copyObj.totalPrice = totalObj.totalPrice

    return copyObj
})
console.log(`The total time your appointment will take is ${totalObj.totalDurration} minutes.`, `The total Price for your appointemnt will be $${totalObj.totalPrice}.`)
}

console.log(recieptsArray)
    return (
        <div>
       {recieptsArray.map((array, index)=>{
        console.log(array)
        return (
            <div key={`receipt div ${array.name}, ${array.services} ${index}`}>
                <h2>Services for {array.Name}</h2>
                <h3>
                    <ol>

                        {array.Services.map(service=>{
                            return <li>{service}</li>
                        })}
                    </ol>
                    </h3>
                <h3>Total time for {array.Name}'s Services: {array.totalDurration}</h3>
                
            </div>
        )
       })}
       <hr></hr>
       <h2>Total Time: {makeDurrationStringForTotalTime()}</h2>
       <h2>Your appointemnt will be from {timeObj.appointmentStartTime} to {timeObj.appointmentEndTime}</h2>
       <h1>Total Price: ${totalReceipt.totalPrice} </h1>
        <hr />
       <h2>To finish booking your appointment at {timeObj.appointmentStartTime}, you must pay a $15 down deposit.
       <br />
       <br />
        After paying the down deposit, you will pay the remaining balance after your appointment is finished. </h2>

        <hr></hr>

        
        <h1>Total amount to be  paid after appointment is finished:
            <br />
            <br />
             ${totalReceipt.totalPrice - 15} </h1>
        
       <br />
       <style jsx>{`
        
        `}</style>
        </div>
    )
}

export default Reciept