"use client"
import { useState } from 'react';

export default function Home() {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const res = await fetch('/api/protected', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            setMessage(`Success: ${data.message}`);
        } else {
            setMessage('Unauthorized');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="text"
                    placeholder="Enter JWT token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Login
                </button>
                {message && (
                    <p className={`mt-4 text-center ${message === 'Unauthorized' ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
