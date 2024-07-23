import "@/assets/try1.css";
import Otp from "@/components/try1/otp";
import { useState } from "react";

export default function Try1() {
    const[isOpen, setIsOpen] = useState(false);
    function toggleIsOpen(value) {
        setIsOpen(value)
    };
    return(
        <main>
            <div className="main-content">
                <h2>Few steps to complete your application</h2>
                <p>You need to verify your account to continue the process</p>
                <button onClick={() => toggleIsOpen(!isOpen)}>Verified Password</button>
            </div>
            <Otp toggleIsOpen={toggleIsOpen} isOpen={isOpen}></Otp>
        </main>
    )
};