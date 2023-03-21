import React, { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

const Card: React.FC<CardProps> = ({ children, title, subtitle }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
            <div>{children}</div>
        </div>
    );
};

export default Card;