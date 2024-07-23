import { useState, useEffect } from "react";

export default function Otp({toggleIsOpen, isOpen}) {
    const[oneTimeNumbers, setOneTimeNumbers] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: ""
    });
    const[isFilled, setIsFilled] = useState(false);

    
    function handleKeyDown(e) {
        let currentInput = document.activeElement;
        if(isNaN(e.key) && e.keyCode !== 9 && e.keyCode !== 8) {
            e.preventDefault()
        };
        if(e.key === 'Backspace' && currentInput.value === "") {
            let previousInput = currentInput.previousSibling;
            while(previousInput &&  previousInput.nodeName.toLowerCase() !== "input"){
                previousInput = previousInput.previousSibling
            };
            if(previousInput){
                previousInput.focus()
            }else {
                currentInput.focus()
            };
        };
    };
    function handleKeyUp(e, index) {
        let currentInput = document.activeElement;
        if(!isNaN(e.key) && index < 6){
            let nextInput = currentInput.nextSibling;
            while(nextInput && nextInput.nodeName.toLowerCase() !== 'input'){
                nextInput = nextInput.nextSibling
            };
            nextInput.focus()
        };
    };

    useEffect(() => {
        let allFilled = Object.values(oneTimeNumbers).every(value =>  value !== "");
        setIsFilled(allFilled);
    }, [oneTimeNumbers]);

    useEffect(() => {
        const submitButton = document.getElementById("submitButton");
        if(submitButton){
            submitButton.disabled = !isFilled;
        }
    }, [isFilled]);

    function handleSubmit(e) {
        e.preventDefault();
        e.target.reset()
        setOneTimeNumbers({});
        setIsFilled(false);
        setTimeout(() => {
            alert('Password confirmed successfully');
        }, 1000)
    };
   
    return(
        <div className={`form-wrapper ${isOpen ? "d-flex": null}`}>
            <form className="form-container" onSubmit={handleSubmit}>
                <span onClick={() => toggleIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                    </svg>
                </span>
                <div className="form-header">
                    <h3>One Time Password</h3>
                    <p>A one-time password has been generated and sent to the primary email address on your policy. Input the same to proceed further.<br></br> Note that the OTP sent to you will be valid for 10 minutes.</p>
                </div>
                <div className="form-body">
                    <fieldset>
                        <input 
                            id="oneTimeNumber1"
                            name="oneTimeNumber1" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 1)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp1: e.target.value})}
                        />
                        <input 
                            id="oneTimeNumber2"
                            name="oneTimeNumber2" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 2)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp2: e.target.value})}
                        />
                        <input 
                            id="oneTimeNumber3"
                            name="oneTimeNumber3" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 3)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp3: e.target.value})}
                        />
                        <span>-</span>
                        <input 
                            id="oneTimeNumber4"
                            name="oneTimeNumber4" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 4)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp4: e.target.value})}
                        />
                        <input 
                            id="oneTimeNumber5"
                            name="oneTimeNumber5" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 5)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp5: e.target.value})}
                        />
                        <input 
                            id="oneTimeNumber6"
                            name="oneTimeNumber6" 
                            type="text"
                            maxLength="1"
                            onKeyDown={(e)=> handleKeyDown(e)}
                            onKeyUp={(e) => handleKeyUp(e, 6)}
                            onChange={(e) => setOneTimeNumbers({...oneTimeNumbers, otp6: e.target.value})}
                        />
                    </fieldset>
                    <span>10:00</span>
                </div>
                <div className="form-footer">
                    <fieldset>
                        <input 
                            className={isFilled ? "blue-bg": "gray-bg"}
                            name="submitButton" 
                            id="submitButton" 
                            type="submit" 
                            value="Verify and proceed"
                        />
                    </fieldset>
                    <a>Regenerate OTP</a>
                </div>
            </form>
        </div>
    )
}