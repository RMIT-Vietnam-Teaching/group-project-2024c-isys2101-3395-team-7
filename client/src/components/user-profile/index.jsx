"use client"
import React, {useState} from 'react';
import Link from "next/link";

export default function UserProfile() {
    const [userName, setUserName] = useState("<your name>");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaved, setIsSaved] = useState(false)


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        dateOfBirth: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to server)
        console.log(formData);
        setIsSaved(true)
    };


    return (
        <>

            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full grid place-items-center max-w-xl h-full p-8 shadow-md rounded-lg border-black">
                    <div className={"flex flex-col items-center justify-center"}>
                        <img src="profile_black.svg" alt="avatar" className="w-32 h-32 mx-auto rounded-full"/>
                        <p>Hi {userName}, you are viewing your profile</p>
                        <p>You can edit your profile here</p>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4 flex flex-row justify-center h-full">
                        <div className="flex space-x-4">
                            {/*Last Name*/}
                            <div className="flex-1">
                                    <label htmlFor="lastName" className="block text-sm font-medium ">
                                        Change Your Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/*First Name*/}
                                <div className="flex-1">
                                    <label htmlFor="firstName" className="block text-sm font-medium ">
                                        Change Your First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/*username*/}
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium ">
                                        Change Your Username
                                    </label>
                                    <input
                                        id="username"
                                        type="username"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/*date of birth*/}
                                <div>
                                    <label htmlFor="dateOfBirth" className="block text-sm font-medium ">
                                        Change Your Date of Birth
                                    </label>
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
                                {isSaved ? (
                                <>
                                    <p>Saved!</p>
                                </>
                                ) :(
                                <>
                                </>
                                    )
                                }
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 text-lg font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                bg-pink text-black hover:bg-orange"
                                    >
                                        Save
                                    </button>
                                </div>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
};