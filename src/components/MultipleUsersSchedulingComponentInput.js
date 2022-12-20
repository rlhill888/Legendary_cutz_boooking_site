import react, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {inputColorStyling} from '../lib/styles'

function MultipleUsersSchedulingComponentInput({index, setCustomersArray, customersArray}){
    console.log(index)
    function changeArray(e){
        let copyArray = [...customersArray]
        copyArray[index]= e.target.value
        setCustomersArray(copyArray)
    }
    return(
        <>
        <p>{index + 1}</p>
        <TextField color='secondary' variant="standard" sx={inputColorStyling} value={customersArray[index]} onChange={(e)=> changeArray(e)}></TextField>
        {customersArray.length >2 ? <Button color='secondary' onClick={()=>{
            let copyArray = [...customersArray]
            copyArray.splice(index, 1)
            setCustomersArray(copyArray)
        }}>X</Button> : <> </>}
        <br />
        <br />
        
        </>
    )
}

export default MultipleUsersSchedulingComponentInput