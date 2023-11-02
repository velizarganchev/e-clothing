import CATEGORIES_ACTION_TYPES from "./category.types";

import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesUndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFaild } from "./category.action";

export function* fetchCategoriesAsync() {

    try {

        const categories = yield call(getCategoriesUndDocuments, "categories");

        yield put(fetchCategoriesSuccess(categories));

    } catch (error) {

        yield put(fetchCategoriesFaild(error));

    };
};


export function* onFetchCategories() {

    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {

    yield all([call(onFetchCategories)]);
    
};