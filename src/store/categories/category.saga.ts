import { CATEGORIES_ACTION_TYPES } from "./category.types";

import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesUndDocuments } from "../../utils/firebase/firebase.utils";
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed
} from "./category.action";

export function* fetchCategoriesAsync() {

    try {

        const categories = yield* call(getCategoriesUndDocuments, "categories");

        yield* put(fetchCategoriesSuccess(categories));

    } catch (error) {

        yield* put(fetchCategoriesFailed(error as Error));

    };
};


export function* onFetchCategories() {

    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {

    yield* all([call(onFetchCategories)]);

};