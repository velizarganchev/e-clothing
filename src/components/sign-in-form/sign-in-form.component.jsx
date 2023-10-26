import { useState } from "react";
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaulFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFilds] = useState(defaulFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFilds(defaulFormFields);
    };

    const signInWithGoogle = async () => {
        try {

            await signInWithGooglePopup();

        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFilds({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();

        } catch (error) {
            if (error.code === "auth/invalid-login-credentials") {
                alert("Incorrect Email or Password");
            } else {
                console.log("error loging the user", error.message);
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;