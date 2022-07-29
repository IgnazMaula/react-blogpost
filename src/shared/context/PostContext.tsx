import { createContext } from 'react';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const posts: Post[] = [];

export const PostContext = createContext({
    postList: posts,
});
