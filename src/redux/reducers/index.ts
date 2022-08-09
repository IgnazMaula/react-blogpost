import { combineReducers } from 'redux';
import { postsReducer } from './postReducer';

export const reducers = combineReducers({
    allPost: postsReducer,
});

export default reducers;
