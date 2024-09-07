import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: 'url(images/fairy.jpg)' }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-20">
                <h1 className="text-4xl font-bold mb-8 text-yellow-400">Welcome to the Interactive Storytelling Platform</h1>
                <h2 className="text-2xl font-extrabold mb-8 text-yellow-400">Which one you wants to be?</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate('/author')}
                        className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-800 transition duration-300">
                        Author
                    </button>
                    <button
                        onClick={() => navigate('/user')} 
                        className="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                        Reader
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Home;
