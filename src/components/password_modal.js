import {useState, useEffect} from "react";

export default function PasswordModal({toggleIsOpen, isOpen, toggleIsRunning, isRunning}) {
    const[otpNumber, setOtpNumber] = useState({});
    const[isFilled, setIsFilled] = useState(false);
    const[timer, setTimer] = useState(600);
    const[isDone, setIsDone] = useState(false);

    //Funcion para que solo lea las teclas que son numeros/tab/delete
    function handleKeyDown(event) {
        if (isNaN(event.key) && event.keyCode !== 9 && event.keyCode !== 8) {
          event.preventDefault(); // Prevenir la entrada del caracter
        }
    };

    //Valida cantidad de numeros dentro del otp
    useEffect(() => {
        if(Object.keys(otpNumber).length < 6){
            setIsFilled(false);
        }else{
            setIsFilled(true)
        }
    }, [otpNumber]);

    //Activa o desactiva el button
    useEffect(() => {
        const submitButton = document.getElementById("submit-button");
        if (submitButton) {
            submitButton.disabled = !isFilled;
        }
    }, [isFilled]);
    
    // Comienza conteo para enviar un nuevo codigo
    useEffect(() => {
        if(timer > 0 && isRunning){
            let intervalId = setInterval(() => {
                setTimer((currentTimer) => currentTimer - 1)
            }, 1000)
            return () => (
                clearInterval(intervalId)
            )
        }  
    }, [isRunning, isDone])

    //Avisa cuando llega a 0 el conteo
    useEffect(() => {
        const error = new Error("Your password is expired");
        if(timer === 0){
            setIsDone(true)
            setTimeout(() => {
                alert(error.message);
                toggleIsOpen(false);
            }, 100);
        };
    }, [timer])

    let minutes = Math.floor(timer / 60);
    let sec = timer % 60;
    const UpDatedTimer = `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`

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
                <span className="back-button" onClick={() => {toggleIsOpen(!isOpen); toggleIsRunning(!isRunning)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </span>
                <div className="form-header">
                    <h3>One Time Password</h3>
                    <p>A one-time password has been generated and sent to the primary email address on your policy. Input the same to proceed further. Note that the OTP sent to you will be valid for 10 minutes.</p>
                </div>
                <div className="form-body">
                    <fieldset>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-1" 
                            id="otp-1"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_1: e.target.value})}/>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-2" 
                            id="otp-2"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_2: e.target.value})}/>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-3" 
                            id="otp-3"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_3: e.target.value})}/>
                    </fieldset>
                        <span className="hyphen">-</span>
                    <fieldset>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-4" 
                            id="otp-4"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_4: e.target.value})}/>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-5" 
                            id="otp-5"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_5: e.target.value})}/>
                        <input type="text" 
                            maxlength="1" 
                            name="otp-6" 
                            id="otp-6"
                            onKeyDown={handleKeyDown}
                            onChange={(e)=> setOtpNumber({...otpNumber, otp_6: e.target.value})}/>
                    </fieldset>
                    <span className="time-out">{UpDatedTimer}</span>
                </div>
                <div className="form-footer">
                    <fieldset>
                        <input className={isFilled === false ? "bg-gray" : "bg-blue"} id="submit-button" type="submit" value="Verify and Proceed"/>
                    </fieldset>
                    <div>
                        <a>Regenerate OTP</a>
                    </div>
                </div> 
            </form>
        </div>
    )
};