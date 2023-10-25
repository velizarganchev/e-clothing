import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyA89O8o7tTivE1ibWPncFxJ0Ojjs4Q1ZYg",
    authDomain: "e-clothing-db-b7865.firebaseapp.com",
    projectId: "e-clothing-db-b7865",
    storageBucket: "e-clothing-db-b7865.appspot.com",
    messagingSenderId: "163428721326",
    appId: "1:163428721326:web:92d4c04364788b8e89433f"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumetnFromAuth = async (
    userAuth,
    additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(
                userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation,
                });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};