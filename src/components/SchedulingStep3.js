import react, {useEffect, useState} from "react";

function SchedulingStep3({completePurchaseObj, setSchedulingStep, setTotalAppointmentTime, setTotalAppointmentTimeInt, setrecieptsArray, recieptsArray, setNameArray}){
console.log(completePurchaseObj)

const [totalReceipt, setTotalReciept]= useState({})
setTotalAppointmentTimeInt(totalReceipt.totalTime)

console.log(totalReceipt)
useEffect(()=>{
traverseCompletePurchseObj()
}, [])

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
setNameArray(namesArray)

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
        console.log(key)
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
        <>
       {recieptsArray.map((array)=>{
        console.log(array)
        return (
            <div key={`receipt div ${array.name}, ${array.services}`}>
                <h2>Services for {array.Name}</h2>
                <h3>
                    <ol>

                        {array.Services.map(service=>{
                            return <li>{service}</li>
                        })}
                    </ol>
                    </h3>
                <h3>Total time for {array.Name}'s Services: {array.totalDurration}</h3>
                {Object.keys(completePurchaseObj).length===1 ? (
                <>
                <h1>Total Price: ${totalReceipt.totalPrice} </h1>
                </>) : <></>}
            </div>
        )
       })}
       {Object.keys(completePurchaseObj).length>1 ? (<> 
       <h2>Total Time: {makeDurrationStringForTotalTime()}</h2>
       <h1>Total Price: ${totalReceipt.totalPrice} </h1>
       <br />
       </>) : <> </>}
       
       <button
       onClick={()=>{
        setSchedulingStep(4)
       }}
       >Select a date and time for your appointment</button>
        </>
    )
}

export default SchedulingStep3