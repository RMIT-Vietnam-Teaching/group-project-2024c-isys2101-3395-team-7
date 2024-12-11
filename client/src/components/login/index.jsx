"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { pushError } from '@/components/Toast';
// import { useAuth } from '../../provider/AuthProvider'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const { user, setUser } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // input data validation
        if (!username || !password) {
            alert("Username and password must not be empty");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login',
                { username, password },
                { withCredentials: true });
            if (response.status === 200) {
                // Fetch the user info after successful login
                const userResponse = await axios.get('http://localhost:3000/api/auth/user', { withCredentials: true });
                // setUser(userResponse.data.user)

                // Redirect to main page after setting the user
                window.location.href = '/';
            } else {
                alert(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to log in. Please try again later.');
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         window.location.href = '/';
    //     }
    // }, [user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2A2323]">
            <div className="w-full max-w-md p-8 shadow-md rounded-lg bg-black">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white">Enter Your
                            Username</label>
                        <input
                            id="username"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Enter Your
                            Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-lg font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                            bg-pink text-black hover:bg-orange"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                {/*<p className="mt-4 text-center text-sm text-white">*/}
                {/*    Forgotten Passwords? <a href="/forgot-password" className="text-indigo-600 hover:underline">Click*/}
                {/*    here</a>*/}
                {/*</p>*/}
                <p className="mt-4 text-center text-sm text-white">
                    Don't have an account? <Link href="/register"
                                                 className="text-indigo-600 hover:underline text-orange hover:bold">Create
                    new Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;