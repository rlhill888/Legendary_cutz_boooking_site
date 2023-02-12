export default function takePhoneNumberInputAndAddDashes(e, setInputFunction){
    if(e.nativeEvent.inputType === 'deleteContentBackward'){
        if(e.target.value.length=== 3){
            let newString = e.target.value.substring(0, e.target.value.length -1)
            return setInputFunction(newString)
        }
        if(e.target.value.length=== 7){
            let newString = e.target.value.substring(0, e.target.value.length -1)
            return setInputFunction(newString)
        }
        else{
            setInputFunction(e.target.value)
        }    
    }

    if(
        e.nativeEvent.data === '0' 
        || e.nativeEvent.data === '1'
        || e.nativeEvent.data === '2'
        || e.nativeEvent.data === '3'
        || e.nativeEvent.data === '4'
        || e.nativeEvent.data === '5'
        || e.nativeEvent.data === '6'
        || e.nativeEvent.data === '7'
        || e.nativeEvent.data === '8'
        || e.nativeEvent.data === '9'
    ){
        if(e.target.value.length > 12){
            return
        }
        if(e.target.value.length=== 3 || e.target.value.length=== 7){
            setInputFunction(e.target.value + '-')
        }else{
            setInputFunction(e.target.value)
        }
    }else{
       return
    }

}