import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPosts } from '../redux/actions/postAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Modal from '../shared/components/Modal';
import { PostContext } from '../shared/context/PostContext';
import { Post } from '../shared/interface/Interface';

const NewPost = () => {
    const context = useContext(PostContext);
    const navigate = useNavigate();
    const location = useLocation();

    const posts: Post[] = useAppSelector((state) => state.allPost.posts);
    const dispatch = useAppDispatch();

    //const [posts, setPosts] = useState<Post[]>([...context.postList]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postStatus, setPostStatus] = useState('Create Post');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    let newPost: Post;
    // Submit new post
    const authSubmitHandler = async (event: any) => {
        event.preventDefault();
        setPostStatus('Posting');
        newPost = { id: 101, userId: 1, title: title, body: content };
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            if (newPost !== undefined) {
                dispatch(setPosts([newPost, ...posts]));
            }
        } catch (error: any) {
            setError(error);
        }
        setTitle('');
        setContent('');
        setPostStatus('Create Post');
        setOpen(true);
    };

    if (error) {
        return (
            <div className='text-center p-24'>
                <div>{`There is a problem fetching the data - ${error}`}</div>
            </div>
        );
    }

    return (
        <>
            {/* display success notification */}
            <Modal open={open} setOpen={setOpen} />
            <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create New Post</h2>
                </div>

                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                        <form className='space-y-6' onSubmit={authSubmitHandler}>
                            <div>
                                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                                    Title
                                </label>
                                <div className='mt-1'>
                                    <input
                                        placeholder='title here...'
                                        id='title'
                                        name='title'
                                        type='text'
                                        required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='body' className='block text-sm font-medium text-gray-700'>
                                    Content
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        placeholder='content here...'
                                        id='body'
                                        name='body'
                                        required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                {postStatus}
                            </button>
                        </form>
                    </div>
                </div>
                <br />
                <button onClick={() => navigate(-1)} className='ml-10'>
                    <h2 className='text-base text-center text-indigo-600 font-semibold tracking-wide'>Back to Previous Page</h2>
                </button>
            </div>
        </>
    );
};

export default NewPost;
