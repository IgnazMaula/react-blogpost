import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Comment {
    id: number;
    email: string;
    body: string;
}

interface Photo {
    id: number;
    url: string;
}

const AuthorPage = () => {
    //get post id from route
    const authorId = useParams().aid;

    const navigate = useNavigate();

    const [author, setAuthor] = useState<Author>();
    const [photos, setPhotos] = useState<Photo[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                //fetch author data
                const responseAuthor = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`);
                const responseDataAuthor = await responseAuthor.json();
                setAuthor(responseDataAuthor);
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

    return (
        <>
            {loading ? (
                <div className='text-center p-24'>
                    <LoadingSpinner />;
                </div>
            ) : (
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
                        </div>
                    </div>
                    <div className='border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
                        <div className='px-6 py-5 text-sm font-medium'>
                            <p className='text-gray-900'>Name: </p> <p className='text-gray-400'> {author?.name}</p>
                            <p className='text-gray-900'>Username: </p> <p className='text-gray-400'> {author?.username}</p>
                            <p className='text-gray-900'>Email: </p> <p className='text-gray-400'> {author?.email}</p>
                            <p className='text-gray-900'>Phone: </p> <p className='text-gray-400'> {author?.phone}</p>
                            <p className='text-gray-900'>Website: </p> <p className='text-gray-400'> {author?.website}</p>
                        </div>
                        <div className='px-6 py-5 text-sm font-medium'>
                            <p className='text-gray-900'>Company: </p>
                            <br />
                            <p className='text-gray-900'>Company Name: </p> <p className='text-gray-400'> {author?.company.name}</p>
                            <p className='text-gray-900'>Catchphrase: </p> <p className='text-gray-400'> {author?.company.catchPhrase}</p>
                            <p className='text-gray-900'>Best Seller: </p> <p className='text-gray-400'> {author?.company.bs}</p>
                            <br />
                            <p className='text-gray-900'>Address: </p>
                            <br />
                            <p className='text-gray-900'>Street: </p> <p className='text-gray-400'> {author?.address.street}</p>
                            <p className='text-gray-900'>Suite: </p> <p className='text-gray-400'> {author?.address.suite}</p>
                            <p className='text-gray-900'>City: </p> <p className='text-gray-400'> {author?.address.city}</p>
                            <p className='text-gray-900'>Zipcode: </p> <p className='text-gray-400'> {author?.address.zipcode}</p>
                        </div>
                        <div className='px-6 py-5 text-sm font-medium'>
                            {/* Embedded Google Map based on latitude and longitude */}
                            <iframe
                                src={`https://maps.google.com/maps?q=${author?.address.geo.lat}, ${author?.address.geo.lng}&z=15&output=embed`}
                                width='600'
                                height='450'
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            <br />
            <button onClick={() => navigate(-1)} className='ml-10'>
                <h2 className='text-base text-center text-indigo-600 font-semibold tracking-wide'>Back to Previous Page</h2>
            </button>
        </>
    );
};

export default AuthorPage;
