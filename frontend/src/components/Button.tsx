import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center font-medium focus:outline-none transition-colors duration-200';

    const variantStyles = {
        primary: 'bg-gray-900 text-white hover:bg-gray-700',
        outline: 'border border-gray-900 text-gray-900 hover:bg-gray-100',
        ghost: 'text-gray-900 hover:bg-gray-100',
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm rounded-xl',
        md: 'px-6 py-3 text-md rounded-2xl',
        lg: 'px-8 py-4 text-lg rounded-3xl',
    };

    return (
        <button
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
