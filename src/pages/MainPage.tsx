import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import { PostContext } from '../shared/context/PostContext';

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

interface Photo {
    id: number;
    url: string;
}

const MainPage = () => {
    const context = useContext(PostContext);

    const [posts, setPosts] = useState<Post[]>(context.postList);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                //fetch post data
                if (context.postList.length === 0) {
                    const responsePost = await fetch('https://jsonplaceholder.typicode.com/posts');
                    const responseDataPost = await responsePost.json();
                    setPosts(responseDataPost);
                    context.postList = responseDataPost;
                }
                //fetch user data
                const responseUser = await fetch('https://jsonplaceholder.typicode.com/users');
                const responseDataUser = await responseUser.json();
                setAuthors(responseDataUser);
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

    //get name of the author based on userId
    let getAuthorName = (authorId: number): string => {
        let name: string = '';
        authors.forEach((user) => {
            if (user.id === authorId) {
                name = user.name;
            }
        });
        return name;
    };
    //get email of the author based on userId
    let getAuthorEmail = (authorId: number): string => {
        let email: string = '';
        authors.forEach((user) => {
            if (user.id === authorId) {
                email = user.email;
            }
        });
        return email;
    };
    //get photo url of the post based on post id
    let getPhotoUrl = (postId: number): string => {
        let url: string = '';
        photos.forEach((photo) => {
            if (photo.id === postId) {
                url = photo.url;
            }
        });
        return url;
    };

    return (
        <>
            {loading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />;
                </div>
            ) : (
                <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
                    <div className='relative max-w-7xl mx-auto text-center'>
                        <div className='text-center'>
                            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>React Blogpost</h2>
                            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>By Ignaz Maula.</p>
                        </div>
                        <Link
                            to='/new-post'
                            className='mt-8 inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'
                        >
                            Create New Post
                        </Link>
                        <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
                            {context.postList.map((post) => (
                                <div key={post.title} className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
                                    <div className='flex-shrink-0'>
                                        <img className='h-48 w-full object-cover' src={getPhotoUrl(post.id)} alt='' />
                                    </div>
                                    <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                                        <div className='flex-1'>
                                            <Link to={`post/${post.id}`} className='block mt-2'>
                                                {/* Only show first 15 characters */}
                                                <p className='text-xl font-semibold text-gray-900'>{post.title.substring(0, 15)}</p>
                                                {/* Only show first 30 characters */}
                                                <p className='mt-3 text-base text-gray-500'>{post.body.substring(0, 30)}</p>
                                            </Link>
                                        </div>
                                        <div className='mt-6 flex items-center'>
                                            <div className='flex-shrink-0'>
                                                <a href={`author/${post.userId}`}>
                                                    <img className='h-10 w-10 rounded-full' src={getPhotoUrl(post.userId)} alt='' />
                                                </a>
                                            </div>
                                            <div className='ml-3'>
                                                <p className='text-sm font-medium text-gray-900'>
                                                    <Link to={`author/${post.userId}`} className='hover:underline'>
                                                        {getAuthorName(post.userId)}
                                                    </Link>
                                                </p>
                                                <div className='flex space-x-1 text-sm text-gray-500'>
                                                    <p>{getAuthorEmail(post.userId)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPage;
