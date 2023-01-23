import { useState } from "react";
import { selectCurrentUser } from "../../store/user/user.selector";
import { 
    signInAuthUserWithEmailAndPassword, 
    signInWithGooglePopup 
} from "../../utils/firebase.utils";

const defaultSignInValues = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ fieldValues, setFieldValues ] = useState(defaultSignInValues);
    const { email, password } = fieldValues;


    const resetFields = () => {
        setFieldValues(defaultSignInValues);
    }


    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //setCurrentUser(user);
    }


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFieldValues({ ...fieldValues, [name]: value });
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            signInAuthUserWithEmailAndPassword(
                email,
                password
            ); 
            resetFields();
            //setCurrentUser(user)
        } catch(error) {
            console.log('error creation of user', error.message);
        }
    }


    return (
        <div>
            <h1>Sign in</h1>
            <form className="sign-in sign" onSubmit={handleFormSubmit}>
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    name="email" 
                    value={email} 
                    onChange={handleChange}>
                </input>
                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    name="password" 
                    value={password} 
                    onChange={handleChange}>
                </input>
                <button type="submit" onClick={handleFormSubmit}>Sign In</button>
            </form>
              
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default SignInForm;