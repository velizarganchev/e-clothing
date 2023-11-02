import CATEGORIES_ACTION_TYPES from "./category.types";
import { createAction } from "../../utils/firebase/reducer/reducer.utils";
import { getCategoriesUndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFaild = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILD, error);

// THIS IS MY ASYNC THUNK
export const fetchCategoriesAsync = () => async (dispatch) => {

    dispatch(fetchCategoriesStart());

    try {

        const categories = await getCategoriesUndDocuments("categories");
        dispatch(fetchCategoriesSuccess(categories));

    } catch (error) {

        dispatch(fetchCategoriesFaild(error));

    };
};  