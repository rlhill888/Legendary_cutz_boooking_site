import react, {useState} from "react";
import Checkbox from '@mui/material/Checkbox';
function ServiceCard({ service, selectedServicesList,  setSelectedServicesList, servicesCheckedObj, setservicesCheckedObj}){
    const colorScheme= colorScheme

    function setServiceCheckBox(value){
        let copyObj= servicesCheckedObj
        copyObj[`${service.name}`].checked = value
        
        setservicesCheckedObj(copyObj)
    }
   
    return(
        <div className="serviceDiv" key={`${service.name}`}>
            <div className="serviceContentsDiv">
                <h3>{service.name}</h3>
                <h3>{service.time} minutes</h3>
                <h3>${service.price.toFixed(2)}</h3>
            </div>
            <div className="checkboxDiv">
                <Checkbox sx={{color: 'white'}} id={`${service.name} checkbox`} color='secondary' size="medium" checked={servicesCheckedObj[`${service.name}`].checked} name={`checkbox ${service.name}`} 
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
                }}></Checkbox>
            </div>
                
                <style jsx>{`
                    .serviceDiv{
                        display: flex;
                        flex-direction: row;
                        background-color: 'blue';
                        width: 100%;
                        justify-content: space-between;
                        position: relative;
                        margin-bottom: 10px;
                        border-bottom: #B64949 1px solid;
                    }
                    .checkboxDiv{
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        width: 50%;
                    }
                    .serviceContentsDiv{
                        width: 50%;
                    }
                    
                    
                    `}

                </style>
            </div> 
    )
}

export default ServiceCard