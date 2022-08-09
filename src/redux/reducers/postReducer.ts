import { ActionTypes } from './../constants/action-types';
import { AnyAction } from 'redux';

const initialState = {
    posts: [],
};
export const postsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.SET_POSTS:
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};
