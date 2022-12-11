import convertToMilitaryTime from "./convertToMilitaryTime"

export default function pickApartIndividualTimesAndMakeThemMilitary(theTwoTimes){
    let temptime1= ''
    let temptime2= ''
    let hitSecondTime = false
    for(let character of theTwoTimes){
        if(character==='-'){
            hitSecondTime = true
        }
        if(hitSecondTime ===false){
            temptime1 = temptime1 + character
        }
        if(hitSecondTime ===true && character!=='-'){
            temptime2 = temptime2 + character
        }
        
    }
    let timeArray = []
    let time1 = temptime1.slice(0, -1)
    let time2 = temptime2.substring(1).slice(0,-1)

    const militaryTime1 = convertToMilitaryTime(time1)
    const militaryTime2 = convertToMilitaryTime(time2)

    return [parseInt(militaryTime1.trim()), parseInt(militaryTime2.trim())]
}