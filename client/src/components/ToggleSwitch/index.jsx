'use client'
import React, { useState } from 'react';

const ToggleSwitch = ({isChecked, onChange}) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div
                className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-black peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-2 peer-focus:ring-offset-black
                ">
                <span
                    className="absolute inset-0 rounded-full bg-orange shadow-lg transform peer-checked:translate-x-full transition ease-in-out duration-200"></span>
            </div>
        </label>
    );
};

export default ToggleSwitch;