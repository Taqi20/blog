import React from "react";

type ButtonProps = {
    label: string;
    onClick: () => void;
}

export const ButtonGreen: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <div className="h-10">
            <button onClick={onClick} className="h-full bg-green-300 text-green-700 flex px-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold items-center hover:bg-green-200 shadow-md shadow-green-200">{label}</button>
        </div>
    )
}