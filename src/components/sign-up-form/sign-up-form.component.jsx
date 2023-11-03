import { SignUpContainer } from "./sign-up-form.styles";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaulFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};


function SignUpForm() {

    const dispatch = useDispatch();

    const [formFields, setFormFilds] = useState(defaulFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFilds(defaulFormFields);
    }
    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormFilds({ ...formFields, [name]: value });

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {

            dispatch(signUpStart(email, password, displayName));

            resetFormFields();

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            } else {
                console.log("error creating the user", error.message);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form
                onSubmit={handleSubmit}
            >
                <FormInput
                    label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

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

                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;