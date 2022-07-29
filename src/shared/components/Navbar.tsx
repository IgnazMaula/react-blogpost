import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className='bg-indigo-600'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
                <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
                    <div className='flex items-center'>
                        <NavLink to='/'>
                            <img className='h-10 w-auto' src='https://tailwindui.com/img/logos/workflow-mark.svg?color=white' alt='' />
                        </NavLink>
                    </div>
                    <div className='ml-10 space-x-4'>
                        <h2 className='text-3xl tracking-tight font-extrabold text-white sm:text-4xl'>React Blogpost</h2>
                    </div>
                </div>
            </nav>
        </header>
    );
}
