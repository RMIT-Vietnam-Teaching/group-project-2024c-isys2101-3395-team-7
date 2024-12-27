const NextIcon = ({ width, height, rotate }) => {
    const rotation = rotate ? 'rotate(180deg)' : 'rotate(0deg)';

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 73 73"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: rotation }}
        >
            <path d="M27.375 18.25L45.625 36.5L27.375 54.75" stroke="#33363F" strokeWidth="3" />
        </svg>
    );
};

export default NextIcon;