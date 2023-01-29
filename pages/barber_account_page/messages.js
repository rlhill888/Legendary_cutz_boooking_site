
import BarberNavigationMenu from "../../src/components/BarberNavigationMenu";
import Modal from "../../src/components/Modal";
import { useState, useEffect } from "react";
import { auth } from "../../lib/mutations";
import { useRouter } from "next/router";
import axios from "axios";
import MessagesAppointmentCard from "../../src/components/MessagesAppointmentCard";
import Loading from "../../src/components/Loading";


function Messages({}){
    const [openModal, setOpenModal]= useState(false)
    const [modalTitle, setModalTitle]= useState(null)
    const [modalChildren, setModalChildren]= useState(null)
    const [barber, setBarber]= useState(null)
    const [messages, setMessages]= useState(null)

    const router = useRouter()
    
    useEffect( ()=>{

        async function fetchData(){
             await auth('me').then(res=>{
            if(res.ok){
                res.json().then(res=> {
                    console.log(res)
                    setBarber(res)})
            }
            else{
                res.json().then(res=> console.log(res))
                router.push('/barber_account_page/login')

            }
        })

        }

        fetchData()

       
       
    }, [])

    useEffect(()=>{

        async function findMessages(){
            if(barber){
                const messages = await axios({
                    url: '/api/messages/fetchBarbersMessages'
                })

                setMessages(messages.data)
            }
        }
        findMessages()

    }, [barber])

    useEffect(()=>{

        async function updateMessagesAsRead(){
            let updateMessageArray = []
            for(const message of messages){
                if(message.messageSeen === false){
                    updateMessageArray.push(message)
                }
            }

            try{
                const updateMessages = await axios({
                    method: 'PATCH',
                    data: {
                        unreadMessageArray: JSON.stringify(updateMessageArray)
                    }, 
                    url: '/api/messages/setMessagesAsRead'
                })
                
            }catch(error){
                console.log(error)
            }
        }


        if(messages){
            updateMessagesAsRead()
        }

    }, [messages])


    if(!barber || !messages){
        return(
            <>
            <Loading />
            </>
        )
    }
    return(
        <div>
            <Modal title={modalTitle} modalActive={openModal} setModalActive={setOpenModal}>
                {modalChildren}
            </Modal>
            <BarberNavigationMenu />
            <h1 className="title">Messages Page</h1>
            <div className="messagesContainer">
                {messages.map((message, index)=>{
                    return(
                        <div 
                        className={index % 2 ? "messageDivFirstBackground" : "messageDivSecondBackground"}
                        onClick={()=>{
                            setModalTitle(message.title)
                            setOpenModal(true)
                            setModalChildren(
                            <div>
                                <p>{message.messageText}</p>
                                {message.cancelledAppointmentNotification? 
                                    <MessagesAppointmentCard id={message.cancelledAppointmentId}/> :
                                    <></>
                                }
                            </div>
                            )
                        }}
                        >
                             <h3>{message.title}</h3>

                        </div>
                    )
                })}
                
            </div>
            <style jsx>{`
                .messageDivFirstBackground{
                    padding: 2%;
                    text-align: left;
                    background-color: #d93c3c;
                    width: 100%;
                    cursor: pointer;
                }
                .messageDivSecondBackground{
                    padding: 2%;
                    text-align: left;
                    background-color: black;
                    width: 100%;
                    cursor: pointer;
                }
                .messagesContainer{
                    width: 70vw;
                    margin: auto;
                }
                .title{
                    text-align: center;
                }
                .messageText{
                    overflow-x: auto;
                    white-space: nowrap;
                }               

            
            `}</style>
        </div>
    )
}

export default Messages