import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
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

    const { setCurrentUser } = useContext(UserContext);


    const resetFields = () => {
        setFieldValues(defaultSignInValues);
    }


    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
    }


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFieldValues({ ...fieldValues, [name]: value });
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            ); 
            setCurrentUser(user)
        } catch(error) {
            console.log('error creation of user', error.message);
        }
        resetFields();
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
                <button type="submit">Sign In</button>
            </form>
              
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default SignInForm;