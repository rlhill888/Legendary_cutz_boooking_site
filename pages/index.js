import {PrimaryButton, SecondaryButton, TertiaryButton} from "../src/components/Button"
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter()

  const barberArray= [
    {
      name: 'larry',
      services: [
        
        {
          name: 'haircut',
          price: '50$',
          durration: 20


      }
    ]
    }, 
    
    {

      name: 'angel'
    }]
  //^ this array will be fetched from backend


  return (
   <>
   <duv>
    <h1>Select a barber you would like to book with</h1>
    {barberArray.map((barber=>{
      return(
        <>
        <br />
        <PrimaryButton onClick={()=> router.push(`/barbers/${barber.name}`)}>{barber.name}</PrimaryButton>
        <br />
        </>
        
        
      )
    }))}
   </duv>
    
    
   </>
  )
}
