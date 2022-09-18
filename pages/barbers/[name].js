import react, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import ServiceCard from "../../src/components/ServiceCard";
import { SecondaryButton, PrimaryButton } from "../../src/components/Button";
import SchedulingStep1 from "../../src/components/SchedulingStep1";
import SchedulingStep3 from "../../src/components/SchedulingStep3";
import SchedulingStep4 from "../../src/components/SchedulingStep4";
import SchedulingStep5 from "../../src/components/SchedulingStep5";


function Page(){
    const router= useRouter()
    const { name } = router.query
    
    const date = new Date();

    const [schedulingStep, setSchedulingStep]= useState(1)

    const [selectedServicesList, setSelectedServicesList]= useState({})
    const [serviceNameArray, setServiceNamerray]= useState([])
    const [completePurchaseObj, setCompletePurchaseObj]= useState({})
    const [currentPersonSelectingServices, setCurrentPersonSelectingServices]= useState(0)
    const [servicesCheckedObj, setservicesCheckedObj]= useState({}) 
    const [totalAppointmentTime, setTotalAppointmentTime]= useState('')
    const [totalAppointmentTimeInt, setTotalAppointmentTimeInt]= useState(null)
    const [timeObj, setTimeObj]= useState({})
    const [barberObj, setBarberObj]= useState({
        name: 'larry',
        services: [
          {
            name: 'haircut',
            price: 50,
            durration: 20
        },
        {
          name: 'beardTrim', price: 15,
          durration: 20
        }
      ]
    })
    // going to get this info from a  fetch request

    useEffect(()=>{
        let tempServicesObject= {}
        barberObj.services.map((service)=>{
            tempServicesObject= {...tempServicesObject, 
            [`${service.name}`]: { checked: false}}
        })
        setservicesCheckedObj(tempServicesObject)

    }, [])
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
                {name}'s page
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
                <SchedulingStep3 setTotalAppointmentTimeInt={setTotalAppointmentTimeInt} setTotalAppointmentTime={setTotalAppointmentTime} setSchedulingStep={setSchedulingStep} completePurchaseObj={completePurchaseObj}/>
                </>
            )
        }

        if(schedulingStep===4){
            return(
            <>
            <SchedulingStep4 setTimeObj={setTimeObj} totalAppointmentTimeInt={totalAppointmentTimeInt} totalAppointmentTime={totalAppointmentTime} setSchedulingStep={setSchedulingStep}/>
            </>
            )
        }

        if(schedulingStep===5){
            return(
                <>
                <SchedulingStep5 />
                </>
            )
        }
    return(
        <>
        

        </>
    )
}

export default Page