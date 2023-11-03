import USER_ACTION_TYPES from "./user.types";

import { takeLatest, all, call, put } from "redux-saga/effects";

import { signInSuccess, signInFailed, signOutSuccess, signOutFailed } from "./user.action";
import {
    getCurrentUser,
    createUserDocumetnFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    signOutUser,
} from "../../utils/firebase/firebase.utils";


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumetnFromAuth, userAuth, additionalDetails);

        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    } catch (error) {
        yield put(signInFailed(error));
    }
};

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);

        if (!user) return;

        yield call(getSnapshotFromUserAuth, user);

    } catch (error) {
        yield put(signInFailed(error));
    }
};

export function* signInWithEmail({ payload: { email, password } }) {

    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);

        if (!user) return;

        yield call(getSnapshotFromUserAuth, user);

    } catch (error) {

        yield put(signInFailed(error));
    };
};

export function* signOut() {

    try {
        
        yield call(signOutUser);

        yield put(signOutSuccess())

    } catch (error) {

        yield put(signOutFailed(error));
    };
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);

        if (!userAuth) return;

        yield call(getSnapshotFromUserAuth, userAuth);

    } catch (error) {
        yield put(signInFailed(error));
    }
};

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESION, isUserAuthenticated)
};
export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
};


export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
    ]);
};