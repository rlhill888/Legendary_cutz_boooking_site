
function Errors({errorsArray, setErrorsArray}){
    return(
        <div className="mainErrorsDiv">

            {errorsArray.map((error, index)=>{
                return(
            <div key={`error div ${error} ${index}`} className="errorDiv">
                <button 
                onClick={()=>{
                    let copyArray = [...errorsArray]
                    copyArray.splice(index, 1)
                    setErrorsArray(copyArray)
                }}
                className="button">X</button>
                <h3>{error}</h3>
            </div>
                )
            })}
            <style jsx>{`

                .mainErrorsDiv{
                    position: fixed;
                    width: 100vw;
                    z-index: 1000000000;

                }
                .errorDiv{
                    position: relative;
                    width: 80%;
                    height: auto;
                    background-color: red;
                    color: white;
                    border-radius: 12px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 12px;
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 15px;


                }
                .button{
                    background-color: transparent;
                    border: none;
                    margin-right: 15px;
                    height: auto;
                }
                
                
                `}</style>

        </div>
    )
}

export default Errors

