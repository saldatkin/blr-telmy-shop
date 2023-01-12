import SignUpForm from "../../components/sign-up-form/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import '../../App.css'

const Auth = () => {
  return(
    <div className="auth">
        <SignInForm />
        <SignUpForm />
    </div>
  )
}

export default Auth;