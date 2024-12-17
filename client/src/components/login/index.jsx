"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { login } from '@/api';
import { pushError } from '@/components/Toast';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const { storeAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // input data validation
        if (!username || !password) {
            alert("Username and password must not be empty");
            return;
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const res = await login(formData);

            // change condition & res data here
            if (res.user) {
                storeAuth(res.user, res.token)
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