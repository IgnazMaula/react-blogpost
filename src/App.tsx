import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './shared/components/Navbar';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import AuthorPage from './pages/AuthorPage';
import NewPost from './pages/NewPost';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<MainPage />}></Route>
                <Route path='/post/:pid' element={<PostPage />}></Route>
                <Route path='/author/:aid' element={<AuthorPage />}></Route>
                <Route path='/new-post' element={<NewPost />}></Route>
            </Routes>
        </Router>
    );
};

export default App;
