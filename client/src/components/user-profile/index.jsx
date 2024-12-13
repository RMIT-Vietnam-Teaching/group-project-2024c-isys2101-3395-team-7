"use client"
import React, {useState} from 'react';
import Link from "next/link";
import CircularProgress from "@/components/CircularProgress";

export default function UserProfile() {
    const [userName, setUserName] = useState("<your name>");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaved, setIsSaved] = useState(false)
    const [loading, setLoading] = useState(false); // State to manage loading status


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        dateOfBirth: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoading(false)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle form submission logic here (e.g., send data to server)
        console.log(formData);
        setLoading(false);
        setIsSaved(true)
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full grid place-items-center max-w-xl h-full p-8 shadow-md rounded-lg border-black">
                    <div className={"flex flex-col items-center justify-center mb-4"}>
                        <img src="profile_black.svg" alt="avatar" className="w-32 h-32 mx-auto rounded-full"/>
                        <p>Hi <span className={"text-pink font-bold"}>{userName}</span>, you are viewing your profile.</p>
                        <p>You can edit your profile here.</p>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4 flex flex-col justify-center h-full">
                        <div className="flex flex-col space-y-4">
                            <div className={"flex flex-row space-x-4"}>
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
                            </div>
                            {/*username*/}
                            <div className={""}>
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
                            <div className={""}>
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
                        </div>
                        {/*submit button*/}
                        <div className={"mt-4 flex items-center justify-end"}>
                            {loading ? (
                                <>
                                    <CircularProgress size="sm" />
                                </>
                            ) : (
                                <></>
                            )}
                            {isSaved ? (
                                <>
                                    <span className={"mx-5"}>
                                        Saved!
                                    </span>
                                </>
                            ) : (
                                <></>
                            )
                            }
                            <button
                                type="submit"
                                className="w-1/6 py-2 px-4 text-lg font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                                bg-pink text-black hover:bg-orange"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};