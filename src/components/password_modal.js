import {useState, useEffect} from "react";

export default function PasswordModal({toggleIsOpen, isOpen}) {
    const[otpNumber, setOtpNumber] = useState({
        otp_1:"",
        otp_2:"",
        otp_3:"",
        otp_4:"",
        otp_5:"",
        otp_6:""
    })
    const[isFilled, setIsFilled] = useState(false);
    const[timer, setTimer] = useState(5600);
    const UpDatedTimer = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`

//Funcion para que solo lea las teclas que son numeros/tab/delete
    function handleKeyDown(e) {
        let currentInput= document.activeElement;

        if (isNaN(e.key) && e.keyCode !== 9 && e.keyCode !== 8) {
            e.preventDefault(); // Prevenir la entrada del caracter
        }
        if (e.key === 'Backspace' && currentInput.value === "") {
            let previousInput = currentInput.previousSibling;
            while (previousInput && previousInput.nodeName.toLowerCase() !== 'input') {
                previousInput = previousInput.previousSibling;
            };
            if(previousInput) {
                previousInput.focus();
            }else{
                currentInput.focus()
            }
        }
    };
//Funcion para cambiar de hover
    function handleKeyUp(e, index) {
        let currentInput= document.activeElement;
        if(!isNaN(e.key) && index < 6){
            let nextInput = currentInput.nextSibling;
            while(nextInput && nextInput.nodeName.toLowerCase() !== 'input'){
                nextInput = nextInput.nextSibling;
            }
            nextInput.focus()
        } 
    };

//Valida cantidad de numeros dentro del otp
    useEffect(() => {
        const allFilled = Object.values(otpNumber).every(value => value !== "");
        setIsFilled(allFilled)

    }, [otpNumber]);
// Comienza conteo para enviar un nuevo codigo
    useEffect(() => {
        if(timer > 0 && isOpen){
            let intervalId = setInterval(() => {
                setTimer((currentTimer) => currentTimer - 1)
            }, 1000)
            return () => (
                clearInterval(intervalId)
            )
        }else if(timer === 0 && isOpen){
            const error = new Error("Your password is expired");
            setTimeout(() => {
                alert(error.message);
                toggleIsOpen(false);
                setTimer(5600)
            }, 100);
        }else{
            setTimer(5600)
        }
    }, [isOpen, timer])  

//Activa o desactiva el button
    useEffect(() => {
        const submitButton = document.getElementById("submit-button");
        if (submitButton) {
            submitButton.disabled = !isFilled;
        }
    }, [isFilled]); 

//Controla el comportamiento al dar el submit
    function handleSubmit(event) {
        event.preventDefault();
        event.target.reset()
        setOtpNumber({});
        setIsFilled(false);

        setTimeout(() => {
            alert('Verified successfully!');
            toggleIsOpen(false);
        }, 100);
    };
    return(
        <div className={`form-wrapper ${isOpen ? "d-flex": null}`}>
            <form onSubmit={handleSubmit}>
                <span className="back-button" onClick={() => {toggleIsOpen(!isOpen)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </span>
                <div className="form-header">
                    <h3>One Time Password</h3>
                    <p>A one-time password has been generated and sent to the primary email address on your policy. Input the same to proceed further. Note that the OTP sent to you will be valid for 10 minutes.</p>
                </div>
                <fieldset className="form-body">
                    <input 
                        className="radius-left"
                        type="text" 
                        maxLength="1" 
                        name="otp-1" 
                        id="otp-1"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,1)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_1: e.target.value})}
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="otp-2" 
                        id="otp-2"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,2)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_2: e.target.value})}
                    />
                    <input 
                        className="radius-right"
                        type="text" 
                        maxLength="1" 
                        name="otp-3" 
                        id="otp-3"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,3)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_3: e.target.value})}
                    />
                    <span className="hyphen">-</span>
                    <input 
                        className="radius-left"
                        type="text" 
                        maxLength="1" 
                        name="otp-4" 
                        id="otp-4"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,4)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_4: e.target.value})}
                    />
                    <input 
                        type="text" 
                        maxLength="1" 
                        name="otp-5" 
                        id="otp-5"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,5)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_5: e.target.value})}
                    />
                    <input 
                        className="radius-right"
                        type="text" 
                        maxLength="1" 
                        name="otp-6" 
                        id="otp-6"
                        onKeyDown={(e) => handleKeyDown(e)}
                        onKeyUp={(e) => handleKeyUp(e,6)}
                        onChange={(e)=> setOtpNumber({...otpNumber, otp_6: e.target.value})}
                    />
                    <span className="time-out">{UpDatedTimer}</span>
                </fieldset>
                <div className="form-footer">
                    <fieldset>
                        <input 
                            className={isFilled === false ? "bg-gray" : "bg-blue"} 
                            id="submit-button" 
                            type="submit" 
                            value="Verify and Proceed"
                        />
                    </fieldset>
                    <div>
                        <a>Regenerate OTP</a>
                    </div>
                </div> 
            </form>
        </div>
    )
};