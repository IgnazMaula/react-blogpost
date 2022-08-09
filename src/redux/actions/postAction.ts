import { Post } from '../../shared/interface/Interface';
import { ActionTypes } from '../constants/action-types';

export const setPosts = (posts: Post[]) => {
    return {
        type: ActionTypes.SET_POSTS,
        payload: posts,
    };
};
