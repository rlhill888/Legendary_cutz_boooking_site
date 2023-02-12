import react, {useState} from "react";
import MultipleUsersSchedulingComponentInput from "./MultipleUsersSchedulingComponentInput";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {buttonPrimaryStyle} from '../lib/styles';
import takePhoneNumberInputAndAddDashes from "../../lib/takePhoneNumberInputAndAddDashes";

function SchedulingStep1({setSchedulingStep, setServiceNamerray, phoneNumber, setPhoneNumber}){
    const [singleUserScheduling, setSingleUserScheduling]= useState(null)
    const [singleUserName, setSingleUserName]= useState('')
    const [customersArray, setCustomersArray]= useState([ '' , ''])

    
    function checkSingleUserNameInput(){
        if(phoneNumber.length < 12){
            return true
        }
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
        if(phoneNumber.length < 12){
            return true
        }

        return false
    }

    if(singleUserScheduling=== true){
        return(
            <div className="mainDiv">
                <h2>What is Your Name and Phone Number?</h2>
                <div className="TextAndButtonDiv">
                <TextField placeholder="Name" variant="standard" sx={{input: {color: 'white'}}} color="secondary" name="User's Name" value={singleUserName} onChange={(e)=> setSingleUserName(e.target.value)}></TextField>
                <TextField placeholder="Phone Number" variant="standard" sx={{input: {color: 'white'}}} color="secondary" name="User's Name" value={phoneNumber} 
                onChange={(e)=>{ 
                   takePhoneNumberInputAndAddDashes(e, setPhoneNumber)
                }}
                ></TextField>
                <Button 
                color="secondary"
                variant="contained"
                disabled={checkSingleUserNameInput()} onClick={()=>{
                    
                    setServiceNamerray([singleUserName])
                    setSchedulingStep(2)
                    }}>next</Button>
                </div>

                <style jsx>{`
                    .TextAndButtonDiv{
                        display: flex;
                        height: 100%;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                    
                    `}


                </style>
            </div>
        )
    }
    if(singleUserScheduling===false){
        return(
            <div className="mainDiv" style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column'
            }}>
            <h2>What are thier names, and what is your phone number?</h2>
            <TextField placeholder="Phone Number" variant="standard" sx={{input: {color: 'white'}}} color="secondary" name="User's Name" value={phoneNumber} 
                onChange={(e)=>{ 
                   takePhoneNumberInputAndAddDashes(e, setPhoneNumber)
                }}
                ></TextField>
            <br />
            <Button
            color='tertiary'
            variant="outlined"
            onClick={()=>{
                let copyArray = [...customersArray]
                copyArray.push('')
                setCustomersArray(copyArray)
                console.log(customersArray)
            }}>Add a Person</Button>
            <br />
            <div className="inputsDiv">
            {customersArray.map((input, index)=>{
                
                return <MultipleUsersSchedulingComponentInput key={`multiple users scheduling component input ${index}`} setCustomersArray={setCustomersArray} customersArray={customersArray} index={index}/>

            })}    
            </div>
            
            
            <Button onClick={()=>{
                setServiceNamerray(customersArray)
                setSchedulingStep((previous)=> previous+1)
            }}
            variant='contained'
            color='secondary'
            disabled={checkIfAllInputsAreFilledIn()}
            >next</Button>

                <style jsx>{`
                    .something{
                        
                    }

                    .inputsDiv{
                        height: 50%;
                        overflow-y: auto;
                    }
                    
                    `}


                </style>
            </div>
        )
    }

    return(
        <div className="mainDiv"
        style={{
            marginTop: '5vh'
        }}
        >
            
        <h2>Who are you scheduling these appointments for?</h2>
        <div className="schedulingAppointmentsForDiv">
                <Button variant="contained" color='secondary' onClick={()=> setSingleUserScheduling(true)}>Just For Myself</Button>
                <br />
                <br />
                <Button variant="contained" color='secondary'  onClick={()=> setSingleUserScheduling(false)}>For Multiple People</Button>

            </div>


                <style jsx>{`
                    .schedulingAppointmentsForDiv{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        height: 40%;
                        width: 100%;
                        margin: auto;
                    }
                    
                    
                    `}


                </style>
        </div>
    )
}

export default SchedulingStep1