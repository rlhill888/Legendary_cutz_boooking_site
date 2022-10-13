import react, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import ServiceCard from "../../src/components/ServiceCard";
import SchedulingStep1 from "../../src/components/SchedulingStep1";
import SchedulingStep3 from "../../src/components/SchedulingStep3";
import SchedulingStep4 from "../../src/components/SchedulingStep4";
import SchedulingStep5 from "../../src/components/SchedulingStep5";
import Checkout from "../../src/components/Checkout";
import axios from "axios";



function Page(){
    const router= useRouter()
     const { id } = router.query

    const [schedulingStep, setSchedulingStep]= useState(1)
    

    const [selectedServicesList, setSelectedServicesList]= useState({})
    const [serviceNameArray, setServiceNamerray]= useState([])
    const [completePurchaseObj, setCompletePurchaseObj]= useState({})
    const [currentPersonSelectingServices, setCurrentPersonSelectingServices]= useState(0)
    const [servicesCheckedObj, setservicesCheckedObj]= useState({}) 
    const [totalAppointmentTime, setTotalAppointmentTime]= useState('')
    const [totalAppointmentTimeInt, setTotalAppointmentTimeInt]= useState(null)
    const [timeObj, setTimeObj]= useState({})
    const [recieptsArray, setrecieptsArray]= useState([])
    const [dateOfAppointment, setDateOfAppointment]= useState(null)
    const [barberObj, setBarberObj]= useState(null)
    const [dayData, setDayData]= useState(null)
    const [nameArray, setNameArray]= useState(null)
    // going to get this info from a  fetch request

    useEffect(()=>{
        if(!id){
            return
        }
     
        (async ()=>{
            let barber
            try{
                console.log( id)

                const response = await axios({
                    method: 'POST',
                    url: '/api/barbers/getIndivisualBarber',
                    data: {
                        id: id
                    }
                })
                barber = response.data
                setBarberObj(response.data)
            }catch(error){
                console.log(error)
            }

        console.log(barber)

            
        let tempServicesObject= {}
        barber.services.map((service)=>{
            tempServicesObject= {...tempServicesObject, 
            [`${service.name}`]: { checked: false}}
        })
        setservicesCheckedObj(tempServicesObject)
        })()
       


    }, [id])
    console.log(servicesCheckedObj)

    console.log(completePurchaseObj)

    function checkServicesArentEmpty(){
        if(Object.keys(selectedServicesList).length <1){
            return true
        }else{
            return false
        }
    }
    function uncheckBoxes(){
        let copyObj = servicesCheckedObj
        
        for(let key in copyObj ){
            copyObj[key].checked = false
        }
        setservicesCheckedObj(copyObj)
    }

      

    if(schedulingStep===1){
        return(
            <SchedulingStep1  setSchedulingStep={setSchedulingStep} setServiceNamerray={setServiceNamerray}/>
        )
    }
    console.log(serviceNameArray[currentPersonSelectingServices])
  
// temp barber variable, going to fetch barbers data from backend
        console.log(selectedServicesList)
        if(schedulingStep===2){
            return(
                <>
                {barberObj.name}'s page
                <h1> { serviceNameArray.length > 1 ?   `Select the services ${serviceNameArray[currentPersonSelectingServices]} would like` :  `${serviceNameArray[currentPersonSelectingServices]}, Select Services you would like` }</h1>
                <br />
                {barberObj.services.map(((service)=>{
                    return(
                    <ServiceCard setservicesCheckedObj={setservicesCheckedObj} servicesCheckedObj={servicesCheckedObj} setBarberObj={setBarberObj}   service={service} selectedServicesList={selectedServicesList} setSelectedServicesList={setSelectedServicesList}/>
                    )
                    
                }))}
                <button onClick={()=>{
                    if(currentPersonSelectingServices + 2 > serviceNameArray.length){
                        let copyObj= {...completePurchaseObj}

                        copyObj= {...copyObj, [`${serviceNameArray[currentPersonSelectingServices]}`]: selectedServicesList}
                        setCompletePurchaseObj(copyObj)
                        setSelectedServicesList({})
                        uncheckBoxes()
                        return setSchedulingStep(3)
                    }
                    if(currentPersonSelectingServices + 1 <= serviceNameArray.length){
                        let copyObj= {...completePurchaseObj}

                        copyObj= {...copyObj, [`${serviceNameArray[currentPersonSelectingServices]}`]: selectedServicesList}
                        setCompletePurchaseObj(copyObj)
                        setSelectedServicesList({})
                        uncheckBoxes()
                        setCurrentPersonSelectingServices(previous=> previous+ 1)
                    }

                }}
                disabled={checkServicesArentEmpty()}
                >
                    Next
                </button>
        
                </>
            )
        }

        if(schedulingStep===3){
            return(
                <>
                <SchedulingStep3 setNameArray={setNameArray} recieptsArray={recieptsArray}  setrecieptsArray={setrecieptsArray} setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime} setSchedulingStep={setSchedulingStep} completePurchaseObj={completePurchaseObj}/>
                </>
            )
        }

        if(schedulingStep===4){
            return(
            <>
            <SchedulingStep4 dayData={dayData} setDayData={setDayData} barberId={barberObj.id} setDateOfAppointment={setDateOfAppointment} dateOfAppointment={dateOfAppointment} setTimeObj={setTimeObj} totalAppointmentTimeInt={totalAppointmentTimeInt} totalAppointmentTime={totalAppointmentTime} setSchedulingStep={setSchedulingStep}/>
            </>
            )
        }

        if(schedulingStep===5){
            return(
                <>
                <SchedulingStep5 nameArray={nameArray} dayData={dayData} dateOfAppointment={dateOfAppointment} timeObj={timeObj} setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime} setSchedulingStep={setSchedulingStep} completePurchaseObj={completePurchaseObj} recieptsArray={recieptsArray} barberId={barberObj.id}/>
                </>
            )
        }
        if(schedulingStep===6){
            return(
                <>
                <Checkout />
                </>
            )
        }
    return(
        <>
        

        </>
    )
}

export default Page