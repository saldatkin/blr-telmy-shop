import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase.utils";


const defaultSignUpValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [ fieldValues, setFieldValues ] = useState(defaultSignUpValues);
    const { displayName, email, password, confirmPassword } = fieldValues;
    
    const resetFields = () => {
        setFieldValues(defaultSignUpValues);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFieldValues({ ...fieldValues, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert('passwords do not match!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            //setCurrentUser(user);
            resetFields();
        } catch(error) {
            console.log('error creation of user', error.message);
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form className="sign-up sign" onSubmit={handleFormSubmit}>
                <label>Display name</label>
                <input type="text" required name="displayName" value={displayName} onChange={handleChange}></input>
                <label>Email</label>
                <input type="email" required name="email" value={email} onChange={handleChange}></input>
                <label>Password</label>
                <input type="password" required name="password" value={password} onChange={handleChange}></input>
                <label>Confirm password</label>
                <input type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default SignUpForm;
