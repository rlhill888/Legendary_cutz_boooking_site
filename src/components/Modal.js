import { Button } from '@mui/material';
import react from 'react';

function Modal({modalActive, setModalActive, children, title}){
    return(
        <div className='modal'>
            <div className='modalOuterContentsDiv'>
                
                <div className='modalContentsDiv'>
                    <div
                    style={{
                        textAlign: 'right'
                    }}
                    >
                        <Button
                        onClick={()=>{
                            setModalActive(false)
                        }} 
                        color='secondary'  
                        size='xl' 
                        style={{
                            color: 'white',
                            fontSize: '1.4rem',
                            
                        }}                
                        >
                            X
                        </Button>                        
                    </div>
                    {title ? <h2 className='title'>{title}</h2> : <></>}
                    <div className='children'>
                     {children}   
                    </div>
                    


                </div>

            </div>
            <style jsx>{`
                    .modal{
                        
                        position: fixed;
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: rgba(0, 0, 0, 0.552);
                        z-index: 1000;
                        ${modalActive ? `` : `display: none;`};
                    }
                    .modalOuterContentsDiv{
                        width: 80vw;
                        height: 70vh;
                        background-color: #d93c3c;
                        position: relative;
                        border-radius: 12px;
                        padding: 2%;

                    }
                    .modalContentsDiv{
                        position: relative;
                        width: 100%;
                        height: 100%;
                        border-radius: 12px;
                        background-color: rgba(0, 0, 0);

                    }
                    .children{
                        padding: 8%;
                        position: relative;
                        height: ${title ? '70%' : '80%'};
                        overflow-y: auto;
                    }
                    .title{
                        text-align: center;
                        white-space: nowrap;
                        overflow-x: auto;
                    }
                `}</style>
        </div>
    )
}

export default Modal