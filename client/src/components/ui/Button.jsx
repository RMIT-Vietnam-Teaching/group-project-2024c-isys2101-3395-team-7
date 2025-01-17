const Button = ({ type, onClick, text, style }) => {
    return (
        <button
            className={`${style} rounded` || "px-5 py-3"}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};

export default Button;