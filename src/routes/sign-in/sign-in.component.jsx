import { signInWithGooglePopup, createUserDocumetnFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();

        const userDocRef = await createUserDocumetnFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google Acount</button>
        </div>
    )
}
export default SignIn;