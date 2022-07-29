import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../shared/components/LoadingSpinner';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Author {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Comment {
    id?: number;
    name: string;
    email: string;
    body: string;
}

interface Photo {
    id: number;
    url: string;
}

const PostPage = () => {
    //get post id from route
    const postId = useParams().pid;

    const [post, setPost] = useState<Post>();
    const [author, setAuthor] = useState<Author>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const [comment, setComment] = useState('');
    const [commentStatus, setCommentStatus] = useState('Post');

    const [loading, setLoading] = useState(true);

    let newComment: Comment;

    useEffect(() => {
        const getData = async () => {
            try {
                //fetch post data
                const responsePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const responseDataPost = await responsePost.json();
                setPost(responseDataPost);
                //fetch author data
                const responseAuthor = await fetch(`https://jsonplaceholder.typicode.com/users/${responseDataPost.userId}`);
                const responseDataAuthor = await responseAuthor.json();
                setAuthor(responseDataAuthor);
                //fetch comment data
                const responseComment = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                const responseDataComment = await responseComment.json();
                setComments(responseDataComment);
                //fetch photo data
                const responsePhoto = await fetch('https://jsonplaceholder.typicode.com/photos');
                const responseDataPhoto = await responsePhoto.json();
                setPhotos(responseDataPhoto);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getData();
    }, []);

    //get photo url of the post based on post id
    let getPhotoUrl = (id: any): string => {
        let url: string = '';
        photos.forEach((photo) => {
            if (photo.id === id) {
                url = photo.url;
            }
        });
        return url;
    };
    //Submit comment
    const authSubmitHandler = async (event: any) => {
        event.preventDefault();
        setCommentStatus('Posting');
        newComment = { id: post?.id, name: 'Anonymous', email: 'Anonymous', body: comment };
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            if (newComment !== undefined) {
                setComments([newComment, ...comments]);
            }
        } catch (error) {
            console.log(error);
        }
        setCommentStatus('Post');
    };

    return (
        <>
            {loading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />;
                </div>
            ) : (
                <div className='bg-white overflow-hidden'>
                    <div className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
                        <div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
                            <div className='relative lg:row-start-1 lg:col-start-2'>
                                <div className='relative text-base mx-auto max-w-prose lg:max-w-none'>
                                    <div className='aspect-w-12 aspect-h-7 lg:aspect-none'>
                                        <img
                                            className='rounded-lg shadow-lg object-cover object-center'
                                            src={getPhotoUrl(post?.id)}
                                            alt={post?.title}
                                            width={1184}
                                            height={1376}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8 lg:mt-0'>
                                <div className='text-base max-w-prose mx-auto lg:max-w-none'>
                                    <div>
                                        <h3 className='mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                                            {post?.title}
                                        </h3>
                                    </div>
                                    <p className='text-lg text-gray-500'>{post?.body}</p>
                                    <br />
                                    {/* Author details */}
                                    <div className='rounded-lg bg-white overflow-hidden shadow'>
                                        <div className='bg-white p-6'>
                                            <div className='sm:flex sm:items-center sm:justify-between'>
                                                <div className='sm:flex sm:space-x-5'>
                                                    <div className='flex-shrink-0'>
                                                        <img className='mx-auto h-20 w-20 rounded-full' src={getPhotoUrl(author?.id)} alt='' />
                                                    </div>
                                                    <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                                                        <p className='text-sm font-medium text-gray-600'>Author</p>
                                                        <p className='text-xl font-bold text-gray-900 sm:text-2xl'>{author?.name}</p>
                                                        <p className='text-sm font-medium text-gray-600'>{author?.email}</p>
                                                    </div>
                                                </div>
                                                <div className='mt-5 flex justify-center sm:mt-0'>
                                                    <Link
                                                        to={`/author/${author?.id}`}
                                                        className='flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                                                    >
                                                        View profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    {/* End of author details */}
                                    {/* Write comment section */}
                                    <h1 className='mt-20 mb-4 font-bold'>Write comment:</h1>
                                    <div className='flex items-start space-x-4'>
                                        <div className='flex-shrink-0'></div>
                                        <div className='min-w-0 flex-1'>
                                            <form onSubmit={authSubmitHandler}>
                                                <div className='border-b border-gray-200 focus-within:border-indigo-600'>
                                                    <textarea
                                                        placeholder='comment here...'
                                                        id='comment'
                                                        name='comment'
                                                        required
                                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                </div>
                                                <div className='pt-2 flex justify-between'>
                                                    <div className='flex items-center space-x-5'>
                                                        <div className='flow-root'></div>
                                                    </div>
                                                    <div className='flex-shrink-0'>
                                                        <button
                                                            type='submit'
                                                            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                        >
                                                            {commentStatus}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* End of write comment section */}
                                    {/* Comment section */}
                                    <div className='flow-root mt-6'>
                                        <h1 className='mb-4 font-bold'>Comments:</h1>
                                        <ul role='list' className='-my-5 divide-y divide-gray-200'>
                                            {comments.map((comment) => (
                                                <li key={comment.id} className='py-5'>
                                                    <div className='relative focus-within:ring-2 focus-within:ring-indigo-500'>
                                                        <h3 className='text-sm font-semibold text-gray-800'>{comment.email}</h3>
                                                        <p className='mt-1 text-sm text-gray-600 line-clamp-2'>{comment.body}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* End of comment section */}
                                    <br />
                                    <Link to='/'>
                                        <h2 className='text-base text-indigo-600 font-semibold tracking-wide'>Back to Main Page</h2>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostPage;
