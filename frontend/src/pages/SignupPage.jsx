import { useState } from "react";
import SignUpComponenet from "../components/SignupComponent";

const SignupPage = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (

        <SignUpComponenet 
        // state varaibles sent
            firstName = {firstName}
            lastName = {lastName}
            email = {email}
            password = {password}

            // Setter functions to update the states
            setFirstName = {setFirstName}
            setLastName = {setLastName}
            setEmail = {setEmail}
            setPassword = {setPassword}
        ></SignUpComponenet>
        
    )
};

export default SignupPage;