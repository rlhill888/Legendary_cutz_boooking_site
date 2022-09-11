import react, {useState} from "react";
import MultipleUsersSchedulingComponentInput from "./MultipleUsersSchedulingComponentInput";

function SchedulingStep1({setSchedulingStep, setServiceNamerray}){
    const [singleUserScheduling, setSingleUserScheduling]= useState(null)
    const [singleUserName, setSingleUserName]= useState('')
    const [customersArray, setCustomersArray]= useState([ '' , ''])

    
    function checkSingleUserNameInput(){
        if(singleUserName.length >=1){
            return false
        }
        else{
            return true
        }
    }

    function checkIfAllInputsAreFilledIn(){

        for(let customerInput of customersArray){
            if(customerInput.length<1){
                return true
            }
        }

        return false
    }

    if(singleUserScheduling=== true){
        return(
            <>
                <h2>What is Your Name?</h2>
                <br />
                <input name="User's Name" value={singleUserName} onChange={(e)=> setSingleUserName(e.target.value)}></input>
                <br />
                <br />
                <button disabled={checkSingleUserNameInput()} onClick={()=>{
                    
                    setServiceNamerray([singleUserName])
                    setSchedulingStep(2)
                    }}>next</button>
            </>
        )
    }
    if(singleUserScheduling===false){
        return(
            <>
            <h2>What are thier names?</h2>
            <br />
            <button onClick={()=>{
                let copyArray = [...customersArray]
                copyArray.push('')
                setCustomersArray(copyArray)
                console.log(customersArray)
            }}>Add a Person</button>
            <br />
            {customersArray.map((input, index)=>{
                
                return <MultipleUsersSchedulingComponentInput setCustomersArray={setCustomersArray} customersArray={customersArray} index={index}/>

            })}
            
            <button onClick={()=>{
                setServiceNamerray(customersArray)
                setSchedulingStep((previous)=> previous+1)
            }}
            disabled={checkIfAllInputsAreFilledIn()}
            >next</button>
            </>
        )
    }

    return(
        <>
        <h2>Who are you scheduling these appointments for?</h2>
                <button onClick={()=> setSingleUserScheduling(true)}>Just For Myself</button>
                <br />
                <br />
                <button onClick={()=> setSingleUserScheduling(false)}>For Multiple People</button>
        </>
    )
}

export default SchedulingStep1