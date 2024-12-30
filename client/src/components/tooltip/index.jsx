"use client"
import PropTypes from 'prop-types';
import { useState } from 'react';

const Tooltip = ({ text, children, position = 'top' }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'top-1/2 right-full transform -translate-y-1/2 mr-2',
        right: 'top-1/2 left-full transform -translate-y-1/2 ml-2',
    };

    const tailClasses = {
        top: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black",
        bottom: "absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black",
        left: "absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black",
        right: "absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black",
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', width: 'fit-content', height: 'fit-content' }}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: 'fit-content', height: 'fit-content', display: "flex" }}
            >
                {children}
            </div>
            {showTooltip && (
                <span
                    className={`absolute text-s font-bold bg-black text-white border-orange border-solid shadow-lg border-2 p-2 rounded-lg whitespace-nowrap ${positionClasses[position]}`}
                >
                    {text}
                    <div className={tailClasses[position]}></div>
                </span>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default Tooltip;
