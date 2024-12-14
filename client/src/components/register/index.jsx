"use client"

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import LogoFullIcon from "@/components/icons/LogoFullIcon";
import { signup } from '@/api';
import Link from 'next/link';

const iconWidth = 30, iconHeight = 30;

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match", formData.password, formData.confirmPassword);
            return;
        }

        try {
            const res = await signup(formData);
            console.log('User registered:', res);

            // Use Link for redirection
            router.push("/")
        } catch (error) {
            console.error('Error registering user:', error.message);
        }
    };

    return (
        <>
            <div className="min-h-screen  flex items-center justify-center bg-[#2A2323]">
                <div className="w-full grid place-items-center max-w-xl h-full p-8 shadow-md bg-black ">
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center">
                            Create an account for
                            {/*<LogoFullIcon width={iconWidth} height={iconHeight}/>*/}
                            <Link href={'/'}>
                                <img src={'logo_full.svg'} alt={'Viego_full'} className={'h-24 w-24 px-1.5'} />
                            </Link>
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center h-full">
                        <div className="flex space-x-4">
                            {/*Last Name*/}
                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-sm font-medium text-white">Enter Your Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {/*First Name*/}
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-sm font-medium text-white">Enter Your First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {/*username*/}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-white">Enter Your Username</label>
                            <input
                                id="username"
                                type="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {/*password*/}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white">Enter a New Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {/*confirm password*/}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Re-enter the Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {/*date of birth*/}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white">Date of Birth</label>
                            <input
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {/*submit button*/}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-lg font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                bg-pink text-black hover:bg-orange"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {/*login redirect*/}
                    <div className={"flex flex-col items-center justify-start"}>
                        <p className="mt-4 text-center text-sm text-pink">
                            Already have an account? <Link href="/login" className="text-indigo-600 hover:underline text-orange hover:bold">Log in</Link> instead
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;