import react, {useState} from "react";

function ServiceCard({ service, selectedServicesList,  setSelectedServicesList, servicesCheckedObj, setservicesCheckedObj}){

    function setServiceCheckBox(value){
        let copyObj= servicesCheckedObj
        copyObj[`${service.name}`].checked = value
        
        setservicesCheckedObj(copyObj)
    }
   
    return(
        <div key={`${service.name}`}>
                <h3>{service.name}</h3>
                <h3>{service.time} minutes</h3>
                <h3>{service.price}</h3>
                <br />
                <input id={`${service.name} checkbox`} type='checkbox' checked={servicesCheckedObj[`${service.name}`].checked} name={`checkbox ${service.name}`} 
                onClick={()=>{
                    const checkbox = document.getElementById(`${service.name} checkbox`)
                    console.log(checkbox.checked)
                    setServiceCheckBox(checkbox.checked)
                }}
                onChange={(e)=>{
                    console.log(e.target.checked)
                    if(e.target.checked){
                       
                        let copySelectedServicesObj = {...selectedServicesList}
                            copySelectedServicesObj = {...copySelectedServicesObj, [service.name]: {
                                durration: service.time,
                                price: service.price
                            }}
                            setSelectedServicesList(copySelectedServicesObj)
                    }
                    else{
                        let copySelectedServicesObj = {...selectedServicesList}
                        delete copySelectedServicesObj[service.name]
                        setSelectedServicesList(copySelectedServicesObj)
                    }
                }}></input>
            </div> 
    )
}

export default ServiceCard