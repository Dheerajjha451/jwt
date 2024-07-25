"use client"

import { useState } from 'react';

export default function TokenInput() {
    const [token, setToken] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Protected Data:', data);
        } else {
            console.error('Unauthorized');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">JWT Token Input</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                            Enter JWT Token
                        </label>
                        <input 
                            type="text" 
                            id="token" 
                            value={token} 
                            onChange={handleInputChange} 
                            placeholder="Enter JWT Token"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
