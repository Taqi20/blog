import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost'; // Define allowed variants
    size?: 'sm' | 'md' | 'lg';                 // Define allowed sizes
    className?: string;                        // Optional custom class
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Extend default button props

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
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-md',
        lg: 'px-8 py-4 text-lg',
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
