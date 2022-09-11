import react, {useState} from "react";

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
        <input value={customersArray[index]} onChange={(e)=> changeArray(e)}></input>
        {customersArray.length >2 ? <button onClick={()=>{
            let copyArray = [...customersArray]
            copyArray.splice(index, 1)
            setCustomersArray(copyArray)
        }}>Delete</button> : <> </>}
        <br />
        <br />
        
        </>
    )
}

export default MultipleUsersSchedulingComponentInput